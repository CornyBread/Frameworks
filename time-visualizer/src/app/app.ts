import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth/auth'; // Importado directo de auth.ts
import { AuthService } from './services/auth';          // Importado directo de auth.ts

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AuthComponent], 
  templateUrl: './app.html'
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}