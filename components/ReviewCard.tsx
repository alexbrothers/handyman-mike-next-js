import { Typography, Box, Paper, Rating } from "@mui/material";
import { ReviewCardContent } from "../utils/types";

export default function ReviewCard(props: ReviewCardContent) {
    return (
        <Paper elevation={8} sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "flex-start",
            padding: "25px",
            backgroundColor: "primary.dark"
        }}>
            <Typography variant="h5" sx={{fontWeight: 500, paddingTop: "20px", paddingBottom: "20px"}}>
                {props.firstName}
            </Typography>
            <Rating value={props.stars} readOnly size="large" sx={{paddingBottom: "20px"}} />
            <Typography paragraph>{props.review}</Typography>
        </Paper>
    )
}