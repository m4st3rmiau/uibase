interface ComponentProps {
  [key: string]: any
}

export interface Component {
  id: string
  type: string
  props: ComponentProps
  children?: Component[]
  parentId?: string
}
