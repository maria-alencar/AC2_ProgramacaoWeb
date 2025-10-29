import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservaStorageService {
  private readonly STORAGE_KEY = 'reservaFormData';

  constructor() { }

    salvarDados(dados: any): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dados));
      console.log('LocalStorage: Dados salvos automaticamente.');
    } catch (e) {
      console.error('Erro ao salvar no localStorage', e);
    }
  }


  carregarDados(): any | null {
    try {
      const dados = localStorage.getItem(this.STORAGE_KEY);
      return dados ? JSON.parse(dados) : null;
    } catch (e) {
      console.error('Erro ao carregar do localStorage', e);
      return null;
    }
  }


  limparDados(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      console.log('LocalStorage: Dados removidos após submissão.');
    } catch (e) {
      console.error('Erro ao limpar o localStorage', e);
    }
  }
}