import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 font-geomGraphy",
  {
    variants: {
      variant: {
        default:
          "bg-[#0B2847] text-white hover:bg-[#0B2847]/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-[#0C3766] bg-transparent text-white hover:bg-[#0C3766]/20",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "text-[#8A93A6] hover:bg-[#0B2847] hover:text-white",
        link: 
          "text-primary underline-offset-4 hover:underline",
        nav:
          "w-full justify-start text-base font-medium py-3 px-4 text-[#8A93A6] hover:bg-[#102C51] hover:text-white rounded-tr-xl",
        "nav-active":
          "w-full justify-start text-base font-medium py-3 px-4 bg-[#102C51] rounded-tr-xl hover:rounded-tr-xl text-white relative after:absolute after:inset-0 after:bg-[#1B3B68] after:opacity-50 after:rounded-lg",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
