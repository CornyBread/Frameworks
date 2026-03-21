import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../../../services/time';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text.html',
  styleUrls: ['./text.css']
})
export class TextComponent implements OnInit, OnDestroy {
  timeSub!: Subscription;
  
  prefix: string = '';
  hourText: string = '';
  minPrefix: string = '';
  minText: string = '';
  secText: string = '';

  constructor(
    private timeService: TimeService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.timeSub = this.timeService.currentTime$.subscribe(time => {
      let h = time.getHours();
      const m = time.getMinutes();
      const s = time.getSeconds();

      // Formato 12 horas
      h = h % 12;
      h = h ? h : 12;

      // 1. Lógica de la Hora
      this.prefix = h === 1 ? 'Es la' : 'Son las';
      this.hourText = this.getNumberWord(h, true);

      // 2. Lógica de los Minutos
      if (m === 0) {
        this.minPrefix = 'en';
        this.minText = 'punto';
      } else {
        this.minPrefix = 'y';
        this.minText = this.getNumberWord(m, false);
      }

      // 3. Lógica de los Segundos
      this.secText = this.getNumberWord(s, false);

      this.cdr.detectChanges();
    });
  }

  // Conversor inteligente de números a palabras en español (0-59)
  private getNumberWord(n: number, isHour: boolean): string {
    if (n === 0) return 'cero';

    // Base hasta el 29 (Nota: usamos "un" y "veintiún" para minutos/segundos)
    const units = ['cero', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte', 'veintiún', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'];

    // Si es la 1:00, decimos "una", no "un"
    if (isHour && n === 1) return 'una';

    if (n < 30) return units[n];

    const tens = ['', '', '', 'treinta', 'cuarenta', 'cincuenta'];
    const t = Math.floor(n / 10);
    const u = n % 10;

    if (u === 0) return tens[t];
    return `${tens[t]} y ${units[u]}`;
  }

  ngOnDestroy() {
    if (this.timeSub) this.timeSub.unsubscribe();
  }
}