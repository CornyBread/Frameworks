import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../services/time';

@Component({
  selector: 'app-concentric',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './concentric.html',
  styleUrls: ['./concentric.css']
})
export class ConcentricComponent implements OnInit, OnDestroy {
  timeSub!: Subscription;

  // Calculamos la circunferencia de cada círculo (2 * PI * radio)
  // Radios que usaremos en el SVG: Horas(90), Minutos(70), Segundos(50)
  cHours = 2 * Math.PI * 90;   
  cMinutes = 2 * Math.PI * 70; 
  cSeconds = 2 * Math.PI * 50; 

  // Estas variables controlarán qué tan "vacío" está el anillo
  offHours = this.cHours;
  offMinutes = this.cMinutes;
  offSeconds = this.cSeconds;

  timeText = '';

  constructor(
    private timeService: TimeService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.timeSub = this.timeService.currentTime$.subscribe(time => {
      const h = time.getHours();
      const m = time.getMinutes();
      const s = time.getSeconds();
      const ms = time.getMilliseconds();

      // Porcentajes completados
      const p_h = h / 24; 
      const p_m = m / 60;
      const p_s = (s + ms / 1000) / 60; // Fluido con milisegundos

      // Restamos el porcentaje a la circunferencia total para el SVG
      this.offHours = this.cHours - (p_h * this.cHours);
      this.offMinutes = this.cMinutes - (p_m * this.cMinutes);
      this.offSeconds = this.cSeconds - (p_s * this.cSeconds);

      // Hora digital para el centro
      this.timeText = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }
}