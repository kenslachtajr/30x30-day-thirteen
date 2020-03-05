import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';

import { MaterialModule } from '@ngrx-pets/material';
import { CoreDataModule } from '@ngrx-pets/core-data';
import { UiLibraryModule } from '@ngrx-pets/ui-library';
import { CoreStateModule } from '@ngrx-pets/core-state';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PetsComponent } from './pets/pets.component';
import { PetsDetailsComponent } from './pets/pets-details/pets-details.component';
import { PetsListComponent } from './pets/pets-list/pets-list.component';
import { PetsItemComponent } from './pets/pets-item/pets-item.component';
import { WildComponent } from './wild/wild.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreDataModule,
    CoreStateModule,
    UiLibraryModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule
  ],
  declarations: [
    AppComponent,
    PetsComponent,
    PetsDetailsComponent,
    PetsListComponent,
    PetsItemComponent,
    WildComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
