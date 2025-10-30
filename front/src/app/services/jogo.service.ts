import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultadoJogo } from '../models/jogo.model';

@Injectable({
  providedIn: 'root'
})
export class JogoService {
  private apiUrl = 'http://localhost:5281';

  constructor(private http: HttpClient) { }

  adicionarResultado(resultado: ResultadoJogo): Observable<any> {
    return this.http.post(`${this.apiUrl}/addresultado`, resultado);
  }

  obterUltimosResultados(): Observable<ResultadoJogo[]> {
    return this.http.get<ResultadoJogo[]>(`${this.apiUrl}/getresultados`);
  }
}