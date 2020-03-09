import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as petsActions from './pets.actions';
import { Pet } from '@ngrx-pets/core-data';

export const PETS_FEATURE_KEY = 'pets';

export interface PetsState extends EntityState<Pet> {
  selectedPetId?: string | number;
  isLoading: boolean;
}

export interface PetsPartialState {
  readonly [PETS_FEATURE_KEY]: PetsState;
}

export const petsAdapter: EntityAdapter<Pet> = createEntityAdapter<Pet>();

export const initialState: PetsState = petsAdapter.getInitialState({
  selectedPetId: null,
  isLoading: false
});

const petsReducer = createReducer(
  initialState,
  on(petsActions.petSelected, (state, {selectedPetId}) =>
  Object.assign({}, state, { selectedPetId })
  ),
  on(petsActions.petsLoaded, (state, { pets }) =>
  petsAdapter.addAll(pets, {...state, isLoading: false})
  ),
  on(petsActions.petUpdated, (state, {pet}) =>
  petsAdapter.upsertOne(pet, {...state, isLoading: false })
  ),
  on(petsActions.petDeleted, (state, { pet }) =>
  petsAdapter.removeOne(pet.id, {...state, isLoading: false})
  ),
  on(
    petsActions.loadPets,
    petsActions.createPet,
    petsActions.updatePet,
    petsActions.deletePet,
    state => ({
      ...state,
      isLoading: true
    })
  )
);

export function reducer(state: PetsState | undefined, action: Action) {
  return petsReducer(state, action);
}
