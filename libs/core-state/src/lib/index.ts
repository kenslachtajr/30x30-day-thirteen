import { ActionReducerMap } from '@ngrx/store';
import * as fromPets from './pets-ngrx/pets.reducer';

export interface AppState {
  pets: fromPets.PetsState;
}

export const reducers: ActionReducerMap<AppState> = {
  pets: fromPets.reducer
};

export const defaultState: AppState = {
  pets: { ids: [] } as fromPets.PetsState
};
