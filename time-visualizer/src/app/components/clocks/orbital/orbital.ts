import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../services/time';

@Component({
  selector: 'app-orbital',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orbital.html',
  styleUrls: ['./orbital.css']
})
export class OrbitalComponent implements OnInit, OnDestroy {
  timeSub!: Subscription;
  
  // Variables para controlar la duración de la animación CSS
  hDur: string = '43200s'; // 12 horas en segundos por defecto
  mDur: string = '3600s';  // 1 hora en segundos por defecto
  sDur: string = '60s';    // 1 minuto en segundos por defecto
  
  // Variables para el texto central opcional
  timeText: string = '';

  constructor(
    private timeService: TimeService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Para este reloj creativo, solo necesitamos suscribirnos una vez al inicio
    // para establecer la posición inicial. El CSS se encargará del movimiento continuo.
    // Sin embargo, si el usuario usa el SLIDER del tiempo, necesitamos actualizar.
    this.timeSub = this.timeService.currentTime$.subscribe(time => {
      const h = time.getHours();
      const m = time.getMinutes();
      const s = time.getSeconds();

      // Formato digital para el centro
      this.timeText = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;

      // Si la hora cambia drásticamente (por el slider), 
      // forzamos al CSS a reiniciar la animación desde el punto correcto.
      // Usamos una técnica creativa: calculamos el "offset" negativo del delay.
      const s_offset = s;
      const m_offset = (m * 60) + s;
      const h_offset = ((h % 12) * 3600) + (m * 60) + s;

      // Seteamos las propiedades CSS personalizadas (variables)
      const root = document.documentElement;
      root.style.setProperty('--s-offset', `-${s_offset}s`);
      root.style.setProperty('--m-offset', `-${m_offset}s`);
      root.style.setProperty('--h-offset', `-${h_offset}s`);

      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }
}