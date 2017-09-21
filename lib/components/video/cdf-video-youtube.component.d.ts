import { AfterViewInit, EventEmitter, OnInit } from '@angular/core';
import { CdfMediaModel } from '../../models/index';
import { ClientConfigService } from '../../services';
export declare class CdfVideoYouTubeComponent implements OnInit, AfterViewInit {
    private clientConfigService;
    videoJWPlayer: any;
    jwPlayerKey: string;
    videoPlayerId: string;
    youTubeUrl: string;
    mediaModel: CdfMediaModel;
    onVideoBeforePlay: EventEmitter<any>;
    onVideoStopPlay: EventEmitter<any>;
    constructor(clientConfigService: ClientConfigService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    play(): void;
    stop(): void;
    guid(): string;
}
