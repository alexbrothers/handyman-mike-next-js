import { Typography, Box, Paper } from "@mui/material";
import { ServiceCardProps } from "../utils/types";
import DynamicIcon from "./DynamicIcon";

export default function ServiceCard(props: ServiceCardProps) {
    return (
        <Paper elevation={8} sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "flex-start",
            padding: "25px",
            backgroundColor: "primary.dark"
        }}>
            <DynamicIcon name={props.icon} />
            <Typography variant="h4" sx={{fontWeight: 500, paddingTop: "20px", paddingBottom: "20px"}}>
                {props.name}
            </Typography>
            <Box component="ul" sx={{
                listStyle: "none",
                marginBlockStart: "0px",
                marginBlockEnd: "0px",
                paddingInlineStart: "0px",
            }}>
                {props.subServices.map(function(subService: string) {
                    return (
                        <Box component="li" sx={{
                            position: "relative",
                            paddingLeft: "20px",
                            lineHeight: "40px",
                            "&:before": {
                                content: '"▹"',
                                position: "absolute",
                                left: 0,
                                top: 0,
                                color: "primary.main",
                            }
                        }}>
                            {subService}
                        </Box>
                    )
                })}
            </Box>
        </Paper>
    )
}