import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../services/time';

@Component({
  selector: 'app-odometer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './odometer.html',
  styleUrls: ['./odometer.css']
})
export class OdometerComponent implements OnInit, OnDestroy {
  timeSub!: Subscription;
  
  // Esta es nuestra "cinta" física impresa con los números del 0 al 9
  strip = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Variables para saber en qué posición debe estar cada rueda
  hTens = 0; hUnits = 0;
  mTens = 0; mUnits = 0;
  sTens = 0; sUnits = 0;

  constructor(
    private timeService: TimeService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.timeSub = this.timeService.currentTime$.subscribe(time => {
      const h = time.getHours();
      const m = time.getMinutes();
      const s = time.getSeconds();

      // Extraemos las decenas (dividiendo por 10) y las unidades (el residuo %)
      this.hTens = Math.floor(h / 10);
      this.hUnits = h % 10;
      
      this.mTens = Math.floor(m / 10);
      this.mUnits = m % 10;
      
      this.sTens = Math.floor(s / 10);
      this.sUnits = s % 10;

      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }
}