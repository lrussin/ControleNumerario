export interface OpCaixa {
  numTerminal: number
  pontoAtendimento: number
  terminal: Terminal[]
}

export interface Terminal {
  opCaixa: OpCaixa[]
}

export interface OpCaixa {
  data: string
  valor: number
}

export interface TipoOperacao {
  codOperacao: string
  descOperacao: string
  codHistorico: number
  descHistorico: string
}
