var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { animate, Component, EventEmitter, Input, keyframes, NgZone, Output, QueryList, Renderer, state, style, trigger, transition, ViewChild, ViewChildren } from '@angular/core';
import { CdfMediaComponent } from '../media/index';
var CdfMediaSliderComponent = (function () {
    function CdfMediaSliderComponent(zone, renderer) {
        this.zone = zone;
        this.renderer = renderer;
        this.mediaModelList = [];
        this.showType = false;
        this.showTitle = false;
        this.showDescription = false;
        this.onImageClick = new EventEmitter();
        this.activeMediaModel = undefined;
        this.acceptableVariance = 0.20;
    }
    ;
    CdfMediaSliderComponent.prototype.ngOnInit = function () {
    };
    ;
    CdfMediaSliderComponent.prototype.ngOnDestroy = function () {
        var mediaComponentArray = this.mediaComponentList.toArray();
        //MAKE ALL MEDIA COMPONENTS INACTIVE SINCE NO MORE VIDEOS ARE PLAYING
        mediaComponentArray
            .map(function (mediaComponentToMakeInactive) {
            mediaComponentToMakeInactive.mediaModel['mediaPaneState'] = 'inactive';
            mediaComponentToMakeInactive.mediaModel['infoPaneExpandedState'] = 'void';
            mediaComponentToMakeInactive.mediaModel['IsInfoPaneExpanded'] = false;
        });
        this.mediaModelList = [];
        this.activeMediaModel = undefined;
    };
    ;
    CdfMediaSliderComponent.prototype.ngAfterViewInit = function () {
    };
    ;
    //DETERMINE WHICH DIRECTION SLIDEOUT SHOULD HAPPEN
    //BY COMPARING RECT OF LI CLICKED ON TO RECT OF UL
    CdfMediaSliderComponent.prototype.onMediaComponentClick = function (event, mediaModel) {
        if (this.activeMediaModel && this.activeMediaModel.Guid === mediaModel.Guid && mediaModel.HasVideo) {
            //console.log('---- 1. FIND DIMENSIONS OF SELECTED MEDIA COMPONENT...');
            //GET 'OUTSIDE-BOX' RECT FOR UL CONTAINING MEDIA COMPONENTS
            var outsideBoxRect = this.ULElement.nativeElement.getBoundingClientRect();
            var insideBoxRect_1;
            //FOR CLICKED ITEM, LOOK FOR 'media-slider-flex-item' CLASSNAME AND GET 'INSIDE-BOX' RECT
            event.path
                .filter(function (pathItem) {
                return (pathItem.className && pathItem.className.indexOf('media-slider-flex-item') !== -1);
            })
                .map(function (htmlElement) {
                insideBoxRect_1 = htmlElement.getBoundingClientRect();
            });
            // console.log('---------- OUTSIDE BOX:', outsideBoxRect);
            // console.log('---------- INSIDE BOX:', insideBoxRect);
            var varianceWidth = this.calculateVariance(Math.ceil(outsideBoxRect.width), Math.ceil(insideBoxRect_1.width));
            var varianceFromOutsideBoxRight = this.calculateVariance(Math.ceil(outsideBoxRect.right), Math.ceil(insideBoxRect_1.right));
            //console.log('--------- variance:', varianceFromOutsideBoxRight);
            //DEFAULT SLIDER DIRECTION...
            var sliderDirection = 'slideToRight';
            //IF SINGLE COLUMN (OUTSIDE & INSIDE WIDTHS ARE WITHIN ACCEPTABLE VARIANCE)        
            if (varianceWidth < this.acceptableVariance) {
                var varianceFromOutsideBoxBottom = this.calculateVariance(Math.ceil(outsideBoxRect.bottom), Math.ceil(insideBoxRect_1.bottom));
                //IF OUTSIDE & INSIDE BOTTOMS ARE WITHIN ACCEPTABLE VARIANCE, THEN SLIDE UP
                if (varianceFromOutsideBoxBottom < this.acceptableVariance) {
                    sliderDirection = 'slideToTop';
                }
                else {
                    sliderDirection = 'slideToBottom';
                }
            }
            else if (varianceFromOutsideBoxRight < this.acceptableVariance) {
                sliderDirection = 'slideToLeft';
            }
            mediaModel['infoPaneExpandedState'] = sliderDirection;
            mediaModel['IsInfoPaneExpanded'] = true;
            // console.log('--------- sliderDirection:', sliderDirection);        
            // console.log('--------- mediaModel:', mediaModel);
        }
        else {
            event.stopPropagation();
        }
    };
    ;
    //TURN OFF ALL OTHER VIDEOS EXCPET THE ONE ABOUT TO PLAY
    CdfMediaSliderComponent.prototype.onVideoBeforePlay = function (mediaModel) {
        var mediaComponentArray = this.mediaComponentList.toArray();
        //IF THERE IS NO ACTIVE MEDIA, THEN DIM ALL OTHER MEDIA ITEMS	
        if (!this.activeMediaModel) {
            //SET PASSED MEDIA MODEL AS ACTIVE
            mediaModel['mediaPaneState'] = 'active';
            this.activeMediaModel = mediaModel;
            //PREVENT ABILITY TO CLICK ON OTHER COMPONENTS WHILE VIDEO IS PLAYING, ALSO MAKE OTHER COMPONENTS DIM
            mediaComponentArray
                .filter(function (item) {
                return (item.mediaModel.Guid !== mediaModel.Guid);
            })
                .map(function (mediaComponent) {
                mediaComponent.canClickOnMedia = false;
                mediaComponent.mediaModel['mediaPaneState'] = 'dimmed';
            });
        }
    };
    ;
    //CLOSE SLIDE-OUT AFTER VIDEO FINISHES PLAYING ON ITS OWN, OR HAS BEEN MANUALLY STOPPED...	
    CdfMediaSliderComponent.prototype.onVideoAfterStopPlay = function (mediaModel) {
        var mediaComponentArray = this.mediaComponentList.toArray();
        //MARK ALL COMPONENTS AS CLICKABLE AND REMOVE DIM
        mediaComponentArray
            .map(function (mediaComponent) {
            mediaComponent.canClickOnMedia = true;
            mediaComponent.mediaModel['mediaPaneState'] = 'inactive';
        });
        //PAUSE WHILE TRIGGER ANIMATION FIRES THEN EMIT MEDIA SLIDER CLOSED...
        setTimeout(function () {
            //THIS IS WHAT TRIGGERS INFO PANE TO SLIDE AWAY
            mediaModel['IsInfoPaneExpanded'] = false;
        }, 100);
        this.activeMediaModel = undefined;
    };
    //MANUALLY STOPPING VIDEO BY CLOSING INFO PANE SLIDE-OUT	
    CdfMediaSliderComponent.prototype.onStopVideoClick = function (mediaModel) {
        var mediaComponentArray = this.mediaComponentList.toArray();
        mediaComponentArray
            .filter(function (item) {
            return (item.mediaModel.HasVideo && item.mediaModel.Guid === mediaModel.Guid);
        })
            .map(function (mediaComponentToStopPlaying) {
            mediaComponentToStopPlaying.stop();
        });
    };
    ;
    CdfMediaSliderComponent.prototype.doImageClick = function (mediaModel) {
        if (this.onImageClick) {
            this.onImageClick.emit(mediaModel);
        }
    };
    ;
    CdfMediaSliderComponent.prototype.calculateVariance = function (outsideBoxNumber, insideBoxNumber) {
        if (outsideBoxNumber === 0) {
            return 0;
        }
        return ((outsideBoxNumber - insideBoxNumber) / outsideBoxNumber);
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CdfMediaSliderComponent.prototype, "mediaModelList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CdfMediaSliderComponent.prototype, "showType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CdfMediaSliderComponent.prototype, "showTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CdfMediaSliderComponent.prototype, "showDescription", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CdfMediaSliderComponent.prototype, "onImageClick", void 0);
    __decorate([
        ViewChild('mediaComponentContainer'),
        __metadata("design:type", Object)
    ], CdfMediaSliderComponent.prototype, "ULElement", void 0);
    __decorate([
        ViewChildren(CdfMediaComponent),
        __metadata("design:type", QueryList)
    ], CdfMediaSliderComponent.prototype, "mediaComponentList", void 0);
    CdfMediaSliderComponent = __decorate([
        Component({
            selector: 'cdf-media-slider',
            template: "\n\t<ul #mediaComponentContainer class=\"media-slider-flex-container\">\n\n\t\t<li class=\"media-slider-flex-item\" \n\t\t\t(click)=\"onMediaComponentClick($event, mediaModel)\" \n\t\t\t[@mediaListItemTrigger]=\"mediaModel.mediaPaneState\"\n\t\t\t*ngFor=\"let mediaModel of mediaModelList; let i = index\">\n\t\t\t\n\t\t\t\n\t\t\t<!--MEDIA PANE-->\n\t\t\t<section class=\"cdf-media-pane-container\" [@mediaStateTrigger]=\"mediaModel.mediaPaneState\">\t\t\n\t\t\t\t<!--MEDIA: IMAGE OR VIDEO-->\n\t\t\t\t<cdf-media [mediaModel]=\"mediaModel\"\n\t\t\t\t\t\t\t[showTitle]=\"showTitle\"\n\t\t\t\t\t\t\t[showType]=\"showType\"\n\t\t\t\t\t\t\t(onImageClick)=\"doImageClick(mediaModel)\"\n\t\t\t\t\t\t\t(onVideoBeforePlay)=\"onVideoBeforePlay(mediaModel)\"\n\t\t\t\t\t\t\t(onVideoStopPlay)=\"onVideoAfterStopPlay(mediaModel)\">\n\t\t\t\t\t<ng-content select=\".cdf-media-content\"></ng-content>\t\t\t\n\t\t\t\t</cdf-media>\t\t\n\t\t\t</section>\n\n\t\t\t<!--INFO PANE-->\n\t\t\t<section class=\"cdf-info-pane-container\" *ngIf=\"mediaModel.IsInfoPaneExpanded\" [@infoPaneSlideTrigger]=\"mediaModel.infoPaneExpandedState\">\n\t\t\t\t<section class=\"cdf-info-pane-container__wrapper\">\n\n\t\t\t\t\t<!--CLOSE BUTTON-->\n\t\t\t\t\t<a class=\"close-button\" (click)=\"onStopVideoClick(mediaModel)\">\u00D7</a>\n\n\t\t\t\t\t<h2 class=\"cdf-info-pane-container__title\">{{mediaModel.Title}}</h2>\n\t\t\t\t\t<p class=\"cdf-info-pane-container__description\" *ngIf=\"showDescription\">{{mediaModel.Description}}</p>\n\n\t\t\t\t\t<button class=\"button radius small hollow cdf-info-pane-container__button\" (click)=\"doImageClick(mediaModel)\">Learn More</button>\t\n\n\t\t\t\t</section>\n\t\t\t</section>\t\n\t\t\t\n\t\t</li>\n\t</ul>\n\t",
            styles: ["\n\t:host\n\t{\n\t\tdisplay: block;\n\t\tmin-height: 10rem;\n\t\tposition: relative;\n\t}\n\n\t.media-slider-flex-container\n\t{\n\t\tdisplay: -webkit-box;\n\t\tdisplay: -moz-box;\n\t\tdisplay: -ms-flexbox;\n\t\tdisplay: -moz-flex;\n\t\tdisplay: -webkit-flex;\n\t\tdisplay: flex;\t\t\n\t\tflex-direction: row;\n\t\tflex-wrap: wrap;\n\t\tjustify-content: center;\n\t\tmin-height: 550px;\n\t\tmargin: auto;\n\t}\n\n\t@media only screen and (min-width : 842px)\n\t{\n\t\t.media-slider-flex-container\n\t\t{\n\t\t\tjustify-content: flex-start;\n\t\t\tmax-width: 825px;\n\t\t}\t\t\n\t}\t\n\n\t.media-slider-flex-item\n\t{\n\t\tlist-style: none;\n\t\twidth: 100vw;\n\t\theight: 30vh;\t\t\n\t\tposition: relative;\n\t}\n\n\t@media only screen and (min-width : 568px)\n\t{\n\t\t.media-slider-flex-item\n\t\t{\n\t\t\twidth: 48vw;\n\t\t\theight: 30vh;\t\n\t\t}\t\t\n\t}\t\n\n\t@media only screen and (min-width : 842px)\n\t{\n\t\t.media-slider-flex-item\n\t\t{\n\t\t\twidth: 275px;\n\t\t\theight: 275px;\n\t\t}\t\t\n\t}\t\t\n\n\tcdf-media\n\t{\n\t\theight: 100%;\n\t\twidth: 100%;\n\t}\n\n\t.cdf-media-pane-container\n\t{\n\t\tcursor: pointer;\n\t\tmargin: 0;\n\t\tmax-height: 100%;\n\t\tmin-height: 100%;\n\t\tpadding: 0;\n\t\tz-index: 10;\n\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tright: 0;\n\t\tbottom: 0;\n\t\tleft: 0;\t\n\t}\n\t\t.cdf-media-pane-container__title\n\t\t{\n\t\t\tcolor: #000;\n\t\t\tfont-size: 3.25rem;\n\t\t\tmargin: auto;\n\t\t\ttransform: rotate(3deg);\n\t\t}\t\n\n\t\t.cdf-media-pane-container:nth-child(2n)\n\t\t{\n\t\t\t.feature-list-container__item__title\n\t\t\t{\n\t\t\t\ttransform: rotate(-3deg);\n\t\t\t}\t\t\t\t\t\t\t\n\t\t}\t\t\t\n\n\n\t.cdf-info-pane-container\n\t{\n\t\tbackground-color: #fff;\n\t\tborder: solid 2px #becbd2;\n\t\tbottom: 0;\n\t\theight: 100%;\n\t\tleft: 0;\t\n\t\toverflow: hidden;\n\t\tpadding: 2.75rem 1rem 1rem 1rem;\n\t\tposition: absolute;\n\t\tright: 0;\n\t\ttop: 0;\n\t\twidth: 100%;\n\t\tz-index: 100;\n\t}\t\n\n\t\t.cdf-info-pane-container__wrapper\n\t\t{\n\t\t\tz-index: 0;\n\t\t}\n\n\t\t.cdf-info-pane-container__title\n\t\t{\n\t\t\tmargin: 0 0 1rem 0;\n\t\t}\n\n\t\t.cdf-info-pane-container__description\n\t\t{\n\t\t\tfont-size: 1rem;\n\t\t\tmargin: 0 0 1rem 0;\n\t\t}\n\n\t\t.cdf-info-pane-container__button\n\t\t{\n\t\t}\n\t"],
            providers: [],
            animations: [
                trigger('mediaListItemTrigger', [
                    //STATE WHEN VIDEO IS STOPPED AND BECOMES INACTIVE
                    state('inactive', style({ opacity: 1 })),
                    //STATE WHEN VIDEO IS PLAYING
                    state('active', style({ overflow: 'visible' })),
                    //STATE WHEN OTHER VIDEO IS PLAYING
                    state('dimmed', style({ opacity: 0.2, filter: 'blur(2px)' })),
                    transition('* => dimmed, * => active', [
                        style({}),
                        animate('300ms ease-out')
                    ]),
                    transition('* => inactive', [
                        style({}),
                        animate('700ms ease-out')
                    ])
                ]),
                trigger('mediaStateTrigger', [
                    //STATE WHEN VIDEO IS STOPPED AND BECOMES INACTIVE
                    state('inactive', style({})),
                    //STATE WHEN VIDEO IS PLAYING
                    state('active', style({ zIndex: 1000 })),
                    transition('* => inactive', [animate('500ms 350ms ease-in')])
                ]),
                trigger('infoPaneSlideTrigger', [
                    state('slideToTop', style({ zIndex: 11, top: '-100%' })),
                    state('slideToRight', style({ zIndex: 11, left: '100%' })),
                    state('slideToBottom', style({ zIndex: 11, top: '100%' })),
                    state('slideToLeft', style({ zIndex: 11, left: '-100%' })),
                    //EXPANDING TO TOP DIRECTION
                    transition('void => slideToTop', [
                        animate('500ms 350ms ease-in', keyframes([
                            style({ top: '0', offset: 0 }),
                            style({ top: '-25%', offset: 0.25 }),
                            style({ top: '-50%', offset: 0.5 }),
                            style({ top: '-75%', offset: 0.75 }),
                            style({ top: '-100%', offset: 1.0 })
                        ]))
                    ]),
                    transition('slideToTop => *', [
                        animate('500ms ease-out', keyframes([
                            style({ top: '-100%', offset: 0 }),
                            style({ top: '-75%', offset: 0.25 }),
                            style({ top: '-50%', offset: 0.5 }),
                            style({ top: '-25%', offset: 0.75 }),
                            style({ top: '0', offset: 1.0 })
                        ]))
                    ]),
                    //EXPANDING TO RIGHT DIRECTION
                    transition('void => slideToRight', [
                        animate('500ms 250ms ease-in', keyframes([
                            style({ left: '0', offset: 0 }),
                            style({ left: '25%', offset: 0.25 }),
                            style({ left: '50%', offset: 0.5 }),
                            style({ left: '75%', offset: 0.75 }),
                            style({ left: '100%', offset: 1.0 })
                        ]))
                    ]),
                    transition('slideToRight => *', [
                        animate('500ms ease-out', keyframes([
                            style({ left: '100%', offset: 0 }),
                            style({ left: '75%', offset: 0.25 }),
                            style({ left: '50%', offset: 0.5 }),
                            style({ left: '25%', offset: 0.75 }),
                            style({ left: '0', offset: 1.0 })
                        ]))
                    ]),
                    //EXPANDING TO BOTTOM DIRECTION
                    transition('void => slideToBottom', [
                        animate('500ms 350ms ease-in', keyframes([
                            style({ top: '0', offset: 0 }),
                            style({ top: '25%', offset: 0.25 }),
                            style({ top: '50%', offset: 0.5 }),
                            style({ top: '75%', offset: 0.75 }),
                            style({ top: '100%', offset: 1.0 })
                        ]))
                    ]),
                    transition('slideToBottom => *', [
                        animate('500ms ease-out', keyframes([
                            style({ top: '100%', offset: 0 }),
                            style({ top: '75%', offset: 0.25 }),
                            style({ top: '50%', offset: 0.5 }),
                            style({ top: '25%', offset: 0.75 }),
                            style({ top: '0', offset: 1.0 })
                        ]))
                    ]),
                    //EXPANDING TO LEFT DIRECTION
                    transition('void => slideToLeft', [
                        animate('500ms 350ms ease-in', keyframes([
                            style({ left: '0', offset: 0 }),
                            style({ left: '-25%', offset: 0.25 }),
                            style({ left: '-50%', offset: 0.5 }),
                            style({ left: '-75%', offset: 0.75 }),
                            style({ left: '-100%', offset: 1.0 })
                        ]))
                    ]),
                    transition('slideToLeft => *', [
                        animate('500ms ease-out', keyframes([
                            style({ left: '-100%', offset: 0 }),
                            style({ left: '-75%', offset: 0.25 }),
                            style({ left: '-50%', offset: 0.5 }),
                            style({ left: '-25%', offset: 0.75 }),
                            style({ left: '0', offset: 1.0 })
                        ]))
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [NgZone,
            Renderer])
    ], CdfMediaSliderComponent);
    return CdfMediaSliderComponent;
}());
export { CdfMediaSliderComponent };
//# sourceMappingURL=cdf-media-slider.component.js.map