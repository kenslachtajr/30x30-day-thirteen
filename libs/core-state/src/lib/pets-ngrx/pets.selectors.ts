import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  PETS_FEATURE_KEY,
  petsAdapter,
  PetsPartialState,
  PetsState
} from './pets.reducer';

export const selectPetsState = createFeatureSelector<
  PetsPartialState,
  PetsState
>(PETS_FEATURE_KEY);

const { selectAll, selectEntities } = petsAdapter.getSelectors();

export const selectPetsLoading = createSelector(
  selectPetsState,
  (state: PetsState) => state.isLoading
);

export const selectAllPets = createSelector(
  selectPetsState,
  (state: PetsState) => selectAll(state)
);

export const selectPetsEntities = createSelector(
  selectPetsState,
  (state: PetsState) => selectEntities(state)
);

export const selectPetId = createSelector(
  selectPetsState,
  (state: PetsState) => state.selectedPetId
);

export const selectPet = createSelector(
  selectPetsEntities,
  selectPetId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
