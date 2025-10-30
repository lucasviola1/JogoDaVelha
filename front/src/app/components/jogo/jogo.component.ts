import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ResultadoJogo } from '../../models/jogo.model';
import { JogoService } from '../../services/jogo.service';

@Component({
  selector: 'app-jogo',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './jogo.component.html',
  styleUrl: './jogo.component.scss'
})
export class JogoComponent implements OnInit{
  
  tabuleiro: string[][] = [];
  jogadorAtual: string = 'X';
  vencedor: string | null = null;
  empate: boolean = false;
  modoJogo: 'humano' | 'maquina' = 'humano';
  ultimosResultados: ResultadoJogo[] = [];

  constructor(private jogoService: JogoService) {}

  ngOnInit(): void {
    this.novoJogo();
    this.carregarUltimosResultados();
  }

  novoJogo(): void {
    this.tabuleiro = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.jogadorAtual = 'X';
    this.vencedor = null;
    this.empate = false;
  }

  fazerJogada(linha: number, coluna: number): void {
    if (this.tabuleiro[linha][coluna] !== '' || this.vencedor || this.empate) {
      return;
    }

    // Jogada do jogador humano
    this.tabuleiro[linha][coluna] = this.jogadorAtual;
    
    this.verificarFimDeJogo();

    if (!this.vencedor && !this.empate) {
      if (this.modoJogo === 'maquina' && this.jogadorAtual === 'X') {
        // Vez da máquina
        setTimeout(() => this.jogadaMaquina(), 500);
      } else {
        this.jogadorAtual = this.jogadorAtual === 'X' ? 'O' : 'X';
      }
    }
  }

  jogadaMaquina(): void {
    const jogadasDisponiveis: [number, number][] = [];
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.tabuleiro[i][j] === '') {
          jogadasDisponiveis.push([i, j]);
        }
      }
    }

    if (jogadasDisponiveis.length > 0) {
      const jogadaAleatoria = jogadasDisponiveis[Math.floor(Math.random() * jogadasDisponiveis.length)];
      this.tabuleiro[jogadaAleatoria[0]][jogadaAleatoria[1]] = 'O';
      this.verificarFimDeJogo();
      if (!this.vencedor && !this.empate) {
        this.jogadorAtual = 'X';
      }
    }
  }

  verificarFimDeJogo(): void {
    // Verificar linhas
    for (let i = 0; i < 3; i++) {
      if (this.tabuleiro[i][0] !== '' && 
          this.tabuleiro[i][0] === this.tabuleiro[i][1] && 
          this.tabuleiro[i][1] === this.tabuleiro[i][2]) {
        this.vencedor = this.tabuleiro[i][0];
      }
    }

    // Verificar colunas
    for (let j = 0; j < 3; j++) {
      if (this.tabuleiro[0][j] !== '' && 
          this.tabuleiro[0][j] === this.tabuleiro[1][j] && 
          this.tabuleiro[1][j] === this.tabuleiro[2][j]) {
        this.vencedor = this.tabuleiro[0][j];
      }
    }

    // Verificar diagonais
    if (this.tabuleiro[0][0] !== '' && 
        this.tabuleiro[0][0] === this.tabuleiro[1][1] && 
        this.tabuleiro[1][1] === this.tabuleiro[2][2]) {
      this.vencedor = this.tabuleiro[0][0];
    }

    if (this.tabuleiro[0][2] !== '' && 
        this.tabuleiro[0][2] === this.tabuleiro[1][1] && 
        this.tabuleiro[1][1] === this.tabuleiro[2][0]) {
      this.vencedor = this.tabuleiro[0][2];
    }

    // Verificar empate
    let celulasVazias = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.tabuleiro[i][j] === '') {
          celulasVazias++;
        }
      }
    }

    if (!this.vencedor && celulasVazias === 0) {
      this.empate = true;
    }

    // Se houve vencedor ou empate, enviar para o backend
    if (this.vencedor || this.empate) {
      this.enviarResultado();
      this.carregarUltimosResultados();
    }
  }

  enviarResultado(): void {
    const resultado: ResultadoJogo = {
      vencedor: this.empate ? 'Empate' : this.vencedor!,
      dataHora: new Date
    };

    this.jogoService.adicionarResultado(resultado).subscribe({
      next: () => console.log('Resultado enviado com sucesso!'),
      error: (error) => console.error('Erro ao enviar resultado:', error)
    });
  }

  carregarUltimosResultados(): void {
    this.jogoService.obterUltimosResultados().subscribe({
      next: (resultados) => {
        this.ultimosResultados = resultados;
      },
      error: (error) => console.error('Erro ao carregar resultados:', error)
    });
  }

  alterarModoJogo(modo: 'humano' | 'maquina'): void {
    this.modoJogo = modo;
    this.novoJogo();
  }
}
