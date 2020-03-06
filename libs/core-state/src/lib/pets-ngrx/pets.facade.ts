import { Injectable } from '@angular/core';
import { Action, select, Store, ActionsSubject } from '@ngrx/store';
import { filter } from 'rxjs/operators';

import * as fromPets from './pets.reducer';
import * as petsActions from './pets.actions';
import * as petsSelectors from './pets.selectors';
import { Pet } from '@ngrx-pets/core-data';

@Injectable({
  providedIn: 'root'
})
export class PetsFacade {
  allPets$ = this.store.pipe(select(petsSelectors.selectAllPets));
  selectedPet$ = this.store.pipe(select(petsSelectors.selectPet));
  petLoading$ = this.store.pipe(select(petsSelectors.selectPetsLoading));
  mutations$ = this.actions$.pipe(
    filter(
      (action: Action) =>
        action.type === petsActions.createPet({} as any).type ||
        action.type === petsActions.updatePet({} as any).type ||
        action.type === petsActions.deletePet({} as any).type
    )
  );

  constructor(
    private actions$: ActionsSubject,
    private store: Store<fromPets.PetsPartialState>
  ) {}

  selectPet(selectedPetId: string | number) {
    this.dispatch(petsActions.petSelected({ selectedPetId }));
  }

  loadPets() {
    this.dispatch(petsActions.loadPets());
  }

  loadPet(pet: Pet) {
    this.dispatch(petsActions.loadPet({ pet }));
  }

  createPet(pet: Pet) {
    this.dispatch(petsActions.createPet({ pet }));
  }

  updatePet(pet: Pet) {
    this.dispatch(petsActions.updatePet({ pet }));
  }

  deletePet(pet: Pet) {
    this.dispatch(petsActions.deletePet({ pet }));
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
