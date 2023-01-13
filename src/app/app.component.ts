import { Component } from '@angular/core';
import { Router, Event, NavigationStart, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-inventario';

  constructor(private _router: Router, private _routeActive: ActivatedRoute,) {
    this._router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        const url = event.url
        if(url.includes('/?token=')) {
          const token = url.split('/?token=')[1];
          const params = [token];
          const query = {};
          this._router.navigate(['auth','reset-password', ...params], query)
        } else if(url === '/auth') {
          this._router.navigate(['/'])
        } else {

        }
      }
    })
  }
}
