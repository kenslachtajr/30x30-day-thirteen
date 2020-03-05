import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pet } from '@ngrx-pets/core-data';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngrx-pets-pets-details',
  templateUrl: './pets-details.component.html',
  styleUrls: ['./pets-details.component.scss']
})
export class PetsDetailsComponent {
  currentPet: Pet;
  originalTitle;

  @Input() set pet(value) {
    if (value) this.originalTitle = value.title;
    this.currentPet = Object.assign({}, value);
  }
  @Input() form: FormGroup;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
}
