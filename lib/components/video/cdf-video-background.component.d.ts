import { AfterViewInit, OnInit } from '@angular/core';
import { CdfMediaModel } from '../../models/index';
import { ClientConfigService } from '../../services';
export declare class CdfVideoBackgroundComponent implements OnInit, AfterViewInit {
    private clientConfigService;
    videoJWPlayer: any;
    jwPlayerKey: string;
    videoPlayerId: string;
    youTubeUrl: string;
    mediaModel: CdfMediaModel;
    constructor(clientConfigService: ClientConfigService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    guid(): string;
}
