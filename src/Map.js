import React, { useRef, useEffect, useState } from 'react';
import maplibregl, { MapMouseEvent, Popup } from 'maplibre-gl';
import { GeocodingControl } from "@maptiler/geocoding-control/react";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
import "@maptiler/geocoding-control/style.css";
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';
import POI from './POI';

function Map({ tripPOIs }) {
    const navigate = useNavigate();
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(139.753);
    const [lat] = useState(35.6844);
    const [zoom] = useState(14);
    const [API_KEY] = useState('0hVyQCHlkwVxq91emJ4N');
    const [mapController, setMapController] = useState();
    useEffect(() => {
        if (map.current) return; // stops map from intializing more than once
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
            center: [lng, lat],
            zoom: zoom
        });

        const bounds = new maplibregl.LngLatBounds();
        console.log(tripPOIs)
        tripPOIs.forEach(tripPOI => {
            const marker = tripPOI.poi.location
            console.log(marker)
            const popup = new Popup({closeButton: false, closeOnClick: false}).setHTML(tripPOI.poi.name)
            const mapMarker = new maplibregl.Marker()
                .setLngLat([marker.lon, marker.lat])
                .setPopup(popup)
                .addTo(map.current);

            mapMarker.getElement().addEventListener('mouseenter', () => {popup.setLngLat([marker.lon, marker.lat]).addTo(map.current)});
            mapMarker.getElement().addEventListener('mouseleave', () => {popup.remove()});
            mapMarker.getElement().addEventListener('click', () => {navigate("/trip/" + tripPOI.trip + "/poi/" + tripPOI.poi.id)});

            bounds.extend([marker.lon, marker.lat])
        });

        tripPOIs.length !== 1 ?
        map.current.fitBounds(bounds, { padding: 50, animate: false }) : map.current.setCenter([tripPOIs[0].poi.location.lon, tripPOIs[0].poi.location.lat])
        map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
        setMapController(createMapLibreGlMapController(map.current, maplibregl));

    }, [API_KEY, lng, lat, zoom]);

    const handleSelect = (location) => {
        console.log("Selected location:", location);
    };

    return (
        <div className="map-wrap" sx={{height: '80vh'}}>
            <div className="geocoding">
                <GeocodingControl apiKey={API_KEY} mapController={mapController} onPick={handleSelect}/>
            </div>
            <div ref={mapContainer} className="map" />
        </div>
    );
}

export default Map