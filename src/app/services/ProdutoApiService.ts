// src/app/services/produto-api.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProdutoApiService {
  private baseUrl = 'http://localhost:5000/api/produto';

  constructor(private http: HttpClient) {}

  listar(clienteId: string) {
    return this.http.get<any[]>(`${this.baseUrl}/${clienteId}`);
  }

  adicionar(clienteId: string, produto: any) {
    return this.http.post<any>(`${this.baseUrl}/${clienteId}`, produto);
  }
}