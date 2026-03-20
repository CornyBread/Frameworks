import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { TimeService } from '../../services/time';
import { AnalogComponent } from '../clocks/analog';
import { BinaryComponent } from '../clocks/binary';
import { ProgressComponent } from '../clocks/progress';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, AnalogComponent, BinaryComponent, ProgressComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {
  selectedClock: string = 'analog';
  sliderValue: number = 0;

  constructor(public authService: AuthService, public timeService: TimeService) {}

  onSliderChange() {
    this.timeService.setOffsetInHours(this.sliderValue);
  }

  resetTime() {
    this.sliderValue = 0;
    this.timeService.resetTime();
  }
}