import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VehiclesTableComponent } from './vehicles-table/vehicles-table.component';
import { VehiclesCardComponent } from './vehicles-card/vehicles-card.component';
import { AddEditVehicleModalComponent } from './add-edit-vehicle-modal/add-edit-vehicle-modal.component';
import { DeleteVehicleModalComponent } from './delete-vehicle-modal/delete-vehicle-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    VehiclesTableComponent,
    VehiclesCardComponent,
    AddEditVehicleModalComponent,
    DeleteVehicleModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
