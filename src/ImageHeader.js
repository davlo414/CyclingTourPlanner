import React from "react";
import { Box, Typography, Fab } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { Link as RouterLink } from 'react-router-dom';

function ImageHeader({ imageUrl, title, subtitle, backName, hideBack=false, backLocation=-1 }
) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                backgroundImage: `url(${imageUrl})`,
                height: 500,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}
        >
            <Box display='flex' flexDirection='column' gap={4} justifyContent='center' alignItems='center' sx={{ height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', color: "white" }}>
                {!hideBack && <Fab variant="extended" component={RouterLink} to={backLocation} sx={{position: 'fixed', left: theme.spacing(2), top: theme.spacing(2)}}>
                    <ArrowBackIos />
                    Back
                </Fab>}
                <Typography variant="h1">{title}</Typography>
                <Typography variant="h5">{subtitle}</Typography>
            </Box>
        </Box>
    )
}

export default ImageHeader