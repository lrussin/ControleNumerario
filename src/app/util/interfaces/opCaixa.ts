export interface OpCaixa {
  numTerminal: number
  pontoAtendimento: number
  terminal: OpTerminal[]
}

export interface OpTerminal {
  opCaixa: OpCaixa []
}

export interface OpCaixa {
  data: string
  valor: number
  tipoOperacao: TipoOperacao
}

export interface TipoOperacao {
  codOperacao: string
  descOperacao: string
  codHistorico: number
  descHistorico: string
}
