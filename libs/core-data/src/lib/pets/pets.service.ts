import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pet } from './pet.model';

const BASE_URL = 'https://kenneth-server.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  model = 'pets';

  constructor(private httpClient: HttpClient) {}

  getUrl() {
    return `${BASE_URL}${this.model}`;
  }

  all() {
    return this.httpClient.get(this.getUrl());
  }

  findOne(pet: Pet) {
    return this.httpClient.get(this.getUrlForId(pet));
  }

  create(pet: Pet) {
    return this.httpClient.post(this.getUrl(), pet);
  }

  getUrlForId(id) {
    return `${this.getUrl()}/${id}`;
  }

  update(pet: Pet) {
    return this.httpClient.patch(this.getUrlForId(pet.id), pet);
  }

  delete(pet: Pet) {
    return this.httpClient.delete(this.getUrlForId(pet.id));
  }
}
