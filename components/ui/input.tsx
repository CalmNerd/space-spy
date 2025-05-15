import * as React from "react"

import { cn } from "@/lib/utils"
import { Search } from "lucide-react"

function SearchInput({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <div className="relative w-full font-geomGraphy">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3772FE]" size={16} />
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground text-[#6CA0F6] selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-7 w-full min-w-0 rounded-none rounded-tl-lg rounded-br-lg border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          // "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]",
          "focus-visible:border-[#3772FE]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "pl-9",
          
          className
        )}
        {...props}
      />
    </div>
  )
}

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <div className="relative w-full font-geomGraphy">
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground text-[#6CA0F6] selection:bg-primary selection:text-primary-foreground border-input flex h-7 w-full min-w-0 rounded-none rounded-tl-lg rounded-br-lg border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          // "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]",
          "focus-visible:border-[#3772FE]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",          
          className
        )}
        {...props}
      />
    </div>
  )
}

export { Input, SearchInput }
