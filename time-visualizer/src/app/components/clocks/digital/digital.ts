import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../services/time';

@Component({
  selector: 'app-digital',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './digital.html',
  styleUrls: ['./digital.css']
})
export class DigitalComponent implements OnInit, OnDestroy {
  timeSub!: Subscription;
  
  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';
  ampm: string = 'AM';

  constructor(
    private timeService: TimeService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.timeSub = this.timeService.currentTime$.subscribe(time => {
      let h = time.getHours();
      const m = time.getMinutes();
      const s = time.getSeconds();

      // Lógica para formato 12 horas y AM/PM
      this.ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12;
      h = h ? h : 12; // Si es 0, lo cambiamos a 12

      // .padStart(2, '0') agrega un cero a la izquierda si es de un solo dígito
      this.hours = h.toString().padStart(2, '0');
      this.minutes = m.toString().padStart(2, '0');
      this.seconds = s.toString().padStart(2, '0');

      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }
}