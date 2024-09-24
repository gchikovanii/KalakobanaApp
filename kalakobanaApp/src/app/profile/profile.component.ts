import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { UpdateProfileDto } from '../Models/updateProfileDTO';
import { UserDto } from '../Models/UserDto';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  form = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    userName: new FormControl('',Validators.required),
    imageUrl: new FormControl('',Validators.required),
  })
  ngOnInit() {
    this.profileService.getProfile().subscribe({
      next: (userProfile: UserDto) => {
        this.form.patchValue({
          firstName: userProfile.fullName || '', // Replace with the correct property from UserDto
          lastName: '', // If you have lastName in your UserDto, set it here
          userName: userProfile.userName || '',
          imageUrl: userProfile.imageUrl || ''
        });
      },
      error: (err) => {
        console.error('Failed to load user profile:', err);
      }
    });
  }
  showProfileForm = signal(true);
  showSubscriptionForm = signal(false);
  activeView = signal('profile');
  profileService = inject(ProfileService);
  
  toggleView(view: string) {
    this.activeView.set(view); 
    if (view === 'profile') {
      this.showProfileForm.set(true);  
      this.showSubscriptionForm.set(false);  
    } else if (view === 'subscription') {
      this.showProfileForm.set(false);  
      this.showSubscriptionForm.set(true);  
    }
  }
  onSubmit(){
    const profileData: UpdateProfileDto = {
      userName: this.form.value.userName || null, 
      fullName: this.form.value.firstName || null, 
      imageUrl: this.form.value.imageUrl || null 
    };

    this.profileService.updateProfile(profileData).subscribe({
      next: response => {
        console.log('Profile updated successfully:', response);
        this.form.reset(); 
      },
      error: err => {
        console.error('Update failed:', err);
      }
    });
    this.form.reset();
  }

  
}
