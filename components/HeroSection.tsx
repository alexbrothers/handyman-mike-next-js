import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import { HomeContent } from "../utils/types";

const PADDING: string = "12px";

export default function HeroSection(props: HomeContent) {
  return (
    <Container>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "90vh",
      }}>
          <Typography 
            variant="h1" 
            sx={{
                fontWeight: "700",
                color: "primary.main",
                paddingTop: PADDING,
                paddingBottom: PADDING
            }}
          >
            {props.headline}
          </Typography>
          <Typography 
            variant="h3"
            component="h2"
            sx={{
                paddingTop: PADDING,
                paddingBottom: PADDING,
                fontWeight: "500"
            }}
          >
              {props.subHeadline}
          </Typography>
          <Typography 
            variant="h6" 
            paragraph
            sx={{
                paddingTop: PADDING,
                paddingBottom: PADDING,
            }}
          >
              {props.heroText}
          </Typography>
          <Box sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: PADDING,
          }}>
              <Link href={"/about"} passHref>
                  <Button
                    component="a"
                    variant="outlined"
                    size="large"
                  >
                      {props.subCallToActionButtonText}
                  </Button>
              </Link>
              <Link href={"/contact"} passHref>
                  <Button
                    component="a"
                    variant="contained"
                    size="large"
                    sx={{
                        color: "background.default"
                    }}
                  >
                      {props.callToActionButtonText}
                  </Button>
              </Link>
          </Box>
      </Box>
    </Container>
  )
}
