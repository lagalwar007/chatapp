import { HelperProvider } from './../../providers/helper/helper';
import { AngularFireAuth } from 'angularfire2/auth';
import { user } from './../../../resources/models/users';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@IonicPage()

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public registerForm:FormGroup;
  private user = {} as user;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public fireAuth:AngularFireAuth,
              public helper:HelperProvider) {
    this.registerForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  login(){
    this.navCtrl.pop();
  }
  async register(){
    let load = this.helper.getLoading('Waiting');
    try{
      if(this.registerForm.valid){
        this.user = {
          email:this.registerForm.get('email').value,
          password:this.registerForm.get('password').value
        };
        const result = await this.fireAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password);
        if (result.user.uid){
          load.dismiss();
          this.navCtrl.pop();
        }
      }else{
        load.dismiss();
        this.helper.getAlert('ERROR','Data is not valid');
      }
    }catch(err){
      load.dismiss();
      console.warn(err);
    } 
  }
}
