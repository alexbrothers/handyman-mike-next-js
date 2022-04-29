import { EmailRounded, Google } from "@mui/icons-material";
import { Typography, Box, IconButton, Container } from "@mui/material";
import Image from 'next/image';

export default function Footer() {
    return (
        <Box sx={{
            height: "250px",
            backgroundColor: "#14151a",
            marginTop: "100px"
        }}>
            <Container>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    rowGap: "10px",
                    height: "250px",
                }}>
                    <Image
                        src="/handyman_mike_logo_light.png"
                        alt="Handyman Mike Logo"
                        width="79.81"
                        height="64"
                    />
                    <Typography paragraph textAlign="center" sx={{
                        marginBottom: 0
                    }}>
                        Copyright © 2022 Handyman Mike, LLC
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        columnGap: "10px",
                    }}>
                        <IconButton href="mailto:mike@yaymike.com">
                            <EmailRounded color="primary" fontSize="large" />
                        </IconButton> 
                        <IconButton 
                            href="https://www.google.com/maps/place/Handyman+Mike,+LLC/@38.4062488,-78.6673493,7z/data=!4m9!1m2!2m1!1shandyman+mike+llc!3m5!1s0x2325544a6af1d5c3:0xa3d03ece8aafd053!8m2!3d37.56345!4d-77.5199244!15sChFoYW5keW1hbiBtaWtlIGxsY5IBCGhhbmR5bWFu"
                        >
                            <Google color="primary" fontSize="large" />
                        </IconButton>

                    </Box>
                </Box>
            </Container>
        </Box>
    )
}