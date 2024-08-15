import React, { useState, useEffect } from "react";
import Trip from "./Trip"
import { Grid } from "@mui/material";

function Trips() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [trips, setTrips] = useState(null);

    const newTrip = {
        id: "new-trip",
        image: "https://wallpapercave.com/wp/wp10945186.jpg",
        name: "New Trip",
        description: "Click here to create a new trip"
    }

    useEffect(() => {
        fetch(`${baseUrl}/trips/`)
            .then(response => response.json())
            .then(data => {
                console.log(newTrip)
                setTrips([newTrip, ...data]);
                console.log(data);
            })
            .catch(error => console.error('Error fetching trips:', error));
    }, []);

    return (
        <div>
            <Grid container spacing={2}>
                {
                    trips ? (
                        trips.map(trip => <Trip trip={trip} key={trip.id} />)
                    ) : (
                        <p>Loading...This could take up to a minute.</p>
                    )
                }
            </Grid>
        </div>
    );
}

export default Trips;
