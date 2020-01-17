import { Component, ViewChild } from '@angular/core';
import { ChatService } from './chat.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Vocie Chat App Client Side';
  messages: string[] = [];

  @ViewChild('localVideo') localVideo: any;
  @ViewChild('remoteVideo') remoteVideo: any;
  
  localV: any;
  remoteV: any;

  localStream: any;
  remoteStream: any;

  constructor (private chatService: ChatService) {}

  public createOrJoin() {
    this.chatService.createOrJoin("test");
    this.getUserMedia();
  }

  ngOnInit() {
    this.localV = this.localVideo.nativeElement;
    this.remoteV = this.remoteVideo.nativeElement;

    this.chatService.getMessages()
      .subscribe( (message: string) => {
        this.messages.push(message);
      });

    this.chatService.localStreamEvent
    .pipe(filter(v => {
      return !!v
    }))
    .subscribe(event => {
      this.localStream = event.localStream;
      this.localV.srcObject = this.localStream;
    });
    this.chatService.remoteStreamEvent
    .pipe(filter(v => {
      return !!v
    }))
    .subscribe(event => {
      this.remoteStream = event.remoteStream;
      this.remoteV.srcObject = this.remoteStream;
    });
  }

  private getUserMedia() {
    this.chatService.getUserMedia();
  }

  public handleRemoteStream(event) {
    this.remoteStream = event.stream;
    this.remoteVideo.srcObject = this.remoteStream;
  }

  public handleRemoteStreamRemoved(event) {
    console.log('Remote stream removed. Event: ', event);
  }
}
