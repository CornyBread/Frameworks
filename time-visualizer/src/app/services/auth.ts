import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('userSession'));
  public isLoggedIn$ = this.loggedIn.asObservable();

  login(username: string, pass: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username] && users[username] === pass) {
      localStorage.setItem('userSession', username);
      this.loggedIn.next(true);
      return true;
    }
    return false;
  }

  register(username: string, pass: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username]) return false; 
    
    users[username] = pass;
    localStorage.setItem('users', JSON.stringify(users));
    return this.login(username, pass); 
  }

  logout(): void {
    localStorage.removeItem('userSession');
    this.loggedIn.next(false);
  }
}