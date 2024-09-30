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

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule, MatSlideToggleModule, SidenavComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  displayedColumns: string[] = ['email', 'isActive'];
  userDataSource = new MatTableDataSource(); // Replace USER_DATA with real data from DB
  router = inject(Router);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.userDataSource.paginator = this.paginator;
  }
  goToMain(){
    this.router.navigate(['/']);
  }
}


