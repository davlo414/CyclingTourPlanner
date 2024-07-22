import React, { useRef, useEffect, useState } from 'react';
import maplibregl, { MapMouseEvent } from 'maplibre-gl';
import { GeocodingControl } from "@maptiler/geocoding-control/react";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
import "@maptiler/geocoding-control/style.css";
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';

function Map({ markers }) {
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

        markers.forEach(marker => {
            new maplibregl.Marker()
                .setLngLat([marker.lon, marker.lat])
                .addTo(map.current);
            bounds.extend([marker.lon, marker.lat])
        });

        markers.length !== 1 ?
        map.current.fitBounds(bounds, { padding: 50, animate: false }) : map.current.setCenter([markers[0].lon, markers[0].lat])
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