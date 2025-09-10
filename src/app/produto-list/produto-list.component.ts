import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutoHubService } from '../services/ProdutoHubService';
import { ProdutoApiService } from '../services/ProdutoApiService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule], // FormsModule for [(ngModel)]
})
export class ProdutoListComponent implements OnInit, OnDestroy {
  produtos$!: Observable<any[]>;
  clienteId = '123'; // default
  clientes = ['123', '456', '890'];

  constructor(
    private hub: ProdutoHubService,
    private api: ProdutoApiService
  ) {}

  ngOnInit(): void {
    this.connectCliente(this.clienteId);
  }

  ngOnDestroy(): void {
    this.hub.stop(); // optional if you implement stop() in hub service
  }

  onClienteChange() {
    this.connectCliente(this.clienteId);
  }

  private connectCliente(clienteId: string) {
    this.hub.stop(); // ensure no multiple connections
    this.hub.start(clienteId);
    this.produtos$ = this.hub.produtos$;

    this.api.listar(clienteId).subscribe(lista => {
      this.hub.setProdutos(lista);
    });
  }

  adicionarProduto() {
    const novo = {
      nome: 'Produto ' + Math.floor(Math.random() * 100),
      preco: 10,
    };
    this.api.adicionar(this.clienteId, novo).subscribe();
  }
}