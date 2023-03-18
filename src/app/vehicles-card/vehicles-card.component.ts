import { Component, ViewChild } from '@angular/core';
import {
  INITIAL_VEHICLE_DATA,
  vehicleDetails,
} from '../models/vehicle-details.model';
import { MatDialog } from '@angular/material/dialog';
import { AddEditVehicleModalComponent } from '../add-edit-vehicle-modal/add-edit-vehicle-modal.component';
import { VehiclesTableComponent } from '../vehicles-table/vehicles-table.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vehicles-card',
  templateUrl: './vehicles-card.component.html',
  styleUrls: ['./vehicles-card.component.scss'],
})
export class VehiclesCardComponent {
  dataSource = INITIAL_VEHICLE_DATA;
  newVehicleId = 11;

  @ViewChild(VehiclesTableComponent) table: VehiclesTableComponent | undefined;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}

  openAddVehicleModal() {
    const dialogRef = this.dialog.open(AddEditVehicleModalComponent);

    dialogRef.afterClosed().subscribe((newVehicle) => {
      if (!newVehicle) return;
      this.dataSource.push({ id: this.newVehicleId, ...newVehicle });
      this.table?.renderNewData();
      this.newVehicleId++;

      const snackBarRef = this.snackBar.open(
        `${newVehicle.ownerName}'s ${newVehicle.make} ${newVehicle.model} has been added`,
        undefined,
        { duration: 3000 }
      );
    });
  }

  dataChanged(newData: vehicleDetails[]) {
    this.dataSource = newData;
  }
}
