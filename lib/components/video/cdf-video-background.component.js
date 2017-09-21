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
var CdfVideoBackgroundComponent = (function () {
    function CdfVideoBackgroundComponent(clientConfigService) {
        this.clientConfigService = clientConfigService;
        this.youTubeUrl = 'https://www.youtube.com/watch?v=';
    }
    ;
    CdfVideoBackgroundComponent.prototype.ngOnInit = function () {
        this.jwPlayerKey = services_1.ClientConfigService.GetJwPlayerKey();
        window["jwplayer"] = jwPlayer;
        jwPlayer.key = this.jwPlayerKey;
        this.videoPlayerId = 'jwp_' + this.guid();
    };
    ;
    CdfVideoBackgroundComponent.prototype.ngAfterViewInit = function () {
        this.videoJWPlayer = jwPlayer(this.videoPlayerId);
        //console.log('Video Model', this.mediaModel);
        //VIDEO URL
        if (this.mediaModel.HasVideo && this.mediaModel.VideoList && this.mediaModel.VideoList.length > 0) {
            var playListSourceArray = [];
            //add video from array of types to play list			
            for (var _i = 0, _a = this.mediaModel.VideoList; _i < _a.length; _i++) {
                var item = _a[_i];
                playListSourceArray.push({
                    mediaid: this.guid(),
                    file: item.VideoUri,
                    label: "HD",
                    type: "mp4"
                });
            }
            this.videoJWPlayer.setup({
                controls: false,
                autostart: true,
                mute: true,
                repeat: true,
                height: "100%",
                width: "100%",
                stretching: "fill",
                playlist: [
                    {
                        mediaid: this.guid(),
                        sources: playListSourceArray
                    }
                ]
            });
        }
        else if (this.mediaModel.YouTubeId) {
            var videoUri = this.youTubeUrl + '' + this.mediaModel.YouTubeId;
            this.videoJWPlayer.setup({
                file: videoUri,
                controls: false,
                autostart: true,
                mute: true,
                repeat: true,
                mediaid: this.guid(),
                stretching: "fill",
                height: "100%",
                width: "100%"
            });
            this.videoJWPlayer.on('play', function (e) {
                jwPlayer().setVolume(0);
            });
        }
    };
    ;
    CdfVideoBackgroundComponent.prototype.guid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
    ;
    __decorate([
        core_1.Input(),
        __metadata("design:type", index_1.CdfMediaModel)
    ], CdfVideoBackgroundComponent.prototype, "mediaModel", void 0);
    CdfVideoBackgroundComponent = __decorate([
        core_1.Component({
            selector: 'cdf-video-background',
            template: "\n\t<div [id]=\"videoPlayerId\"></div>\n\t<ng-content></ng-content>\t\n\t",
            styles: ["\n\t:host \n\t{\n\t\theight: 200px;\n\t}\n\n\t:host /deep/ .jwplayer\n\t{\n\t\theight: inherit !important;\n\t}\n\n\t:host /deep/ .jw-error .jw-preview, \n\t:host /deep/ .jw-stretch-uniform .jw-preview, \n\t:host /deep/ .jwplayer .jw-preview,\n\t:host /deep/ .jw-preview\n\t{\n\t\tbackground-position: top center !important;\n\t\tbackground-size: cover !important;\n\t}\t\n\t"]
        }),
        __metadata("design:paramtypes", [services_1.ClientConfigService])
    ], CdfVideoBackgroundComponent);
    return CdfVideoBackgroundComponent;
}());
exports.CdfVideoBackgroundComponent = CdfVideoBackgroundComponent;
//# sourceMappingURL=cdf-video-background.component.js.map