import { user } from './../../../resources/models/users';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { HelperProvider } from './../../providers/helper/helper';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private signinForm:FormGroup;
  private user = {} as user;
  constructor(public navCtrl: NavController,
              private afAuth:AngularFireAuth,
              private helper:HelperProvider) {
    this.signinForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  } 
  public async login(){
    let load = this.helper.getLoading('Waiting');
    if(this.signinForm.valid){
      try{
      console.log(this.signinForm.get('password').value)  
      this.user = {
        email:this.signinForm.get('email').value,
        password:this.signinForm.get('password').value
      }
      let loginRes = await this.afAuth.auth.signInWithEmailAndPassword(this.user.email,this.user.password);
        if(loginRes.user.uid){
          load.dismiss();
          this.helper.getToast('Signin successfull').onDidDismiss( ()=>{
           console.log('dashboard')
          })
        }else{
          load.dismiss();
        }
      }catch(err){
        console.log(err);
      }
    }else{

    }
  }
  public register(){
    this.navCtrl.push(RegisterPage);
  }
  public googleLogin() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  public googleLogout(){
    this.afAuth.auth.signOut();
  }

}
