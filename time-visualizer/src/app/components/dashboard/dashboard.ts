import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { TimeService } from '../../services/time';
import { AnalogComponent } from '../clocks/analog/analog';
import { BinaryComponent } from '../clocks/binary/binary';
import { ProgressComponent } from '../clocks/progress/progress';
import { ConcentricComponent } from '../clocks/concentric/concentric';
import { TerminalComponent } from '../clocks/terminal/terminal';
import { DigitalComponent } from '../clocks/digital/digital';
import { TextComponent } from '../clocks/text/text';
import { OrbitalComponent } from '../clocks/orbital/orbital';
import { OdometerComponent } from '../clocks/odometer/odometer';
import { BlocksComponent } from '../clocks/blocks/blocks';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, AnalogComponent, BinaryComponent, ProgressComponent, ConcentricComponent, TerminalComponent, DigitalComponent, TextComponent, OrbitalComponent, OdometerComponent, BlocksComponent],
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