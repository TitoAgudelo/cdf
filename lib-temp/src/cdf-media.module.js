var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdfImageComponent, CdfMediaComponent, CdfMediaSliderComponent, CdfVideoBackgroundComponent, CdfVideoYouTubeComponent } from './components';
import { ClientConfigService } from './services';
export var CONFIG_DATA = new OpaqueToken('Config Data');
export function configHelperFactory(config) {
    //console.log('------------------ MEDIA CONFIG DATA:', config);
    ClientConfigService.ConfigModel = config;
    return ClientConfigService;
}
var CdfMediaModule = (function () {
    function CdfMediaModule() {
    }
    CdfMediaModule_1 = CdfMediaModule;
    CdfMediaModule.forRoot = function (config) {
        return {
            ngModule: CdfMediaModule_1,
            providers: [
                ClientConfigService,
                {
                    provide: CONFIG_DATA,
                    useValue: config
                },
                {
                    provide: ClientConfigService,
                    useFactory: configHelperFactory,
                    deps: [CONFIG_DATA]
                }
            ]
        };
    };
    CdfMediaModule = CdfMediaModule_1 = __decorate([
        NgModule({
            imports: [
                CommonModule
            ],
            declarations: [
                //COMPONENTS
                CdfImageComponent,
                CdfMediaComponent,
                CdfMediaSliderComponent,
                CdfVideoBackgroundComponent,
                CdfVideoYouTubeComponent
            ],
            exports: [
                //COMPONENTS
                CdfMediaComponent,
                CdfMediaSliderComponent,
                CdfVideoBackgroundComponent
            ],
            entryComponents: [
                //COMPONENTS
                CdfMediaComponent,
                CdfMediaSliderComponent,
                CdfVideoBackgroundComponent
            ],
            providers: []
        })
    ], CdfMediaModule);
    return CdfMediaModule;
    var CdfMediaModule_1;
}());
export { CdfMediaModule };
//# sourceMappingURL=cdf-media.module.js.map