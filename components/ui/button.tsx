import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-blue-500/50 relative",
  {
    variants: {
      variant: {
        default:
          "bg-black text-blue-400 shadow-md border border-blue-500 hover:bg-blue-900/20 hover:border-blue-400 hover:text-blue-300",
        b_tr:
          "bg-black text-blue-400 shadow-md border rounded-tr-md border-blue-500 hover:bg-blue-900/20 hover:border-blue-400 hover:text-blue-300",
        b_tl_br:
          "bg-black text-blue-400 shadow-md border rounded-tl-md rounded-br-md border-blue-500 hover:bg-blue-900/20 hover:border-blue-400 hover:text-blue-300",
        destructive:
          "bg-black text-red-400 shadow-md border border-red-500 hover:bg-red-900/20 hover:border-red-400 hover:text-red-300",
        outline:
          "bg-black/90 text-blue-400 shadow-md border border-blue-500 hover:bg-blue-900/20 hover:border-blue-400 hover:text-blue-300",
        secondary:
          "bg-black/90 text-purple-400 shadow-md border border-purple-500 hover:bg-purple-900/20 hover:border-purple-400 hover:text-purple-300",
        ghost:
          "text-blue-400 hover:border hover:border-blue-500 hover:bg-blue-900/20",
        link: "text-blue-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

// Demo to show different button variants
// Example usage
export function ButtonDemo() {
  return (
    <div className="flex flex-col space-y-4 p-8 bg-gray-900">
      
      <div className="flex flex-wrap gap-4">
        <Button variant="default">
          Storage mins: 1200
        </Button>

        <Button variant="b_tr">
          border top right
        </Button>
        <Button variant="b_tl_br">
          border top left bottom right
        </Button>
        
        <Button variant="outline">
          Transcription mins: 8:00
        </Button>
        
        <Button variant="secondary">
          Connect to Telegram
        </Button>
        
        <Button variant="destructive">
          Delete Data
        </Button>
        
        <Button variant="ghost">
          Ghost Button
        </Button>
      </div>
    </div>
  )
}

export { Button, buttonVariants }
