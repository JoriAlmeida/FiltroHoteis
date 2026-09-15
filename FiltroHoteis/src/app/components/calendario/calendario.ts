import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaCalendario } from '../../interfaces/calendario';



@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendario.html',
  styleUrl: './calendario.scss'
})




export class Calendario {

  aberto = false;

  mesAtual: Date = new Date();
  mesSeguinte: Date = new Date();

  diasMesAtual: DiaCalendario[] = [];
  diasMesSeguinte: DiaCalendario[] = [];

  dataEntrada: Date | null = null;
  dataSaida: Date | null = null;

  constructor() {
    this.inicializarCalendario();
  }

  abrir(): void {
    this.aberto = true;
  }

  fechar(): void {
    this.aberto = false;
  }

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

  gerarCalendarios(): void {
    this.diasMesAtual = this.gerarDiasDoMes(this.mesAtual);
    this.diasMesSeguinte = this.gerarDiasDoMes(this.mesSeguinte);
  }

  gerarDiasDoMes(mes: Date): DiaCalendario[] {

    const ano = mes.getFullYear();
    const numeroMes = mes.getMonth();

    const primeiroDia = new Date(
      ano,
      numeroMes,
      1
    );

    const ultimoDia = new Date(
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

      const data = new Date(
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

  dataEstaNoPassado(data: Date): boolean {

    const hoje = new Date();

    hoje.setHours(
      0,
      0,
      0,
      0
    );

    return data < hoje;
  }

  mesProximo(): void {

    this.mesAtual = new Date(
      this.mesAtual.getFullYear(),
      this.mesAtual.getMonth() + 1,
      1
    );

    this.mesSeguinte = new Date(
      this.mesAtual.getFullYear(),
      this.mesAtual.getMonth() + 1,
      1
    );

    this.gerarCalendarios();
  }

  selecionarData(data: Date): void {
    if (this.dataEstaNoPassado(data)) {
      return;
    }

    if (!this.dataEntrada || (this.dataEntrada && this.dataSaida)) {
      this.dataEntrada = data;
      this.dataSaida = null;
      return;
    }

    if (data < this.dataEntrada) {
      this.dataEntrada = data;
      this.dataSaida = null;
      return;
    }

    this.dataSaida = data;

    this.fechar();
  }


  dataSelecionadaInicio(data: Date): boolean {

    return !!this.dataEntrada &&
      this.mesmoDia(
        data,
        this.dataEntrada
      );
  }

  dataSelecionadaFim(data: Date): boolean {

    return !!this.dataSaida &&
      this.mesmoDia(
        data,
        this.dataSaida
      );
  }

  dataDentroDoPeriodo(data: Date): boolean {

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
      data1.getFullYear() === data2.getFullYear() &&
      data1.getMonth() === data2.getMonth() &&
      data1.getDate() === data2.getDate()
    );
  }

  nomeMes(data: Date): string {

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

    return meses[data.getMonth()];
  }

  textoDatas(): string {

    if (!this.dataEntrada) {
      return 'Selecione as datas...';
    }

    if (!this.dataSaida) {
      return this.formatarData(this.dataEntrada);
    }

    return `${this.formatarData(
      this.dataEntrada
    )} - ${this.formatarData(
      this.dataSaida
    )}`;
  }

  formatarData(data: Date): string {
    return data.toLocaleDateString('pt-BR');
  }

  @HostListener('document:click')
  fecharAoClicarFora(): void {
    if (this.aberto) {
      this.fechar();
    }
  }
}