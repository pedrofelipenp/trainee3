import { Component, OnInit } from '@angular/core';
import { FormsModule, CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  userData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    gender: '',
    maritalStatus: '',
    profession: '',
    phone: '',
    zipCode: '',
    interests: [] as string[],
    newsletter: false,
    terms: false
  };

  submittedData: any = null;

  ngOnInit(){
    console.log(this.userData)
  }

  onSubmit(form: any) {
    if (form.valid && this.userData.password === this.userData.confirmPassword) {
      this.submittedData = { ...this.userData };
      console.log('Formulário válido:', this.userData);
    }
  }

  resetForm(form: any) {
    form.resetForm();
    this.userData = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthDate: '',
      gender: '',
      maritalStatus: '',
      profession: '',
      phone: '',
      zipCode: '',
      interests: [],
      newsletter: false,
      terms: false
    };
    this.submittedData = null;
  }
}