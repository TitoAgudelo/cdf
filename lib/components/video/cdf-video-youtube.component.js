"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../../models/index");
var services_1 = require("../../services");
var jwPlayer = require('@cdf/cdf-ng-media/src/assets/lib/jwplayer-7.6.1/jwplayer.js');
var CdfVideoYouTubeComponent = (function () {
    function CdfVideoYouTubeComponent(clientConfigService) {
        this.clientConfigService = clientConfigService;
        this.youTubeUrl = 'https://www.youtube.com/watch?v=';
        this.onVideoBeforePlay = new core_1.EventEmitter();
        this.onVideoStopPlay = new core_1.EventEmitter();
    }
    ;
    CdfVideoYouTubeComponent.prototype.ngOnInit = function () {
        this.jwPlayerKey = services_1.ClientConfigService.GetJwPlayerKey();
        window["jwplayer"] = jwPlayer;
        jwPlayer.key = this.jwPlayerKey;
        this.videoPlayerId = 'jwp_' + this.guid();
    };
    CdfVideoYouTubeComponent.prototype.ngAfterViewInit = function () {
        this.videoJWPlayer = jwPlayer(this.videoPlayerId);
        //console.log('videoPlayerId', this.videoPlayerId);
        //VIDEO URL
        if (this.mediaModel.YouTubeId) {
            //console.log(' *********** mediaModel.ImageUri:', this.mediaModel.ImageUri);
            var that_1 = this;
            var videoUri = this.youTubeUrl + '' + this.mediaModel.YouTubeId;
            this.videoJWPlayer.setup({
                file: videoUri,
                image: this.mediaModel.ImageUri,
                controls: true,
                autostart: false,
                mute: false,
                repeat: false,
                mediaid: this.guid(),
                stretching: "fill",
                height: "100%",
                width: "100%"
            });
            this.videoJWPlayer.on('beforePlay', function (e) {
                //console.log('videoJWPlayer beforePlay...');
                if (that_1.onVideoBeforePlay) {
                    that_1.onVideoBeforePlay.emit();
                }
            });
            this.videoJWPlayer.on('play', function (e) {
                //console.log('videoJWPlayer play...');
            });
            this.videoJWPlayer.on('pause', function (e) {
                //console.log('videoJWPlayer pause...');
                if (that_1.onVideoStopPlay) {
                    that_1.onVideoStopPlay.emit();
                }
            });
            this.videoJWPlayer.on('beforeComplete', function (e) {
                //console.log('videoJWPlayer stop...');
                if (that_1.onVideoStopPlay) {
                    that_1.onVideoStopPlay.emit();
                }
            });
        }
    };
    CdfVideoYouTubeComponent.prototype.play = function () {
        if (this.videoJWPlayer) {
            this.videoJWPlayer.play();
            //console.log('PLAY DAS PLAYER...', this.mediaModel.Title);
        }
    };
    ;
    CdfVideoYouTubeComponent.prototype.stop = function () {
        if (this.videoJWPlayer) {
            //console.log('STOP DAS PLAYER...', this.mediaModel.Title);
            this.videoJWPlayer.stop();
            if (this.onVideoStopPlay) {
                this.onVideoStopPlay.emit();
            }
        }
    };
    ;
    CdfVideoYouTubeComponent.prototype.guid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", index_1.CdfMediaModel)
    ], CdfVideoYouTubeComponent.prototype, "mediaModel", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CdfVideoYouTubeComponent.prototype, "onVideoBeforePlay", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CdfVideoYouTubeComponent.prototype, "onVideoStopPlay", void 0);
    CdfVideoYouTubeComponent = __decorate([
        core_1.Component({
            selector: 'cdf-video-youtube',
            template: "\n\t<div [id]=\"videoPlayerId\"></div>\n\t<ng-content></ng-content>\t\n\t",
            styles: ["\n\t:host \n\t{\n\t\theight: 100%;\n\t\twidth: 100%;\n\t}\n\n\t:host /deep/ .jwplayer\n\t{\n\t\theight: inherit !important;\n\t}\n\t\n\t:host /deep/ .jw-error .jw-preview, \n\t:host /deep/ .jw-stretch-uniform .jw-preview, \n\t:host /deep/ .jwplayer .jw-preview,\n\t:host /deep/ .jw-preview\n\t{\n\t\tbackground-position: top center !important;\n\t\tbackground-size: cover !important;\n\t}\t\n\n\t:host /deep/ .jw-preview\n\t{\n\t\ttransition: all 0.3s ease 0s;\n\t}\n\t"]
        }),
        __metadata("design:paramtypes", [services_1.ClientConfigService])
    ], CdfVideoYouTubeComponent);
    return CdfVideoYouTubeComponent;
}());
exports.CdfVideoYouTubeComponent = CdfVideoYouTubeComponent;
//# sourceMappingURL=cdf-video-youtube.component.js.map