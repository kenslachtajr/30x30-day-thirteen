import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pet } from '@ngrx-pets/core-data';

@Component({
  selector: 'ngrx-pets-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss']
})
export class PetsListComponent {
  @Input() pets: Pet[]
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
