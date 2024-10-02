import { Component, inject } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule,MatListModule,RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  authService = inject(AuthService);
  router = inject(Router);
  logOut() {
    this.authService.logout().subscribe({
      next: () => {
        location.reload();
      },
      error: (err) => {
        console.error('Logout error:', err);
        location.reload();
      }
    });
  }
}
