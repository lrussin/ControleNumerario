export interface PontoAtendimento {
  status: any
  items: Item[]
  totalPages: number
  messageError: any
  totalItems: number
  currentPage: number
  pageSize: number
}

export interface Item {
  id: number;
  idUnidadeInst: number;
  nomeUnidade: string;
  codTipoUnidade: number;
  saldo: number;
  createdAt: string; // Pode ser Date se você estiver lidando com objetos Date
  modifiedAt: string; // Pode ser Date se você estiver lidando com objetos Date
}
