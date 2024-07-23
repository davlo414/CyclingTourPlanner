import React, { useState, useEffect } from "react";
import { Box, Divider, Grid, Tab, Tabs, Typography } from "@mui/material";
import POI from "./POI";
import { useParams } from "react-router-dom";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Map from "./Map"
import PublicIcon from '@mui/icons-material/Public';
import MovingIcon from '@mui/icons-material/Moving';

function TripPOIs({ trip }) {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const { id } = useParams();
    const [tripPOIs, setTripPOIs] = useState(null);
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const newPOI = {
        "country": "Add a POI",
        "data":
            [
                {
                    "trip": id,
                    "poi": {
                        "id": `new-trip-poi`,
                        "image": "https://wallpapercave.com/wp/wp10945186.jpg",
                        "name": "Create a POI",
                        "description": "Click here to add a POI to the trip"
                    }
                }
            ]

    }

    useEffect(() => {
        fetch(`${baseUrl}/pois-group-by-country/${id}`)
            .then(response => response.json())
            .then(data => {
                setTripPOIs([newPOI, ...data]);
            })
            .catch(error => console.error('Error fetching trips:', error));
    }, [id]);
    return (
        <TabContext value={value}>
            <TabList value={value} variant='fullWidth' onChange={handleChange} aria-label="trip-pois-tabs">
                <Tab label="Details" value="1" />
                <Tab label="Map" value="2" />
            </TabList>
            <TabPanel value="1">
                <Grid container mb={2}>
                    <Grid item key={'number_of_countries'} md={6} xs={12} display="flex" justifyContent="center" alignItems="center">
                        <PublicIcon />
                        <Typography ml={1} variant="h5">{`${trip.number_of_countries} ${trip.number_of_countries > 1 || trip.number_of_countries === 0 ? 'countries' : 'country'}`}</Typography>
                    </Grid>
                    <Grid item key={'number_of_countries'} md={6} xs={12} display="flex" justifyContent="center" alignItems="center">
                        <MovingIcon />
                        <Typography ml={1} variant="h5">{`${trip.distance ? trip.distance+' miles' : 'Set start/end POI to see total distance'}` }</Typography>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container spacing={2}>
                    {tripPOIs ? (
                        tripPOIs.map(tripPOICountry => (
                            <Grid item key={tripPOICountry.id} xs={12}>
                                <Box display='flex' flexDirection='column' gap={1} my={1}>
                                    <Typography variant="h5">{tripPOICountry.country}</Typography>
                                </Box>
                                <Grid container spacing={2}>
                                    {tripPOICountry.data.map(tripPOI => (
                                        <POI tripPOI={tripPOI} key={tripPOI.id} />
                                    ))}
                                </Grid>
                            </Grid>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </Grid>
            </TabPanel>
            <TabPanel value="2">
                <Map markers={tripPOIs ? tripPOIs.slice(1).map(tripPOICountry => (tripPOICountry.data.map(tripPOIData => (tripPOIData.poi.location)))).flat().flat() : (<p>Loading</p>)} />
            </TabPanel>
        </TabContext>

    );
}

export default TripPOIs;
