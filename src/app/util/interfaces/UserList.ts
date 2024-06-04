export interface UserList {
  status: any
  items: Item[]
  totalPages: number
  messageError: any
  totalItems: number
  currentPage: number
  pageSize: number
}

export interface Item {
  userId: string
  firstName: string
  lastName: string
  email: string
}
