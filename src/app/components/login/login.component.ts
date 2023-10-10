import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../Services/login.service'
import { formattedError } from '@angular/compiler';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public canvasTag;
  public myForm :FormGroup;

  constructor(public loginService:LoginService) {  }

  ngOnInit(): void {

    this.myForm = new FormGroup({
      'usuario': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
    
    //this.prue();
  }

  prue() {
    var videoWidth = 320;
    var videoHeight = 240;
    this.canvasTag = document.getElementById('theCanvas');
    var btnCapture = document.getElementById("btnCapture");
    var videoTag: any = document.getElementById('theVideo');
    videoTag.setAttribute('width', videoWidth.toString());
    videoTag.setAttribute('height', videoHeight.toString());
    this.canvasTag.setAttribute('width', videoWidth.toString());
    this.canvasTag.setAttribute('height', videoHeight.toString());
    window.onload = () => {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: videoWidth,
          height: videoHeight
        }
      }).then(stream => {
        videoTag.srcObject = stream;
      }).catch(e => {
        document.getElementById('errorTxt').innerHTML = 'ERROR: ' + e.toString();
      });
      var canvasContext = this.canvasTag.getContext('2d');
      btnCapture.addEventListener("click", () => {
        canvasContext.drawImage(videoTag, 0, 0, videoWidth, videoHeight);
      });
    };
  }

  p() {
    console.log('funciono', this.canvasTag.toDataURL());
  }

  loginUser(){
    //debugger
   console.log(this.myForm.valid)
    if(this.myForm.valid){

      //alert("camila que te pasa,no me pasa nada");
      const username = this.myForm.controls['usuario'].value;
      const password = this.myForm.controls['password'].value;

      console.log(username,password)

      this.loginService.Login(username, password).subscribe(
        response => console.log(response),
        error => console.error(error)
      );

     
    }
    else{

      //alert("camila que te pasa,deje la bobada");
    }
  }

}
