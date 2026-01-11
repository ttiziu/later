import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textVariants = cva("", {
  variants: {
    variant: {
      default: "",
      shine: "inline-block bg-gradient-to-r from-foreground via-foreground/50 to-foreground bg-clip-text text-transparent bg-[length:200%_auto]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface TextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof textVariants> {}

const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(textVariants({ variant }), className)}
        style={
          variant === "shine"
            ? {
                animation: "shimmer 3s linear infinite",
              }
            : undefined
        }
        {...props}
      />
    )
  }
)
Text.displayName = "Text"

export { Text, textVariants }