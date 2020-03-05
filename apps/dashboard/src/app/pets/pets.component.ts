import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Pet, NotifyService, emptyPet } from '@ngrx-pets/core-data';
import { PetsFacade } from '@ngrx-pets/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngrx-pets-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  form: FormGroup;
  selectedPet: Pet;
  pets$: Observable<Pet[]> = this.petsFacade.allPets$;

  constructor(
    private petsFacade: PetsFacade,
    private formBuilder: FormBuilder,
    private notify: NotifyService
  ) {}

  ngOnInit() {
    this.initForm();
    this.petsFacade.loadPets();
    this.petsFacade.mutations$.subscribe(() => this.resetPet());
  }

  resetPet() {
    this.form.reset();
    this.selectPet(emptyPet);
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).setErrors(null);
    });
  }

  selectPet(pet: Pet) {
    this.petsFacade.selectPet(pet.id);
    this.form.patchValue(pet);
  }

  createPet() {
    this.notify.notification(`You have create ${this.form.value.model}`);
    this.petsFacade.createPet(this.form.value);
  }

  updatePet() {
    this.notify.notification(`You have updated ${this.form.value.title}`);
    this.petsFacade.updatePet(this.form.value);
  }

  savePet(pet: Pet) {
    if (pet.id) {
      this.updatePet();
    } else {
      this.createPet();
    }
  }

  deletePet(pet: Pet) {
    this.notify.notification(`You have deleted ${pet.type}`);
    this.petsFacade.deletePet(pet);
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: null,
      type: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])]
    });
  }
}
