import { Box } from "@mui/material";

export default function SectionContainer({children}: any) {
  return (
    <Box component="section" sx={{
        paddingTop: {
          xs: "25px",
          md: "75px",
        },
        paddingBottom: {
          xs: "25px",
          md: "75px",
        },
    }}>
        {children}
    </Box>
  )
}
