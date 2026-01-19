import { Component } from '@angular/core';
import { OllamaService } from '../../services/services/ollama.service';
import { OllamaResponse } from '../../interface/models/ollama-response';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

@Component({
  selector: 'app-ai',
  standalone: true,
  templateUrl: './ai.component.html',
  styleUrl: './ai.component.css',
  imports: [
    ButtonModule,
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    DividerModule,
  ],
})
export class AIComponent {
  prompt: string = '';
  messages: ChatMessage[] = [];
  loading: boolean = false;
  error: string = '';
  displayName: string = '';
  email: string = '';
  userProfile: any;

  showChat = false;

  toggleChat() {
    this.showChat = !this.showChat;
  }

  constructor(
    private ollamaService: OllamaService,
    private auth: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.auth.getUserData().subscribe((user) => {
      if (user) {
        this.displayName = user.displayName || 'No Display Name';
        this.email = user.email || 'No Email';
      }
    });
    this.userService.getUserProfile().subscribe((data) => {
      this.userProfile = data;
    });
  }

  generate() {
    const trimmed = this.prompt.trim();
    if (!trimmed) return;

    this.messages.push({ sender: 'user', text: trimmed });

    this.loading = true;
    this.error = '';

    this.ollamaService.processPrompt(trimmed).subscribe({
      next: (res: OllamaResponse) => {
        this.messages.push({
          sender: 'ai',
          text: res.response,
        });

        this.prompt = '';
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
