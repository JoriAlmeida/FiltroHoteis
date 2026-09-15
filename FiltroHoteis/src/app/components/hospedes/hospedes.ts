import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
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

export class Hospedes implements OnInit {

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
    this.emitirHospedes();
    this.aberto = false;
  }


  aumentarAdultos(quarto: Quarto): void {
    if (quarto.adultos < this.maximoAdultos) {
      quarto.adultos++;
      this.emitirHospedes();
    }
  }

  diminuirAdultos(quarto: Quarto): void {
    if (quarto.adultos > this.minimoAdultos) {
      quarto.adultos--;
      this.emitirHospedes();
    }
  }

  aumentarCriancas(quarto: Quarto): void {
    if (quarto.idadesCriancas.length < this.maximoCriancas) {
      quarto.idadesCriancas.push(0);
      this.emitirHospedes();
    }
  }

  diminuirCriancas(quarto: Quarto): void {
    if (quarto.idadesCriancas.length > 0) {
      quarto.idadesCriancas.pop();
      this.emitirHospedes();
    }
  }

  adicionarQuarto(): void {
    if (this.quartos.length < this.maximoQuartos) {
      this.quartos.push({
        adultos: 1,
        idadesCriancas: []
      });

      this.emitirHospedes();
    }
  }

  removerQuarto(indice: number): void {
    if (this.quartos.length > 1) {
      this.quartos.splice(indice, 1);
      this.emitirHospedes();
    }
  }

  alterarIdadeCrianca(
    quarto: Quarto,
    indice: number,
    idade: number
  ): void {
    quarto.idadesCriancas[indice] = idade;
    this.emitirHospedes();
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

  private emitirHospedes(): void {
    const quartosAtualizados: Quarto[] = this.quartos.map(quarto => ({
      adultos: quarto.adultos,
      idadesCriancas: [...quarto.idadesCriancas]
    }));

    this.hospedesSelecionados.emit(quartosAtualizados);
  }

  trackByIdade(index: number): number {
    return index;
  }
  @HostListener('document:click')
  fecharAoClicarFora(): void {
    if (this.aberto) {
      this.fechar();
    }
  }

  @Output() hospedesSelecionados = new EventEmitter<Quarto[]>();

  ngOnInit(): void {
    this.emitirHospedes();
  }

}