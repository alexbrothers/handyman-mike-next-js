import * as Icons from "@mui/icons-material";
import { DynamicIconProps } from "../utils/types";

export default function DynamicIcon(props: DynamicIconProps) {
    // @ts-ignore
    const IconComponent = Icons[props.name] as any;
    
    if (IconComponent == undefined) {
        return <Icons.ConstructionRounded color="primary" fontSize="large" />
    }

    return <IconComponent color="primary" sx={{fontSize: 45}} />
}