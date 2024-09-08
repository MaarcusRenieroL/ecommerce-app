import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface classNames {
  TooltipContent?: string;
}
interface TooltipComponentProps extends TooltipPrimitive.TooltipProps {
  children: React.ReactNode;
  message: string | React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  classNames?: classNames;
}

const TooltipComponent: React.FC<TooltipComponentProps> = ({
  children,
  side,
  message,
  classNames,
  ...props
}) => {
  return (
    <TooltipProvider>
      <Tooltip {...props}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          className={cn("", classNames?.TooltipContent)}
        >
          {message}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipComponent;
