import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  // Inicializamos con la fecha actual
  private timeSubject = new BehaviorSubject<Date>(new Date());
  public currentTime$: Observable<Date> = this.timeSubject.asObservable();
  
  // Desplazamiento en milisegundos para la "máquina del tiempo" (slider)
  private timeOffset: number = 0; 

  constructor() {
    // El reloj interno corre cada segundo (1000 ms)
    setInterval(() => {
      const now = new Date();
      // Le sumamos el offset por si el usuario movió el slider
      const visualTime = new Date(now.getTime() + this.timeOffset);
      this.timeSubject.next(visualTime);
    }, 1000);
  }

  // Recibe un valor de horas (ej: -5 o +3) y lo convierte a milisegundos
  setOffsetInHours(hours: number) {
    this.timeOffset = hours * 3600 * 1000;
  }
  
  // Vuelve a la hora real
  resetTime() {
    this.timeOffset = 0;
  }
}