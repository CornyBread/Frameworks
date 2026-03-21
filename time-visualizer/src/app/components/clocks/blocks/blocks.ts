import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../services/time';

@Component({
  selector: 'app-blocks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blocks.html',
  styleUrls: ['./blocks.css']
})
export class BlocksComponent implements OnInit, OnDestroy {
  timeSub!: Subscription;
  
  // Guardamos la hora actual
  h = 0; 
  m = 0; 
  s = 0;

  // Arreglos fijos para dibujar los cuadritos en el HTML usando *ngFor
  hoursArray = new Array(24);
  minutesArray = new Array(60);
  secondsArray = new Array(60);

  constructor(
    private timeService: TimeService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.timeSub = this.timeService.currentTime$.subscribe(time => {
      this.h = time.getHours();
      this.m = time.getMinutes();
      this.s = time.getSeconds();
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }
}