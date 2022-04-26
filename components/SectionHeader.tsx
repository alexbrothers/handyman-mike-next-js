import { Typography, Box } from "@mui/material";
import { SectionHeaderProps } from "../utils/types";

export default function SectionHeader(props: SectionHeaderProps) {
    const styles = {
        paddingTop: "30px", 
        paddingBottom: props.gutterBottom ? "15px" : "50px",
    };
    return (
        <Box sx={styles}>
            <Typography 
                variant="h4" 
                component={props.component}
            >
                {props.name}
            </Typography>
            {props.underline || props.underline == undefined && (<Box component="div" sx={{
                width: "30%",
                height: "5px",
                marginTop: "5px", 
                backgroundColor: "primary.main"
            }} />)}
        </Box>
    )
}