import { Typography, Box, Paper } from "@mui/material";
import { WorkBeforeAfter } from "../utils/types";
import WorkCarousel from "./WorkCarousel";

export default function WorkProject(props: WorkBeforeAfter) {
    return (
        <Box component="section" sx={{marginTop: "25px", marginBottom: "25px"}}>
            <Typography variant="h5" sx={{marginBottom: "10px"}}>{props.projectName}</Typography>
            <Box sx={{
                display: "flex",
                flexDirection: {
                    xs: "column",
                    md: "row",
                },
                alignItems: "center",
                justifyContent: "center",
                columnGap: {
                    xs: 0,
                    md: "30px"
                },
                rowGap: {
                    xs: "30px",
                    md: 0,
                }
            }}>
                <WorkCarousel isBefore media={props.beforeMedia} />
                <WorkCarousel isBefore={false} media={props.afterMedia} />
            </Box>
        </Box>
    )
}