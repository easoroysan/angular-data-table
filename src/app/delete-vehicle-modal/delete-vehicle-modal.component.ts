import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { vehicleDetails } from '../models/vehicle-details.model';

@Component({
  selector: 'app-delete-vehicle-modal',
  templateUrl: './delete-vehicle-modal.component.html',
  styleUrls: ['./delete-vehicle-modal.component.scss'],
})
export class DeleteVehicleModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteVehicleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: vehicleDetails
  ) {}

  deleteVehicle() {
    this.dialogRef.close(this.data);
  }
}
