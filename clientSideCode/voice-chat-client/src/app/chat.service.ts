import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { parseCookieValue } from '@angular/common/src/cookie';

@Injectable()
export class ChatService {
    private serverUrl = "https://rideshark-voice-chat-server.herokuapp.com/";
    private socket: any;

    private pc: any;
    private pcConfig = {
        'iceServers': [{
            'urls': 'stun:stun.l.google.com:19302'
        }]
    };

    isLocal = true;

    isInitiator = false;
    isStarted = false;
    isChannelReady = false;

    localStream:any;
    remoteStream:any;

    constructor() {
        this.socket = io(this.serverUrl);
    }

    public createOrJoin(room: string) {
        this.socket.emit('create or join', room);
    }

    public getMessages() : Observable<string> {
        return Observable.create( (observer) => {
            this.socket.on('created', function(room) {
                observer.next('Created room ' + room);
                this.isInitiator = true;
              });
              
            this.socket.on('full', function(room) {
                observer.next('Room ' + room + ' is full');
              });

            this.socket.on('join', function (room){
                observer.next('Another peer made a request to join room ' + room);
                observer.next('This peer is the initiator of room ' + room + '!');
                this.isChannelReady = true;
              });
              
            this.socket.on('joined', function(room) {
                observer.next('joined: ' + room);
                this.isChannelReady = true;
              });

            this.socket.on('message', function(message){
                console.log('CLient received message: ', message);
                if(message === 'got user media'){
                    maybeStart();
                } else if(message.type === 'offer') {
                    if(!this.isInitiator && !this.isStarted) {
                        maybeStart();
                    }
                    this.pc.setRemoteDescription(new RTCSessionDescription(message));
                    doAnswer();
                } else if(message.type === 'answer' && this.isStarted) {
                    this.pc.setRemoteDescription(new RTCSessionDescription(message));
                } else if(message.type === 'candidate' && this.isStarted){
                    let candidate = new RTCIceCandidate({
                        sdpMLineIndex: message.label,
                        candidate: message.candidate
                    });
                    this.pc.addIceCandidate(candidate);
                } else if (message === 'bye' && this.isStarted) {
                    handleRemoteHangUp();
                }
            });
        });
    }

    sendMessage(message) {
        console.log("Client sending message: ", message);
        this.socket.emit('message', message);
    }
}