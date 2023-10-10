import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public canvasTag;


  constructor() { }

  ngOnInit(): void {
    
    this.prue();
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

}
