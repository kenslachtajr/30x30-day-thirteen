import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';

import * as petsActions from './pets.actions';
import { Pet, PetsService, NotifyService } from '@ngrx-pets/core-data';
import { PetsPartialState } from './pets.reducer';
import { PetsFacade } from './pets.facade';

@Injectable()
export class PetsEffect {
  loadPets$ = createEffect(() =>
    this.dataPersistence.fetch(petsActions.loadPets, {
      run: (
        action: ReturnType<typeof petsActions.loadPets>,
        state: PetsPartialState
      ) => {
        return this.petsService
          .all()
          .pipe(map((pets: Pet[]) => petsActions.petsLoaded({ pets })));
      },
      onError: (action: ReturnType<typeof petsActions.loadPets>, error) => {
        this.notify.notification('Effect Error:', error);
      }
    })
  );

  loadPet$ = createEffect(() =>
    this.dataPersistence.fetch(petsActions.loadPet, {
      run: (
        action: ReturnType<typeof petsActions.loadPet>,
        state: PetsPartialState
      ) => {
        return this.petsService
          .findOne(action.pet)
          .pipe(map((pet: Pet) => petsActions.petLoaded({ pet })));
      },
      onError: (action: ReturnType<typeof petsActions.loadPet>, error) => {
        this.notify.notification('Effect Error:', error);
      }
    })
  );

  selectPetOnLoad$ = createEffect(() =>
    this.dataPersistence.actions.pipe(
      ofType(petsActions.petLoaded),
      map(({ pet }) => petsActions.petSelected({ selectedPetId: pet.id }))
    )
  );

  createPet$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(petsActions.createPet, {
      run: (
        action: ReturnType<typeof petsActions.createPet>,
        state: PetsPartialState
      ) => {
        return this.petsService
          .create(action.pet)
          .pipe(
            map((pet: Pet) => petsActions.petCreated({ pet })),
            tap(() => this.petsFacade.loadPets())
            )
      },
      onError: (action: ReturnType<typeof petsActions.createPet>, error) => {
        this.notify.notification('Effect Error:', error);
      }
    })
  );

  updatePet$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(petsActions.updatePet, {
      run: (
        action: ReturnType<typeof petsActions.updatePet>,
        state: PetsPartialState
      ) => {
        return this.petsService.update(action.pet).pipe(
          map((pet: Pet) => petsActions.petUpdated({ pet })),
          tap(() => this.petsService.all())
        );
      },
      onError: (action: ReturnType<typeof petsActions.updatePet>, error) => {
        this.notify.notification('Effect Error:', error);
      }
    })
  );

  deletePet$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(petsActions.deletePet, {
      run: (
        action: ReturnType<typeof petsActions.deletePet>,
        state: PetsPartialState
      ) => {
        return this.petsService
          .delete(action.pet)
          .pipe(map(() => petsActions.petDeleted({ pet: action.pet })));
      },
      onError: (action: ReturnType<typeof petsActions.deletePet>, error) => {
        this.notify.notification('Effect delete Error: ', error);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<PetsPartialState>,
    private petsService: PetsService,
    private petsFacade: PetsFacade,
    private notify: NotifyService
  ) {}
}
