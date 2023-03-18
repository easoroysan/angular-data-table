import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { vehicleDetails } from '../models/vehicle-details.model';

@Component({
  selector: 'app-add-edit-vehicle-modal',
  templateUrl: './add-edit-vehicle-modal.component.html',
  styleUrls: ['./add-edit-vehicle-modal.component.scss'],
})
export class AddEditVehicleModalComponent {
  vehicleFormGroup = new FormGroup({
    ownerName: new FormControl(this.data?.ownerName, Validators.required),
    make: new FormControl(this.data?.make, Validators.required),
    model: new FormControl(this.data?.model, Validators.required),
    color: new FormControl(this.data?.color),
  });

  constructor(
    public dialogRef: MatDialogRef<AddEditVehicleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: vehicleDetails
  ) {}

  addVehicle() {
    const formData = this.vehicleFormGroup.value;
    const newVehicle = {
      ownerName: formData.ownerName,
      make: formData.make,
      model: formData.model,
      color: formData.color,
    };
    this.dialogRef.close(newVehicle);
  }
}
