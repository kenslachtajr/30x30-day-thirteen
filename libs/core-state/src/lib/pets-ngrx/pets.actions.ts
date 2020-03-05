import { createAction, props } from '@ngrx/store';
import { Pet } from '@ngrx-pets/core-data';

export const petSelected = createAction(
  '[PET] Pet Selected',
  props<{ selectedPetId: string | number }>()
);

export const loadPets = createAction('[PET] Load Pets');

export const petsLoaded = createAction(
  '[PET] Pets Loaded',
  props<{ pets: Pet[] }>()
);

export const loadPet = createAction(
  '[PET] Load Pet',
  props<{ petId: string | number }>()
);

export const petLoaded = createAction(
  '[PET] Pet Loaded',
  props<{ pet: Pet }>()
);

export const createPet = createAction(
  '[PET] Create Pet',
  props<{ pet: Pet }>()
);

export const petCreated = createAction(
  '[PET] Pet Created',
  props<{ pet: Pet }>()
);

export const updatePet = createAction(
  '[PET] Update Pet',
  props<{ pet: Pet }>()
);

export const petUpdated = createAction(
  '[PET] Pet Updated',
  props<{ pet: Pet }>()
);

export const deletePet = createAction(
  '[PET] Delete Pet',
  props<{ pet: Pet }>()
);

export const petDeleted = createAction(
  '[PET] Pet Deleted',
  props<{ pet: Pet }>()
);
