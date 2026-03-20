import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../services/time';

@Component({
  selector: 'app-binary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './binary.html',
  styleUrls: ['./binary.css']
})
export class BinaryComponent implements OnInit, OnDestroy {
  timeSub!: Subscription;
  
  // Arrays que guardarán el estado (encendido/apagado) de cada "LED"
  hBits: boolean[] = [];
  mBits: boolean[] = [];
  sBits: boolean[] = [];

  constructor(
    private timeService: TimeService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.timeSub = this.timeService.currentTime$.subscribe(time => {
      // Las horas ocupan máximo 5 bits (10111 = 23)
      this.hBits = this.getBinaryArray(time.getHours(), 5);
      // Minutos y segundos ocupan máximo 6 bits (111011 = 59)
      this.mBits = this.getBinaryArray(time.getMinutes(), 6);
      this.sBits = this.getBinaryArray(time.getSeconds(), 6);
      
      this.cdr.detectChanges();
    });
  }

  // Convierte un número en un array de booleanos de un tamaño específico
  getBinaryArray(num: number, length: number): boolean[] {
    // 1. Convierte a texto binario (ej. 5 -> "101")
    // 2. Rellena con ceros a la izquierda (ej. "00101")
    const binaryString = num.toString(2).padStart(length, '0');
    // 3. Lo convierte en un array de true/false
    return binaryString.split('').map(bit => bit === '1');
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }
}