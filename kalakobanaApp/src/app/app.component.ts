import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from "./loader/loader.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kalakobanaApp';
  isLoading = true;

  constructor() {
    setTimeout(() => {
      //will be moved to busy service in the future
      this.isLoading = false;
    }, 2000); 
  }
}
