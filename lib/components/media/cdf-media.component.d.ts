import { OnInit, EventEmitter } from '@angular/core';
import { CdfMediaModel } from '../../models/index';
import { CdfImageComponent } from '../image/index';
import { CdfVideoYouTubeComponent } from '../video/index';
export declare class CdfMediaComponent implements OnInit {
    mediaModel: CdfMediaModel;
    showTitle: boolean;
    showType: boolean;
    onImageClick: EventEmitter<any>;
    onVideoBeforePlay: EventEmitter<any>;
    onVideoStopPlay: EventEmitter<any>;
    videoComponent: CdfVideoYouTubeComponent;
    imageComponent: CdfImageComponent;
    isMediaVideo: boolean;
    isMediaImage: boolean;
    canClickOnMedia: boolean;
    showTitleOriginal: boolean;
    classNames: string;
    constructor();
    ngOnInit(): void;
    stop(): void;
    doOnVideoBeforePlay(): void;
    doOnVideoStopPlay(): void;
    onMediaClick(): void;
    doImageClick(): void;
    getCleanType(): string;
}
