export interface ParameterList {
  pageNumber: number
  pageSize: number
  totalPages: number
  totalItems: number
  items: Item[]
}
export interface Item {
  name: string
  value: string
  id: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

