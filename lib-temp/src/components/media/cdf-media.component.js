var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, HostBinding, ViewChild } from '@angular/core';
import { CdfMediaModel } from '../../models/index';
import { CdfImageComponent } from '../image/index';
import { CdfVideoYouTubeComponent } from '../video/index';
var CdfMediaComponent = (function () {
    function CdfMediaComponent() {
        this.showTitle = false;
        this.showType = false;
        this.onImageClick = new EventEmitter();
        this.onVideoBeforePlay = new EventEmitter();
        this.onVideoStopPlay = new EventEmitter();
        this.isMediaVideo = false;
        this.isMediaImage = false;
        this.canClickOnMedia = true;
        this.showTitleOriginal = false;
    }
    ;
    CdfMediaComponent.prototype.ngOnInit = function () {
        this.showTitleOriginal = (this.showTitle) ? true : false;
        this.isMediaVideo = this.mediaModel.HasVideo;
        this.isMediaImage = (this.mediaModel.HasImage && !this.mediaModel.HasVideo);
        this.classNames = (this.mediaModel.Type && this.mediaModel.Type.length > 0) ? 'type-' + this.getCleanType() : 'type-not-supplied';
    };
    ;
    CdfMediaComponent.prototype.stop = function () {
        this.videoComponent.stop();
        //console.log('STOP DAS PLAYER...', this.mediaModel.Title);
    };
    ;
    CdfMediaComponent.prototype.doOnVideoBeforePlay = function () {
        this.showTitle = false;
        if (this.onVideoBeforePlay) {
            this.onVideoBeforePlay.emit(this.mediaModel);
        }
    };
    ;
    CdfMediaComponent.prototype.doOnVideoStopPlay = function () {
        this.showTitle = this.showTitleOriginal;
        if (this.onVideoStopPlay) {
            this.onVideoStopPlay.emit(this.mediaModel);
        }
    };
    ;
    CdfMediaComponent.prototype.onMediaClick = function () {
        if (this.canClickOnMedia) {
            if (this.videoComponent) {
                this.videoComponent.play();
            }
            if (this.imageComponent) {
                this.doImageClick();
            }
            if (!this.imageComponent && !this.videoComponent) {
                this.doImageClick();
            }
        }
    };
    ;
    CdfMediaComponent.prototype.doImageClick = function () {
        if (this.onImageClick) {
            this.onImageClick.emit(this.mediaModel);
        }
    };
    ;
    CdfMediaComponent.prototype.getCleanType = function () {
        return this.mediaModel.Type.replace(/ /g, '').toLowerCase();
    };
    ;
    __decorate([
        Input(),
        __metadata("design:type", CdfMediaModel)
    ], CdfMediaComponent.prototype, "mediaModel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CdfMediaComponent.prototype, "showTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CdfMediaComponent.prototype, "showType", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CdfMediaComponent.prototype, "onImageClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CdfMediaComponent.prototype, "onVideoBeforePlay", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CdfMediaComponent.prototype, "onVideoStopPlay", void 0);
    __decorate([
        ViewChild(CdfVideoYouTubeComponent),
        __metadata("design:type", CdfVideoYouTubeComponent)
    ], CdfMediaComponent.prototype, "videoComponent", void 0);
    __decorate([
        ViewChild(CdfImageComponent),
        __metadata("design:type", CdfImageComponent)
    ], CdfMediaComponent.prototype, "imageComponent", void 0);
    __decorate([
        HostBinding('class.media-is-video'),
        __metadata("design:type", Boolean)
    ], CdfMediaComponent.prototype, "isMediaVideo", void 0);
    __decorate([
        HostBinding('class.media-is-image'),
        __metadata("design:type", Boolean)
    ], CdfMediaComponent.prototype, "isMediaImage", void 0);
    CdfMediaComponent = __decorate([
        Component({
            selector: 'cdf-media',
            template: "\n\t<!--IMAGE-->\n\t<cdf-image *ngIf=\"(mediaModel.HasImage && !mediaModel.HasVideo)\" \n\t\t\t\t[imageModel]=\"mediaModel\" \n\t\t\t\t(click)=\"doImageClick()\"></cdf-image>\n\n\t<!--VIDEO-->\n\t<cdf-video-youtube *ngIf=\"(mediaModel.HasVideo)\" \n\t\t\t\t[mediaModel]=\"mediaModel\"\n\t\t\t\t(onVideoBeforePlay)=\"doOnVideoBeforePlay()\"\n\t\t\t\t(onVideoStopPlay)=\"doOnVideoStopPlay()\"></cdf-video-youtube>\n\n\t<div (click)=\"onMediaClick()\">\n\t\t<ng-content></ng-content>\n\t</div>\n\n\t<span *ngIf=\"(showType && mediaModel.Type && mediaModel.Type.length > 0)\" class=\"cdf-media-type cdf-media-type-{{getCleanType()}}\">{{mediaModel.Type}}</span>\n\n\t<!--NO MEDIA ASSETS (NO IMAGE OR VIDEO)-->\n\t<section class=\"cdf-media-title-container\" *ngIf=\"(!mediaModel.HasImage && !mediaModel.HasVideo) || (showTitle)\">\n\t\t<a (click)=\"onMediaClick()\">\n\t\t\t<section class=\"cdf-media-title-wrapper\">\n\t\t\t\t<h2 class=\"cdf-media-title\">{{mediaModel.Title}}</h2>\n\t\t\t</section>\n\t\t</a>\n\t</section>\n\t",
            styles: ["\n\t:host \n\t{\n\t\tcursor: pointer;\n\t\tdisplay: inherit;\n\t\theight: 200px;\n\t\toverflow: hidden;\n\t\twidth: 200px;\n\t}\n\n\t:host:hover /deep/ .cdf-background-image,\n\t:host:hover /deep/ .jw-preview\n\t{\n\t\theight: 110%;\n\t\tmargin: -5%;\n\t\toverflow: hidden;\n\t\twidth: 110%;\n\t}\n\n\ta\n\t{\n\t\tdisplay: block;\n\t\theight: 100%;\n\t\twidth: 100%;\t\t\n\t}\n\n\t.cdf-media-type\n\t{\n\t\tbackground-color: #ccc;\n\t\tcolor: #fff;\n\t\tleft: 0.75rem;\n\t\tpadding: 0.25rem 0.5rem;\n\t\tposition: absolute;\n\t\ttop: 0.75rem;\t\n\t\tz-index: 100;\n\t}\n\n\t.cdf-media-title-container\n\t{\n\t\tbottom: 0;\n\t\tbackground-color: rgba(0,0,0,0.15);\n\t\tleft: 0;\n\t\tposition: absolute;\n\t\tright: 0;\n\t\ttop: 0;\n\t}\n\n\t.cdf-media-title-wrapper\n\t{\n\t\tbottom: 0;\n\t\tleft: 0;\n\t\tpadding: 10%;\n\t\tposition: absolute;\n\t\tright: 0;\n\t}\n\n\t.cdf-media-title\n\t{\n\t\tcolor: #fff;\n\t\tline-height: 1;\n\t\tposition: relative;\n\t\twidth: 100%;\n\t}\n\t"],
            host: {
                '[class]': 'classNames'
            },
            providers: []
        }),
        __metadata("design:paramtypes", [])
    ], CdfMediaComponent);
    return CdfMediaComponent;
}());
export { CdfMediaComponent };
//# sourceMappingURL=cdf-media.component.js.map