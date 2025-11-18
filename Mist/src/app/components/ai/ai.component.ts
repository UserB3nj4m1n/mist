import { Component } from '@angular/core';
import { OllamaService } from '../../services/services/ollama.service';
import { OllamaResponse } from '../../interface/models/ollama-response';

@Component({
  selector: 'app-ai',
  standalone: false,
  templateUrl: './ai.component.html',
  styleUrl: './ai.component.css',
})
export class AIComponent {
  prompt: string = '';
  response?: OllamaResponse;
  loading: boolean = false;
  error: string = '';

  constructor(private ollamaService: OllamaService) {}

  generate() {
    if (!this.prompt.trim()) return;

    this.loading = true;
    this.error = '';
    this.response = undefined;

    this.ollamaService.processPrompt(this.prompt).subscribe({
      next: (res: OllamaResponse) => {
        this.response = res;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Error fetching response';
        console.error(err);
        this.loading = false;
      },
    });
  }
}
