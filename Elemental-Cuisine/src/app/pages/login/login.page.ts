import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private email: string;
  private password: string;
  form: FormGroup;
  defaultUsers: Array<any> = [];
  user: User;

  constructor(
    private authService: AuthService, 
    private loadingService: LoadingService,     
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.addDefaultUser();
    this.form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }
 
  validation_messages = {
    'email': [
      { type: 'required', message: 'El email es requerido.' },
      { type: 'pattern', message: 'Ingrese un email válido.' }
    ],
    'password': [
      { type: 'required', message: 'La contraseña es requerida.' },
      { type: 'minlength', message: 'La password debe contener al menos 6 catacteres.' }
    ]
  };

  addDefaultUser(){
    this.defaultUsers.push({"email":"admin@admin.com", "password":"123456"});
    this.defaultUsers.push({"email":"cliente@cliente.com", "password":"123456"});
    this.defaultUsers.push({"email":"mozo@mozo.com", "password":"123456"});
  }

  setDefaultUser(){
    this.onSubmitLogin(this.user);
  }

  onSubmitLogin(form) {
    this.loadingService.showLoading("Espere..");

    this.authService.logIn(form.email, form.password)
      .then(res => {
        this.loadingService.closeLoadingAndRedirect("/home");
      })
      .catch(err => {
        this.loadingService.closeLoading("Error", "Verifique usuario y contraseña", 'error');
      });
  }
}
