import { AfterViewInit, EventEmitter, NgZone, OnDestroy, OnInit, QueryList, Renderer } from '@angular/core';
import { CdfMediaComponent } from '../media/index';
import { CdfMediaModel } from '../../models/index';
export declare class CdfMediaSliderComponent implements OnInit, OnDestroy, AfterViewInit {
    private zone;
    private renderer;
    mediaModelList: CdfMediaModel[];
    showType: boolean;
    showTitle: boolean;
    showDescription: boolean;
    onImageClick: EventEmitter<any>;
    ULElement: any;
    mediaComponentList: QueryList<CdfMediaComponent>;
    activeMediaModel: CdfMediaModel;
    acceptableVariance: number;
    constructor(zone: NgZone, renderer: Renderer);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    onMediaComponentClick(event: any, mediaModel: any): void;
    private onVideoBeforePlay(mediaModel);
    private onVideoAfterStopPlay(mediaModel);
    private onStopVideoClick(mediaModel);
    private doImageClick(mediaModel);
    private calculateVariance(outsideBoxNumber, insideBoxNumber);
}
