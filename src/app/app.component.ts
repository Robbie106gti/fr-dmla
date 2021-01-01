import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Theme, ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  started = false;
  constructor(private themeService: ThemeService) {
    if (!document) {
      this.started = true;
      this.themeService.appStarted();
    }
    this.removeInto();
  }

  removeInto() {
    if (document) {
      this.themeService.theme$.subscribe(theme => {
          const body = document.getElementById('body');
          if(theme === Theme.Light) {
            body.classList.remove(Theme.Dark);
            body.classList.add(Theme.Light);
          }
          if(theme === Theme.Dark) {
            body.classList.remove(Theme.Light);
            body.classList.add(Theme.Dark);
          }
      });
      const main = document.getElementById('main');
      const loading = document.getElementById('loading').innerText.length * 75;
      const text = 'Hold one while we load your content...'.length * 75;
      if (main) {
        setTimeout(() => {
          main.classList.add('hiding');
        }, text - loading);
        setTimeout(() => {
          main.classList.add('hide');
          this.started = true;
        }, text - loading + 400);
      }
    }
  }
}
