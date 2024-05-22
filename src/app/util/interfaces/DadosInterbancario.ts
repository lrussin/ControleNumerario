export interface DadosInterbancario {
  id: number;
  dataHora: string;
  bancoDebito: number;
  agenciaDebito: number;
  agenciaCredito: number;
  situacao: string;
  valor: number;
}
