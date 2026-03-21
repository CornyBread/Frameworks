import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../services/time';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress.html',
  styleUrls: ['./progress.css']
})
export class ProgressComponent implements OnInit, OnDestroy {
  timeSub!: Subscription;
  
  // Guardaremos los porcentajes (0 a 100) y los valores reales para mostrarlos en texto
  hPercent = 0; hText = '';
  mPercent = 0; mText = '';
  sPercent = 0; sText = '';

  constructor(
    private timeService: TimeService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.timeSub = this.timeService.currentTime$.subscribe(time => {
      const h = time.getHours();
      const m = time.getMinutes();
      const s = time.getSeconds();
      
      // Cálculos de porcentaje
      this.hPercent = (h / 24) * 100;
      this.mPercent = (m / 60) * 100;
      
      // Le sumamos los milisegundos a los segundos para que la barra se mueva 
      // de forma súper fluida y no a saltos bruscos.
      const ms = time.getMilliseconds();
      this.sPercent = ((s + (ms / 1000)) / 60) * 100;

      // Textos formateados (ej: "09" en vez de "9")
      this.hText = h.toString().padStart(2, '0');
      this.mText = m.toString().padStart(2, '0');
      this.sText = s.toString().padStart(2, '0');
      
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }
}