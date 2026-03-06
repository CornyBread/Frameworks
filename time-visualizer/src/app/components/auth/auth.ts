import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth'; 

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './auth.html', 
  styleUrls: ['./auth.css']   
})
export class AuthComponent {
  isLoginMode = true;
  username = '';
  pass = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.username = '';
    this.pass = '';
  }

  onSubmit(): void {
    if (!this.username || !this.pass) {
      this.errorMessage = 'Por favor, llena todos los campos.';
      return;
    }

    const success = this.isLoginMode 
      ? this.authService.login(this.username, this.pass)
      : this.authService.register(this.username, this.pass);

    if (!success) {
      this.errorMessage = this.isLoginMode ? 'Credenciales incorrectas.' : 'El usuario ya existe.';
    }
  }
}