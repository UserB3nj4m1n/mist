import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { OllamaResponse } from '../../interface/models/ollama-response';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OllamaService {
  private url = environment.llamaApiUrl;
  private model = environment.llamaModel;

  constructor(private httpClient: HttpClient) {}

  processPrompt(prompt: string): Observable<OllamaResponse> {
    const requestBody = {
      model: environment.llamaModel,
      prompt: prompt,
      stream: false,
    };

    return this.httpClient.post<OllamaResponse>(
      environment.llamaApiUrl,
      requestBody
    );
  }
}
