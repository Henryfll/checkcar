import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-transmicion',
  standalone: true,
  imports: [
    MatButtonModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatCardModule,
        CommonModule,
        MatIcon,
        MatTableModule,
        NgxSpinnerModule,
        MatSelect,
        MatOption
  ],
  templateUrl: './transmicion.component.html',
  styleUrl: './transmicion.component.scss'
})
export class TransmicionComponent {

  constructor(
    private dialog: MatDialog,
    private router: Router,
  ) {

    const rol= localStorage.getItem('rol')!;
    if(rol!='MONITOREO'){
      localStorage.clear();
          this.router.navigate(['/authentication/login']);
    }
  }
}
