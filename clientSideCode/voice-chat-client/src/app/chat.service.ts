import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class ChatService {
    private serverUrl = "https://rideshark-voice-chat-server.herokuapp.com/";
    // private serverUrl = "http://localhost:3000";
    private socket: any;

    private pc: any;
    // private pcConfig = {
    //     'iceServers': [{
    //         'urls': 'stun:stun.l.google.com:19302'
    //     }]
    // };

    room: string;

    inTheRoom: BehaviorSubject<boolean> = new BehaviorSubject(false);

    isInitiator = false;
    isStarted = false;
    isChannelReady = false;

    localStream:any;
    remoteStream:any;

    localStreamEvent: BehaviorSubject<any> = new BehaviorSubject(undefined);
    remoteStreamEvent: BehaviorSubject<any> = new BehaviorSubject(undefined);

    constructor() {
        this.socket = io(this.serverUrl);
    }

    public createOrJoin(room: string) {
        this.room = room;
        this.socket.emit('create or join', room);
        this.inTheRoom.next(true);
    }

    public getMessages() : Observable<string> {
        return Observable.create( (observer) => {
            this.socket.on('created', (room) => {
                observer.next('Created room ' + room);
                this.isInitiator = true;
              });
              
            this.socket.on('full', (room) => {
                observer.next('Room ' + room + ' is full');
                this.inTheRoom.next(false);
              });

            this.socket.on('join',  (room) =>{
                observer.next('Another peer made a request to join room ' + room);
                observer.next('This peer is the initiator of room ' + room + '!');
                this.isChannelReady = true;
              });
              
            this.socket.on('joined', (room) => {
                observer.next('joined: ' + room);
                this.isChannelReady = true;
              });
            
            this.socket.on('left', (room) => {
                observer.next('left: ' + room);
            })

            this.socket.on('message', (message) => {
                console.log('CLient received message: ', message);
                if(message === 'got user media'){
                    this.maybeStart();
                } else if(message.type === 'offer') {
                    if(!this.isInitiator && !this.isStarted) {
                        this.maybeStart();
                    }
                    console.log(this.pc.signalingState);
                    this.pc.setRemoteDescription(new RTCSessionDescription(message));
                    this.doAnswer();
                } else if(message.type === 'answer' && this.isStarted) {
                    this.pc.setRemoteDescription(new RTCSessionDescription(message));
                } else if(message.type === 'candidate' && this.isStarted){
                    let candidate = new RTCIceCandidate({
                        sdpMLineIndex: message.label,
                        candidate: message.candidate
                    });
                    this.pc.addIceCandidate(candidate);
                } else if (message === 'bye') {
                    if(this.isStarted) {
                        this.handleRemoteHangup();
                    } else if (this.inTheRoom.value) {
                        this.handleRemoteDecline();
                    }
                }
            });
        });
    }

    sendMessage(message) {
        console.log("Client sending message: ", message);
        this.socket.emit('message', { "room": this.room, "message": message});
    }

    getUserMedia() {
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        }).then( (stream: MediaStream) => {
            this.localStream = stream;
            this.localStreamEvent.next({
                localStream: this.localStream
            })
            this.sendMessage('got user media');
            if(this.isInitiator) {
                this.maybeStart();
            }
        }).catch(e => {
            console.error(e);
        })
    }

    maybeStart() {
        console.log('>>>>>>> maybeStart() ', this.isStarted, this.localStream, this.isChannelReady);
        if (!this.isStarted && typeof this.localStream !== 'undefined' && this.isChannelReady) {
            console.log('>>>>>> creating peer connection');
            this.createPeerConnection();
            this.pc.addStream(this.localStream);
            this.isStarted = true;
            console.log('isInitiator', this.isInitiator);
            if (this.isInitiator) {
              this.doCall();
            }
        }
    }

    doCall() {
        console.log('Sending offer to peer');
        this.pc.createOffer(this.setLocalAndSendMessage, this.handleCreateOfferError);
    }

    doAnswer() {
        console.log('Sending answer to peer.');
        this.pc.createAnswer().then(
            this.setLocalAndSendMessage,
            this.onCreateSessionDescriptionError
        );
    }

    createPeerConnection() {
        console.log('createPeerConnection...');
        try {
            this.pc = new RTCPeerConnection(null);
            this.pc.onicecandidate = this.handleIceCandidate;
            this.pc.onaddstream = this.handleRemoteStreamAdded;
            this.pc.onremovestream = this.handleRemoteStreamRemoved;
            console.log('Created RTCPeerConnnection');
          } catch (e) {
            console.log('Failed to create PeerConnection, exception: ' + e.message);
            alert('Cannot create RTCPeerConnection object.');
            return;
          }
    }

    handleIceCandidate = (event) => {
        console.log('icecandidate event: ', event);
        if (event.candidate) {
            this.sendMessage({
                type: 'candidate',
                label: event.candidate.sdpMLineIndex,
                id: event.candidate.sdpMid,
                candidate: event.candidate.candidate
            });
        } else {
            console.log('End of candidates.');
        }
    }

    handleRemoteStreamAdded = (event) => {
        console.log('Remote stream added.');
        this.remoteStream = event.stream;
        this.remoteStreamEvent.next({
            remoteStream: this.remoteStream
        })
    }

    handleRemoteStreamRemoved(event) {
        console.log('Remote stream removed. Event: ', event);
    }

    handleCreateOfferError(event) {
        console.log('createOffer() error: ', event);
    }

    onCreateSessionDescriptionError(error) {
        console.log('Failed to create session description: ' + error.toString());
    }
    
    setLocalAndSendMessage = (sessionDescription) => {
        this.pc.setLocalDescription(sessionDescription);
        console.log('setLocalAndSendMessage sending message', sessionDescription);
        this.sendMessage(sessionDescription);
    }

    handleRemoteHangup() {
        console.log('Session terminated.');
        this.stop();
        this.stopLocal();
        this.socket.emit('bye', this.room);
    }

    handleRemoteDecline() {
        this.stopLocal();
        this.sendMessage('bye');
        this.inTheRoom.next(false);
        this.isStarted = false;
        this.pc = null;
    }

    hangUp() {
        this.stop();
        this.stopLocal();
        this.sendMessage('bye');
    }

    stopLocal() {
        let tracks = this.localStream.getTracks();
        tracks.forEach(track => {
            track.stop();
        });
        this.localStreamEvent.next(null);
        console.log(this.pc);
    }

    stop() {
        this.inTheRoom.next(false);
        this.isStarted = false;
        this.pc.close();
        this.pc = null;
    }
}