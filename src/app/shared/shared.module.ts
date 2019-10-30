import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatSnackBarModule,
  MatDialogModule
} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule
  ]
})
export class SharedModule { }
