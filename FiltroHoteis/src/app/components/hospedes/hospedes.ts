import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Quarto } from '../../interfaces/quarto';

@Component({
  selector: 'app-hospedes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hospedes.html',
  styleUrl: './hospedes.scss'
})
export class Hospedes {

  aberto = false;

  readonly minimoAdultos = 1;
  readonly maximoAdultos = 10;

  readonly maximoCriancas = 10;
  readonly maximoQuartos = 4;

  quartos: Quarto[] = [
    {
      adultos: 2,
      idadesCriancas: []
    }
  ];

  abrir(): void {
    this.aberto = true;
  }

  fechar(): void {
    this.aberto = false;
  }

  aumentarAdultos(quarto: Quarto): void {
    if (quarto.adultos < this.maximoAdultos) {
      quarto.adultos++;
    }
  }

  diminuirAdultos(quarto: Quarto): void {
    if (quarto.adultos > this.minimoAdultos) {
      quarto.adultos--;
    }
  }

  aumentarCriancas(quarto: Quarto): void {
    if (quarto.idadesCriancas.length < this.maximoCriancas) {
      quarto.idadesCriancas.push(0);
    }
  }

  diminuirCriancas(quarto: Quarto): void {
    if (quarto.idadesCriancas.length > 0) {
      quarto.idadesCriancas.pop();
    }
  }

  adicionarQuarto(): void {
    if (this.quartos.length < this.maximoQuartos) {
      this.quartos.push({
        adultos: 1,
        idadesCriancas: []
      });
    }
  }

  removerQuarto(indice: number): void {
    if (this.quartos.length > 1) {
      this.quartos.splice(indice, 1);
    }
  }

  alterarIdadeCrianca(
    quarto: Quarto,
    indice: number,
    idade: number
  ): void {
    quarto.idadesCriancas[indice] = idade;
  }

  textoHospedes(): string {
    const totalAdultos = this.quartos.reduce(
      (total, quarto) => total + quarto.adultos,
      0
    );

    const totalCriancas = this.quartos.reduce(
      (total, quarto) => total + quarto.idadesCriancas.length,
      0
    );

    const quantidadeQuartos = this.quartos.length;

    if (totalCriancas === 0) {
      return `${totalAdultos} adultos · ${quantidadeQuartos} quarto${quantidadeQuartos > 1 ? 's' : ''}`;
    }

    return `${totalAdultos} adultos · ${totalCriancas} crianças · ${quantidadeQuartos} quarto${quantidadeQuartos > 1 ? 's' : ''}`;
  }
}