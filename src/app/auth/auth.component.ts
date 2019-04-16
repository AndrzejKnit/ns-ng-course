import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { TextField } from 'tns-core-modules/ui/text-field';
import { action } from "tns-core-modules/ui/dialogs";

import { AuthService } from './auth.service';

@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  moduleId: module.id,
})
export class AuthComponent implements OnInit {
    form: FormGroup;
    emailControlIsValid = true;
    passwordControlIsValid = true;
    isLogin = true;
    isLoading = false;

    public language: string = 'English';
    @ViewChild('passwordEl') passwordEl: ElementRef<TextField>
    @ViewChild('emailEl') emailEl: ElementRef<TextField>

  constructor(private router: RouterExtensions, private authService: AuthService) { }

  ngOnInit() {
      this.form = new FormGroup({
        email: new FormControl(null, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.email]
        }),
        password: new FormControl(null, {updateOn: 'blur',
            validators: [Validators.required, Validators.minLength(6)]
        })
      });

      this.form.get('email').statusChanges.subscribe(status => {
          this.emailControlIsValid = status === 'VALID';
      });
      this.form.get('password').statusChanges.subscribe(status => {
        this.passwordControlIsValid = status === 'VALID';
    });
  }
  onTypeServiceTap(): void {
    let options = {
        title: "Language",
        message: "Choose your language",
        cancelButtonText: "Cancel",
        actions: ["English", "Deutsch", "Polish"]
    };

    action(options).then((result) => {
        this.language = (result == 'Cancel') ? this.language : result;
    });
}


  onSubmit() {
      this.emailEl.nativeElement.focus();
      this.passwordEl.nativeElement.focus();
      this.passwordEl.nativeElement.dismissSoftInput();

      if (!this.form.valid) {
          return;
      }

      const email = this.form.get('email').value;
      const password = this.form.get('password').value;
      this.form.reset();
      this.emailControlIsValid = true;
      this.passwordControlIsValid = true;
      this.isLoading = true;
      if (this.isLogin) {
          this.authService.login(email, password).subscribe(resData => {
                this.router.navigate(['/challenges']);
                this.isLoading = false;
          }, err => {
            console.log(err);
            this.isLoading = false;
          });
      } else {
          this.authService.signUp(email, password).subscribe(resData => {
                this.router.navigate(['/challenges'] );
                this.isLoading = false;
          }, err => {
            console.log(err);
            this.isLoading = false;
          });
      }
  }

  onDone() {
    this.emailEl.nativeElement.focus();
      this.passwordEl.nativeElement.focus();
      this.passwordEl.nativeElement.dismissSoftInput();
  }

  onSwitch() {
    this.isLogin = !this.isLogin;
  }
 }
