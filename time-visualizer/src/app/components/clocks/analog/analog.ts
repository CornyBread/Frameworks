// 1. Añadimos ChangeDetectorRef aquí
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../services/time';

@Component({
  selector: 'app-analog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analog.html',
  styleUrls: ['./analog.css']
})
export class AnalogComponent implements OnInit, OnDestroy {
  timeSub!: Subscription;
  hoursDeg = 0; 
  minsDeg = 0; 
  secsDeg = 0;

  // 2. Inyectamos el cdr (ChangeDetectorRef)
  constructor(
    private timeService: TimeService, 
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.timeSub = this.timeService.currentTime$.subscribe(time => {
      const h = time.getHours();
      const m = time.getMinutes();
      const s = time.getSeconds();
      
      this.secsDeg = s * 6; 
      this.minsDeg = m * 6 + (s * 0.1); 
      this.hoursDeg = (h % 12) * 30 + (m * 0.5); 
      
      // 3. ¡El toque mágico! Le decimos a Angular que detecte los cambios
      this.cdr.detectChanges(); 
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }
}