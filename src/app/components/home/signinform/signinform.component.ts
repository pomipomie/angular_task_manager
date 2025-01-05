import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signinform',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './signinform.component.html',
  styleUrls: ['./signinform.component.css', '../home.component.css'],
})
export class SigninformComponent {
  username = '';
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  signUpForm!: FormGroup;
  hidePassword: boolean = true;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  signUp() {
    if (this.signUpForm.valid) {
      const { username, firstName, lastName, email, password } =
        this.signUpForm.value;
      this.authService.signUp(username, firstName, lastName, email, password);
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
