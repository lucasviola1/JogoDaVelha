export interface Jogada {
    linha: number;
    coluna: number;
    jogador: string;
}

export interface ResultadoJogo {
    id?: number;
    vencedor: string;
    dataHora: Date;
}
