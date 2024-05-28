export interface UnidadeInstituicao {
  unidadeInstituicao: UnidadeInstituicao
}

export interface UnidadeInstituicao {
  idUnidadeInst: number
  modifiedAt: string
  terminals: Terminal[]
}

export interface Terminal {
  codigo: number
  saldo: number
  usuario: string
  tipoTerminal: TipoTerminal
}

export interface TipoTerminal {
  pa: number
  codigo: number
  descricao: string
  limSuperior: number
  mediana: number
  limInferior: number
}
