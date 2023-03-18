import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { AddEditVehicleModalComponent } from '../add-edit-vehicle-modal/add-edit-vehicle-modal.component';

import { DeleteVehicleModalComponent } from '../delete-vehicle-modal/delete-vehicle-modal.component';
import { vehicleDetails } from '../models/vehicle-details.model';

@Component({
  selector: 'app-vehicles-table',
  templateUrl: './vehicles-table.component.html',
  styleUrls: ['./vehicles-table.component.scss'],
})
export class VehiclesTableComponent implements OnChanges {
  @Input() vehicleData: vehicleDetails[] | undefined;

  @Output() dataChanged = new EventEmitter<vehicleDetails[]>();

  @ViewChild(MatTable) table: MatTable<vehicleDetails> | undefined;

  displayedColumns: string[] = [
    'ownerName',
    'make',
    'model',
    'color',
    'edit',
    'delete',
  ];

  dataSource: vehicleDetails[] = [];

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vehicleData'].currentValue) {
      this.dataSource = this.vehicleData ?? [];
    }
  }

  renderNewData() {
    this.table?.renderRows();
  }

  editVehicle(vehicleToEdit: vehicleDetails) {
    const dialogRef = this.dialog.open(AddEditVehicleModalComponent, {
      data: vehicleToEdit,
    });

    dialogRef.afterClosed().subscribe((editedVehicle) => {
      if (!editedVehicle) return;
      this.dataSource = this.dataSource.map((vehicle) => {
        if (vehicle.id !== vehicleToEdit.id) return vehicle;
        return { id: vehicleToEdit.id, ...editedVehicle };
      });

      this.dataChanged.emit(this.dataSource);

      const snackBarRef = this.snackBar.open(
        `${editedVehicle.ownerName}'s ${editedVehicle.make} ${editedVehicle.model} has been saved`,
        'Undo',
        { duration: 5000 }
      );

      snackBarRef.onAction().subscribe(() => {
        this.dataSource = this.dataSource.map((vehicle) => {
          if (vehicle.id !== vehicleToEdit.id) return vehicle;
          return { ...vehicleToEdit };
        });

        this.dataChanged.emit(this.dataSource);
      });
    });
  }

  deleteVehicle(vehicleToDelete: vehicleDetails) {
    const dialogRef = this.dialog.open(DeleteVehicleModalComponent, {
      data: vehicleToDelete,
    });

    dialogRef.afterClosed().subscribe((deletedVehicle: vehicleDetails) => {
      if (!deletedVehicle) return;
      this.dataSource = this.dataSource.filter(
        (vehicle) => vehicle.id !== vehicleToDelete.id
      );

      this.dataChanged.emit(this.dataSource);

      const snackBarRef = this.snackBar.open(
        `${deletedVehicle.ownerName}'s ${deletedVehicle.make} ${deletedVehicle.model} has been deleted`,
        'Undo',
        { duration: 3000 }
      );

      snackBarRef.onAction().subscribe(() => {
        this.dataSource.splice(vehicleToDelete.id - 1, 0, vehicleToDelete);
        this.dataChanged.emit(this.dataSource);
        this.renderNewData();
      });
    });
  }
}
