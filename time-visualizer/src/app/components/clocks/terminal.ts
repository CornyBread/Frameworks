import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../services/time';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terminal.html',
  styleUrls: ['./terminal.css']
})
export class TerminalComponent implements OnInit, OnDestroy {
  timeSub!: Subscription;
  
  unixEpoch: number = 0;
  localTime: string = '';
  hexTime: string = '';
  milliseconds: string = '000';

  constructor(
    private timeService: TimeService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.timeSub = this.timeService.currentTime$.subscribe(time => {
      // Tiempo UNIX (Segundos desde el 1 de enero de 1970)
      this.unixEpoch = Math.floor(time.getTime() / 1000);

      const h = time.getHours().toString().padStart(2, '0');
      const m = time.getMinutes().toString().padStart(2, '0');
      const s = time.getSeconds().toString().padStart(2, '0');
      
      this.milliseconds = time.getMilliseconds().toString().padStart(3, '0');
      this.localTime = `${h}:${m}:${s}`;
      
      // Creamos un código hexadecimal estético basado en la hora
      this.hexTime = `0x${h}${m}${s}`;

      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }
}