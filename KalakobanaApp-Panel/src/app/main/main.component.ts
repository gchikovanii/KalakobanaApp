import { Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { SidenavComponent } from "../shared/sidenav/sidenav.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule, SidenavComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  displayedColumns: string[] = ['sentBy', 'value', 'xname', 'action'];
  dataSource = new MatTableDataSource(); 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  router = inject(Router);
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  goToUsers(){
    this.router.navigate(['/custom-manipulation']);
  }
  accept(element: any) {
    // handle accept logic
  }

  delete(element: any) {
    // handle delete logic
  }
}
