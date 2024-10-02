import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import { SidenavComponent } from "../shared/sidenav/sidenav.component";
import { CityService } from '../services/city.service';
import { CountryService } from '../services/country.service';
import { FirstnameService } from '../services/firstname.service';
import { LastnameService } from '../services/lastname.service';
import { RiverService } from '../services/river.service';
import { MovieService } from '../services/movie.service';
import { AnimalService } from '../services/animal.service';
import { PlantService } from '../services/plant.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-data-maniputaion',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule, ReactiveFormsModule, MatSelectModule, SidenavComponent],
  templateUrl: './data-maniputaion.component.html',
  styleUrl: './data-maniputaion.component.css'
})
export class DataManiputaionComponent {
  addElementForm: FormGroup;
  cityService = inject(CityService);
  countryService = inject(CountryService);
  firstNameService = inject(FirstnameService);
  lastNameService = inject(LastnameService);
  plantService = inject(PlantService);
  animalService = inject(AnimalService);
  movieService = inject(MovieService);
  riverService = inject(RiverService);
  snackBar = inject(MatSnackBar);

  constructor(
    private fb: FormBuilder
  ) {
    this.addElementForm = this.fb.group({
      value: ['', Validators.required],
      option: ['', Validators.required]
    });
  }

  onSubmit() {
    const selectedOption = this.addElementForm.value.option;
    const value = this.addElementForm.value.value;

    switch (selectedOption) {
      case 'city':
        this.cityService.addCity({ value }).subscribe(response => {
          this.snackBar.open(`Added ${response.value}`, 'Close', { duration: 3000 }); 
          console.log(response.value);
        }, error => {
          this.snackBar.open(`${error.error}`, 'Close', { duration: 3000 });
        });
        break;
      case 'country':
        this.countryService.addCountry({ value }).subscribe(response => {
          this.snackBar.open(`Added ${response.value}`, 'Close', { duration: 3000 }); 
        }, error => {
          this.snackBar.open(`${error.error}`, 'Close', { duration: 3000 });
        });
        break;
        case 'firstName':
          this.firstNameService.addFirstName({ value }).subscribe(response => {
            this.snackBar.open(`Added ${response.value}`, 'Close', { duration: 3000 }); 
          }, error => {
            this.snackBar.open(` ${error.error}`, 'Close', { duration: 3000 });
          });
          break;
        case 'lastName':
          this.lastNameService.addLastName({ value }).subscribe(response => {
            this.snackBar.open(`Added ${response.value}`, 'Close', { duration: 3000 });
          }, error => {
            this.snackBar.open(`${error.error}`, 'Close', { duration: 3000 });
          });
          break;
          case 'river':
            this.riverService.addRiver({ value }).subscribe(response => {
              this.snackBar.open(`Added ${response.value}`, 'Close', { duration: 3000 }); 
            }, error => {
              this.snackBar.open(`${error.error}`, 'Close', { duration: 3000 });
            });
            break;      
            case 'movie':
            this.movieService.addMovie({ value }).subscribe(response => {
              this.snackBar.open(`Added ${response.value}`, 'Close', { duration: 3000 }); 
            }, error => {
              this.snackBar.open(`${error.error}`, 'Close', { duration: 3000 });

            });
            break;   
            case 'plant':
              this.plantService.addPlant({ value }).subscribe(response => {
                this.snackBar.open(`Added ${response.value}`, 'Close', { duration: 3000 });
              }, error => {
                this.snackBar.open(`${error.error}`, 'Close', { duration: 3000 });
              });
              break;          
              case 'animal':
                this.animalService.addAnimal({ value }).subscribe(response => {
                  this.snackBar.open(`Added ${response.value}`, 'Close', { duration: 3000 }); 
                }, error => {
                  this.snackBar.open(`${error.error}`, 'Close', { duration: 3000 });
                  console.log(error);
                });
                break;                                 
      // Add more cases for other options as needed
      default:
        console.warn('No valid option selected');
        break;
    }
  }
}
