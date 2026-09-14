import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../interfaces/hotel';

interface DiaCalendario {
  numero: number | null;
  data: Date | null;
  passado: boolean;
}

@Component({
  selector: 'app-pagina-inicial',
  imports: [CommonModule, FormsModule],
  templateUrl: './paginaInicial.html',
  styleUrl: './paginaInicial.scss'
})
export class PaginaInicial implements OnInit {

  // =========================================
  // CAMPOS DA BUSCA
  // =========================================

  destinoSelecionado = false;
  dataSelecionada = false;
  calendarioAberto = false;
  hospedesAberto = false;


  // =========================================
  // HOTÉIS
  // =========================================

  hoteis: Hotel[] = [];
  hoteisFiltrados: Hotel[] = [];

  textoBusca = '';


  // =========================================
  // CALENDÁRIO
  // =========================================

  mesAtual: Date = new Date();
  mesSeguinte: Date = new Date();

  diasMesAtual: DiaCalendario[] = [];
  diasMesSeguinte: DiaCalendario[] = [];

  dataEntrada: Date | null = null;
  dataSaida: Date | null = null;


  // =========================================
  // HÓSPEDES
  // =========================================

  adultos = 2;
  criancas = 0;

  readonly minimoAdultos = 1;
  readonly maximoAdultos = 10;

  readonly minimoCriancas = 0;
  readonly maximoCriancas = 10;


  // =========================================
  // CONSTRUTOR
  // =========================================

  constructor(
    private hotelService: HotelService
  ) {}


  // =========================================
  // INICIALIZAÇÃO
  // =========================================

  ngOnInit(): void {
    this.carregarHoteis();
    this.inicializarCalendario();
  }


  // =========================================
  // HOTÉIS
  // =========================================

  carregarHoteis(): void {

    this.hotelService.listarHoteis().subscribe({
      next: (dados) => {

        this.hoteis = dados;

        console.log('JSON carregado com sucesso.');
        console.log('Quantidade de hotéis:', this.hoteis.length);

      },

      error: (erro) => {

        console.error(
          'Erro ao carregar o JSON:',
          erro
        );

      }
    });

  }


  buscarHotel(): void {

    const texto = this.normalizarTexto(
      this.textoBusca
    );


    if (!texto) {

      this.hoteisFiltrados = [];

      return;

    }


    this.hoteisFiltrados =
      this.hoteis.filter((hotel) => {

        const nomeHotel =
          this.normalizarTexto(
            hotel.NOME
          );

        return nomeHotel.includes(texto);

      });

  }


  normalizarTexto(texto: string): string {

    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();

  }


  selecionarHotel(hotel: Hotel): void {

    this.textoBusca = hotel.NOME;

    this.hoteisFiltrados = [];

    this.destinoSelecionado = false;

  }


  // =========================================
  // CALENDÁRIO
  // =========================================

  inicializarCalendario(): void {

    const hoje = new Date();


    this.mesAtual = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      1
    );


    this.mesSeguinte = new Date(
      hoje.getFullYear(),
      hoje.getMonth() + 1,
      1
    );


