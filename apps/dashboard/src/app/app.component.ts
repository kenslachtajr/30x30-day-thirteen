import { Component } from '@angular/core';

@Component({
  selector: 'ngrx-pets-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pets App';

  links = [
    { path: '/pets', icon: 'work', title: 'Pets' },
  ]
}
