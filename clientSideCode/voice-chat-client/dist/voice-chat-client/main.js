(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "body {\n    font-family: sans-serif;\n  }\n  \n  canvas {\n    max-width: 100%;\n    width: 320px;\n  }\n  \n  video {\n    max-width: 100%;\n    width: 320px;\n  }\n  "

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div style=\"text-align:center\">\n  <h1>\n    Welcome to {{ title }}!\n  </h1>\n</div>\n<h2>Here are some links to help you start: </h2>\n\n<div id=\"videos\">\n  <video id=\"localVideo\" autoplay playsinline #localVideo></video>\n  <video id=\"remoteVideo\" autoplay playsinline #remoteVideo></video>\n</div>\n\n<div>\n  <button (click)=\"createOrJoin()\" [disabled]=\"inTheRoom\">Create or Join</button>\n  <button (click)=\"hangUp()\" [disabled]=\"!inTheRoom\">Hang Up </button>\n\n  <button (click)=\"getNumber()\">Say Bye</button>\n</div>\n\n<div *ngFor=\"let message of messages\">\n  {{message}}\n</div> \n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _chat_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chat.service */ "./src/app/chat.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(chatService) {
        this.chatService = chatService;
        this.title = 'Vocie Chat App Client Side';
        this.messages = [];
        this.inTheRoom = false;
    }
    AppComponent.prototype.createOrJoin = function () {
        this.chatService.createOrJoin("test");
        this.getUserMedia();
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.localV = this.localVideo.nativeElement;
        this.remoteV = this.remoteVideo.nativeElement;
        this.chatService.getMessages()
            .subscribe(function (message) {
            _this.messages.push(message);
        });
        this.chatService.localStreamEvent
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (v) {
            return !!v;
        }))
            .subscribe(function (event) {
            _this.localStream = event.localStream;
            _this.localV.srcObject = _this.localStream;
        });
        this.chatService.remoteStreamEvent
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (v) {
            return !!v;
        }))
            .subscribe(function (event) {
            console.log(event);
            _this.remoteStream = event.remoteStream;
            _this.remoteV.srcObject = _this.remoteStream;
            console.log(_this.localV, _this.remoteV);
        });
        this.chatService.inTheRoom.subscribe(function (v) { return _this.inTheRoom = v; });
    };
    AppComponent.prototype.getUserMedia = function () {
        this.chatService.getUserMedia();
    };
    AppComponent.prototype.hangUp = function () {
        this.chatService.hangUp();
    };
    AppComponent.prototype.getNumber = function () {
        this.chatService.room = 'test';
        this.chatService.sendMessage('bye');
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('localVideo'),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "localVideo", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('remoteVideo'),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "remoteVideo", void 0);
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_chat_service__WEBPACK_IMPORTED_MODULE_1__["ChatService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _chat_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chat.service */ "./src/app/chat.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]
            ],
            providers: [_chat_service__WEBPACK_IMPORTED_MODULE_3__["ChatService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/chat.service.ts":
/*!*********************************!*\
  !*** ./src/app/chat.service.ts ***!
  \*********************************/
/*! exports provided: ChatService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatService", function() { return ChatService; });
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ChatService = /** @class */ (function () {
    function ChatService() {
        var _this = this;
        this.serverUrl = "https://rideshark-voice-chat-server.herokuapp.com/";
        this.inTheRoom = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
        this.isInitiator = false;
        this.isStarted = false;
        this.isChannelReady = false;
        this.localStreamEvent = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](undefined);
        this.remoteStreamEvent = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](undefined);
        this.handleIceCandidate = function (event) {
            console.log('icecandidate event: ', event);
            if (event.candidate) {
                _this.sendMessage({
                    type: 'candidate',
                    label: event.candidate.sdpMLineIndex,
                    id: event.candidate.sdpMid,
                    candidate: event.candidate.candidate
                });
            }
            else {
                console.log('End of candidates.');
            }
        };
        this.handleRemoteStreamAdded = function (event) {
            console.log('Remote stream added.');
            _this.remoteStream = event.stream;
            _this.remoteStreamEvent.next({
                remoteStream: _this.remoteStream
            });
        };
        this.setLocalAndSendMessage = function (sessionDescription) {
            _this.pc.setLocalDescription(sessionDescription);
            console.log('setLocalAndSendMessage sending message', sessionDescription);
            _this.sendMessage(sessionDescription);
        };
        this.socket = socket_io_client__WEBPACK_IMPORTED_MODULE_0__(this.serverUrl);
    }
    ChatService.prototype.createOrJoin = function (room) {
        this.room = room;
        this.socket.emit('create or join', room);
        this.inTheRoom.next(true);
    };
    ChatService.prototype.getMessages = function () {
        var _this = this;
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].create(function (observer) {
            _this.socket.on('created', function (room) {
                observer.next('Created room ' + room);
                _this.isInitiator = true;
            });
            _this.socket.on('full', function (room) {
                observer.next('Room ' + room + ' is full');
                _this.inTheRoom.next(false);
            });
            _this.socket.on('join', function (room) {
                observer.next('Another peer made a request to join room ' + room);
                observer.next('This peer is the initiator of room ' + room + '!');
                _this.isChannelReady = true;
            });
            _this.socket.on('joined', function (room) {
                observer.next('joined: ' + room);
                _this.isChannelReady = true;
            });
            _this.socket.on('left', function (room) {
                observer.next('left: ' + room);
            });
            _this.socket.on('message', function (message) {
                console.log('CLient received message: ', message);
                if (message === 'got user media') {
                    _this.maybeStart();
                }
                else if (message.type === 'offer') {
                    if (!_this.isInitiator && !_this.isStarted) {
                        _this.maybeStart();
                    }
                    console.log(_this.pc.signalingState);
                    _this.pc.setRemoteDescription(new RTCSessionDescription(message));
                    _this.doAnswer();
                }
                else if (message.type === 'answer' && _this.isStarted) {
                    _this.pc.setRemoteDescription(new RTCSessionDescription(message));
                }
                else if (message.type === 'candidate' && _this.isStarted) {
                    var candidate = new RTCIceCandidate({
                        sdpMLineIndex: message.label,
                        candidate: message.candidate
                    });
                    _this.pc.addIceCandidate(candidate);
                }
                else if (message === 'bye') {
                    if (_this.isStarted) {
                        _this.handleRemoteHangup();
                    }
                    else if (_this.inTheRoom.value) {
                        _this.handleRemoteDecline();
                    }
                }
            });
        });
    };
    ChatService.prototype.sendMessage = function (message) {
        // console.log("Client sending message: ", message);
        this.socket.emit('message', { "room": this.room, "message": message });
    };
    ChatService.prototype.getUserMedia = function () {
        var _this = this;
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        }).then(function (stream) {
            _this.localStream = stream;
            _this.localStreamEvent.next({
                localStream: _this.localStream
            });
            _this.sendMessage('got user media');
            if (_this.isInitiator) {
                _this.maybeStart();
            }
        }).catch(function (e) {
            console.error(e);
        });
    };
    ChatService.prototype.maybeStart = function () {
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
    };
    ChatService.prototype.doCall = function () {
        console.log('Sending offer to peer');
        this.pc.createOffer(this.setLocalAndSendMessage, this.handleCreateOfferError);
    };
    ChatService.prototype.doAnswer = function () {
        console.log('Sending answer to peer.');
        this.pc.createAnswer().then(this.setLocalAndSendMessage, this.onCreateSessionDescriptionError);
    };
    ChatService.prototype.createPeerConnection = function () {
        console.log('createPeerConnection...');
        try {
            this.pc = new RTCPeerConnection(null);
            this.pc.onicecandidate = this.handleIceCandidate;
            this.pc.onaddstream = this.handleRemoteStreamAdded;
            this.pc.onremovestream = this.handleRemoteStreamRemoved;
            console.log('Created RTCPeerConnnection');
        }
        catch (e) {
            console.log('Failed to create PeerConnection, exception: ' + e.message);
            alert('Cannot create RTCPeerConnection object.');
            return;
        }
    };
    ChatService.prototype.handleRemoteStreamRemoved = function (event) {
        console.log('Remote stream removed. Event: ', event);
    };
    ChatService.prototype.handleCreateOfferError = function (event) {
        console.log('createOffer() error: ', event);
    };
    ChatService.prototype.onCreateSessionDescriptionError = function (error) {
        console.log('Failed to create session description: ' + error.toString());
    };
    ChatService.prototype.handleRemoteHangup = function () {
        console.log('Session terminated.');
        this.stop();
        this.stopLocal();
        this.socket.emit('bye', this.room);
    };
    ChatService.prototype.handleRemoteDecline = function () {
        this.stopLocal();
        this.sendMessage('bye');
        this.inTheRoom.next(false);
        this.isStarted = false;
        this.pc = null;
    };
    ChatService.prototype.hangUp = function () {
        this.stop();
        this.stopLocal();
        this.sendMessage('bye');
    };
    ChatService.prototype.stopLocal = function () {
        var tracks = this.localStream.getTracks();
        tracks.forEach(function (track) {
            track.stop();
        });
        this.localStreamEvent.next(null);
        console.log(this.pc);
    };
    ChatService.prototype.stop = function () {
        this.inTheRoom.next(false);
        this.isStarted = false;
        this.pc.close();
        this.pc = null;
    };
    ChatService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], ChatService);
    return ChatService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/rideshark/Documents/Data-jiuzhou/test/expressServerTest/clientSideCode/voice-chat-client/src/main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map