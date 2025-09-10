// src/app/services/produto-hub.service.ts
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoHubService {
  private hubConnection!: signalR.HubConnection;
  private produtosSubject = new BehaviorSubject<any[]>([]);
  produtos$ = this.produtosSubject.asObservable();

  start(clienteId: string) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`http://localhost:5000/hubs/produto?clienteId=${clienteId}`)
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(err => console.error(err));

    this.hubConnection.on("ProdutoAdicionado", (produto) => {
      const produtos = this.produtosSubject.getValue();
      this.produtosSubject.next([...produtos, produto]);
    });
  }

  setProdutos(lista: any[]) {
    this.produtosSubject.next(lista);
  }

  stop() {
  if (this.hubConnection) {
    this.hubConnection.stop();
  }
}
}