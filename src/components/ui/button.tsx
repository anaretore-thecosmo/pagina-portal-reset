import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        mystical: "relative overflow-hidden font-cinzel font-semibold tracking-wider uppercase bg-gradient-to-r from-primary via-[hsl(45,90%,50%)] to-primary text-primary-foreground border border-primary/50 shadow-[0_0_20px_hsl(43,85%,38%,0.4),0_0_40px_hsl(43,85%,38%,0.2)] hover:shadow-[0_0_30px_hsl(43,85%,38%,0.6),0_0_60px_hsl(43,85%,38%,0.3)] hover:scale-[1.02] active:scale-[0.98]",
        mysticalOutline: "relative font-cinzel font-semibold tracking-wider uppercase bg-transparent text-primary border-2 border-primary/60 hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_20px_hsl(43,85%,38%,0.3)]",
        cta: "relative overflow-hidden font-cinzel font-bold tracking-widest uppercase bg-gradient-to-r from-primary via-[hsl(45,90%,55%)] to-primary text-primary-foreground border-2 border-[hsl(45,90%,60%)] shadow-[0_0_30px_hsl(43,85%,38%,0.5),0_0_60px_hsl(43,85%,38%,0.3),inset_0_1px_0_hsl(45,90%,70%,0.3)] hover:shadow-[0_0_40px_hsl(43,85%,38%,0.7),0_0_80px_hsl(43,85%,38%,0.4)] hover:scale-[1.03] active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
