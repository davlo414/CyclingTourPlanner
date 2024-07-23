import React from "react";
import Trips from "./Trips";
import { CC } from "./CountryCodes"
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import ImageHeader from "./ImageHeader"
import { AutocompleteElement, FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { useNavigate, useParams } from "react-router-dom";

function NewPOI() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const formContext = useForm()
    const { tripId, poiId } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        console.log(e)
        const returnJSON = {
            "poi": {
                "location": {
                    "lon": e.lon,
                    "lat": e.lat,
                    "country": e.country.id
                },
                "name": e.name,
                "description": e.description,
                "details": e.details,
                "image": e.image
            },
            "trip": tripId
        }
        fetch(`${baseUrl}/trippois/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(returnJSON)
        })
            .then(navigate(-1))
            .catch(error => console.error('Error posting trips:', error));
    }

    return (
        <Box>
            <ImageHeader imageUrl="https://wallpapercave.com/wp/wp10945186.jpg" title="New Trip POI" subtitle="Create a new trip POI below" />
            <Container maxWidth='lg'>
                <Box display='flex' flexDirection='column' gap={1} my={1}>
                </Box>
                <FormContainer formContext={formContext} onSuccess={handleSubmit}>
                    <Grid container spacing={2} mt={1}>
                        <Grid xs={12}>
                            <Typography variant="h5">POI Details</Typography>
                        </Grid>
                        <Grid xs={12} md={6}>
                            <TextFieldElement fullWidth required name="name" label="POI Name" inputProps={{ maxLength: 200 }} />
                        </Grid>
                        <Grid xs={12} md={6}>
                            <TextFieldElement fullWidth required name="description" label="POI Description" inputProps={{ maxLength: 200 }} />
                        </Grid>
                        <Grid xs={12}>
                            <TextFieldElement multiline fullWidth rows={4} name="details" label="POI Details" />
                        </Grid>
                        <Grid xs={12}>
                            <TextFieldElement fullWidth name="image" label="Image URL (.jpg)" type={'url'} />
                        </Grid>
                        <Grid xs={12}>
                            <Typography variant="h5">Location Details</Typography>
                        </Grid>
                        <Grid xs={12} md={6}>
                            <TextFieldElement fullWidth required name="lat" label="Latitude" type={'number'} />
                        </Grid>
                        <Grid xs={12} md={6}>
                            <TextFieldElement fullWidth required name="lon" label="Longitude" type={'number'} />
                        </Grid>
                        <Grid xs={12}>
                            <AutocompleteElement fullWidth required name="country" label="Country" options={CC} />
                        </Grid>
                    </Grid>
                    <Button type={'submit'}>Submit</Button>
                </FormContainer>
            </Container>
        </Box>
    )
}

export default NewPOI