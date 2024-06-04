export interface DadosInterbancario {
  status: string
  items: Item[]
  totalPages: number
  messageError: any
  totalItems: number
}

export interface Item {
  id: number
  dataHora: string
  bancoDebito: number
  agenciaDebito: number
  agenciaCredito: number
  situacao: string
  valor: number
  createdAt: string
}