    this.gerarCalendarios();

  }


  abrirCalendario(): void {

    this.calendarioAberto = true;
    this.dataSelecionada = true;
    this.hospedesAberto = false;

    this.gerarCalendarios();

  }


  fecharCalendario(): void {

    this.calendarioAberto = false;
    this.dataSelecionada = false;

  }


  gerarCalendarios(): void {

    this.diasMesAtual =
      this.gerarDiasDoMes(
        this.mesAtual
      );


    this.diasMesSeguinte =
      this.gerarDiasDoMes(
        this.mesSeguinte
      );

  }


  gerarDiasDoMes(
    mes: Date
  ): DiaCalendario[] {

    const ano = mes.getFullYear();

    const numeroMes = mes.getMonth();


    const primeiroDia =
      new Date(
        ano,
        numeroMes,
        1
      );


    const ultimoDia =
      new Date(
        ano,
        numeroMes + 1,
        0
      );


    const dias: DiaCalendario[] = [];


    for (
      let i = 0;
      i < primeiroDia.getDay();
      i++
    ) {

      dias.push({
        numero: null,
        data: null,
        passado: false
      });

    }


    for (
      let dia = 1;
      dia <= ultimoDia.getDate();
      dia++
    ) {

      const data =
        new Date(
          ano,
          numeroMes,
          dia
        );


      dias.push({
        numero: dia,
        data: data,
        passado: this.dataEstaNoPassado(data)
      });

    }


    return dias;

  }


  dataEstaNoPassado(
    data: Date
  ): boolean {

    const hoje = new Date();

    hoje.setHours(
      0,
      0,
      0,
      0
    );


    return data < hoje;

  }


  mesAnterior(): void {

    const hoje = new Date();

    const primeiroMesPermitido =
      new Date(
        hoje.getFullYear(),
        hoje.getMonth(),
        1
      );


    const novoMes =
      new Date(
        this.mesAtual.getFullYear(),
        this.mesAtual.getMonth() - 1,
        1
      );


    if (
      novoMes <
      primeiroMesPermitido
    ) {

      return;

    }


    this.mesAtual = novoMes;


    this.mesSeguinte =
      new Date(
        this.mesAtual.getFullYear(),
        this.mesAtual.getMonth() + 1,
        1
      );


    this.gerarCalendarios();

  }


  mesProximo(): void {

    this.mesAtual =
      new Date(
        this.mesAtual.getFullYear(),
        this.mesAtual.getMonth() + 1,
        1
      );


    this.mesSeguinte =
      new Date(
        this.mesAtual.getFullYear(),
        this.mesAtual.getMonth() + 1,
        1
      );


    this.gerarCalendarios();

  }


  selecionarData(
    data: Date
  ): void {

    if (
      this.dataEstaNoPassado(data)
    ) {

      return;

    }


    if (
      !this.dataEntrada ||
      this.dataSaida
    ) {

      this.dataEntrada = data;

      this.dataSaida = null;

      return;

    }


    if (
      data < this.dataEntrada
    ) {

      this.dataEntrada = data;

      return;

    }


    this.dataSaida = data;

  }


  dataSelecionadaInicio(
    data: Date
  ): boolean {

    return !!this.dataEntrada &&
      this.mesmoDia(
        data,
        this.dataEntrada
      );

  }


  dataSelecionadaFim(
    data: Date
  ): boolean {

    return !!this.dataSaida &&
      this.mesmoDia(
        data,
        this.dataSaida
      );

  }


  dataDentroDoPeriodo(
    data: Date
  ): boolean {

    if (
      !this.dataEntrada ||
      !this.dataSaida
    ) {

      return false;

    }


    return (
      data > this.dataEntrada &&
      data < this.dataSaida
    );

  }


  mesmoDia(
    data1: Date,
    data2: Date
  ): boolean {

    return (
      data1.getFullYear() ===
        data2.getFullYear()
      &&
      data1.getMonth() ===
        data2.getMonth()
      &&
      data1.getDate() ===
        data2.getDate()
    );

  }


  nomeMes(
    data: Date
  ): string {

    const meses = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro'
    ];


    return meses[
      data.getMonth()
    ];

  }


  textoDatas(): string {

    if (
      !this.dataEntrada
    ) {

      return 'Selecione as datas...';

    }


    if (
      !this.dataSaida
    ) {

      return this.formatarData(
        this.dataEntrada
      );

    }


    return `${this.formatarData(
      this.dataEntrada
    )} - ${this.formatarData(
      this.dataSaida
    )}`;

  }


  formatarData(
    data: Date
  ): string {

    return data.toLocaleDateString(
      'pt-BR'
    );

  }


  // =========================================
  // HÓSPEDES
  // =========================================

  abrirHospedes(): void {

    this.hospedesAberto = true;
    this.calendarioAberto = false;
    this.dataSelecionada = false;

  }


  fecharHospedes(): void {

    this.hospedesAberto = false;

  }


  aumentarAdultos(): void {

    if (
      this.adultos < this.maximoAdultos
    ) {

      this.adultos++;

    }

  }


  diminuirAdultos(): void {

    if (
      this.adultos > this.minimoAdultos
    ) {

      this.adultos--;

    }

  }


  aumentarCriancas(): void {

    if (
      this.criancas < this.maximoCriancas
    ) {

      this.criancas++;

    }

  }


  diminuirCriancas(): void {

    if (
      this.criancas > this.minimoCriancas
    ) {

      this.criancas--;

    }

  }


  textoHospedes(): string {

    if (this.criancas === 0) {

      return `${this.adultos} adultos · 1 quarto`;

    }


    return `${this.adultos} adultos · ${this.criancas} crianças · 1 quarto`;

  }

}