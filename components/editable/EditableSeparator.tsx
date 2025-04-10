import { Separator } from "@/components/ui/separator"

interface EditableSeparatorProps {
  props: {
    orientation?: "horizontal" | "vertical"
    className?: string
  }
}

export function EditableSeparator({ props }: EditableSeparatorProps) {
  const { orientation = "horizontal", className = "" } = props

  return (
    <div className={orientation === "vertical" ? "h-[200px] flex items-center" : ""}>
      <Separator orientation={orientation} className={className} />
    </div>
  )
}
