import { Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { SidenavComponent } from "../shared/sidenav/sidenav.component";
import { CustomUser } from '../models/CustomUser';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule, FormsModule,ReactiveFormsModule,CommonModule,
    MatToolbarModule, MatSlideToggleModule, SidenavComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  userDataSource = new MatTableDataSource<CustomUser>();
  email: string | null | undefined = '';

  form = new FormGroup({
    email: new FormControl('')
  })

  displayedColumns: string[] = ['email', 'active', 'update'];
  router = inject(Router);
  userService = inject(UserService);
  snackBar = inject(MatSnackBar);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.userDataSource.paginator = this.paginator;
  }
  goToMain(){
    this.router.navigate(['/']);
  }
  onSubmit() {
    this.email = this.form.value.email;
    console.log(this.email)
    if (this.email) {
      this.userService.getUserByEmail(this.email).subscribe({
        next: (user) => {
          this.userDataSource.data = user ? [user] : []; // Wrap user in an array for the table
        },
        error: (err) => {
          this.snackBar.open(`მომხმარებელი ${this.email}-ით არ არსებობს`, 'Close', { duration: 3000 });
          this.userDataSource.data = []; // Clear the table on error
        }
      });
    }
  }
    updateStatus(user: CustomUser) {
      debugger;
      this.userService.updateStatus(user).subscribe({
        next: () => {
          this.snackBar.open(`მომხარებლის პროფილი - ელ.ფოსტით ${user.email} წარმატებით განახლდა`, 'Close', { duration: 3000 }); // Show success Snackbar
        },
        error: (err) => {
          this.snackBar.open(`შეცდომა, ${user.email}-ის პროფილი ვერ განახლდა`, 'Close', { duration: 3000 });
        }
      });
  }
}


