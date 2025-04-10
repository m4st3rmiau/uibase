import { Skeleton } from "@/components/ui/skeleton"

interface EditableSkeletonProps {
  props: {
    width: string
    height: string
    className?: string
  }
}

export function EditableSkeleton({ props }: EditableSkeletonProps) {
  const { width, height, className } = props

  return <Skeleton className={className} style={{ width, height }} />
}
