export interface PontoAtendimento {
  id: number;
  idUnidadeInst: number;
  nomeUnidade: string;
  codTipoUnidade: number;
  saldo: number;
  createdAt: string; // Pode ser Date se você estiver lidando com objetos Date
  modifiedAt: string; // Pode ser Date se você estiver lidando com objetos Date
}
