import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipWrapperProps {
    triggerText: React.ReactNode; // The text or element that will trigger the tooltip
    tooltipContent: React.ReactNode; // The content inside the tooltip
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
    triggerText,
    tooltipContent,
}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>{triggerText}</TooltipTrigger>
                <TooltipContent>
                    <p>{tooltipContent}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default TooltipWrapper;
