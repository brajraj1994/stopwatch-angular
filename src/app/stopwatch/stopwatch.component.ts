import { Component } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent {
  time: number = 0; // Time in milliseconds
  intervalId: any = null;
  running: boolean = false;
  startTime: number = 0; // To keep track of when the timer started or resumed

  start() {
    if (!this.running) {
      this.running = true;
      this.startTime = Date.now() - this.time; // Adjust for any already elapsed time
      this.intervalId = setInterval(() => this.updateTime(), 10); // Update every 10 milliseconds
    }
  }

  pauseOrResume() {
    debugger;
    if (this.running) {
      clearInterval(this.intervalId);
      this.running = !this.running;
    } else {
      this.start(); // Reuse start function to resume
    }
    
  }

  stop() {
    clearInterval(this.intervalId);
    this.time = 0;
    this.running = false;
  }

  updateTime() {
    this.time = Date.now() - this.startTime; // Calculate the elapsed time in milliseconds
  }

  formatTime(): string {
    const milliseconds = this.time % 1000;
    const totalSeconds = Math.floor(this.time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}:${this.padZero(milliseconds, 3)}`;
  }

  private padZero(num: number, size: number = 2): string {
    return num.toString().padStart(size, '0');
  }
}