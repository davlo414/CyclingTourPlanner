import './App.css';
import HomePage from './HomePage';
import TripDetails from './TripDetails'
import POIDetails from './POIDetails'
import NewTrip from './NewTrip'
import NewTripPOI from './NewTripPOI';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

export const themeOptions = {
    palette: {
        mode: 'light',
    },
};

const theme = createTheme(themeOptions)

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/trip/:id" element={<TripDetails />} />
                    <Route path="/trip/:tripId/poi/:poiId" element={<POIDetails />} />
                    <Route path="/trip/new-trip" element={<NewTrip />} />
                    <Route path="/trip/:tripId/poi/new-trip-poi" element={<NewTripPOI />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
