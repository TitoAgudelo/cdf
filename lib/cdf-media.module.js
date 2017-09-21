"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var components_1 = require("./components");
var services_1 = require("./services");
exports.CONFIG_DATA = new core_1.OpaqueToken('Config Data');
function configHelperFactory(config) {
    //console.log('------------------ MEDIA CONFIG DATA:', config);
    services_1.ClientConfigService.ConfigModel = config;
    return services_1.ClientConfigService;
}
exports.configHelperFactory = configHelperFactory;
var CdfMediaModule = (function () {
    function CdfMediaModule() {
    }
    CdfMediaModule_1 = CdfMediaModule;
    CdfMediaModule.forRoot = function (config) {
        return {
            ngModule: CdfMediaModule_1,
            providers: [
                services_1.ClientConfigService,
                {
                    provide: exports.CONFIG_DATA,
                    useValue: config
                },
                {
                    provide: services_1.ClientConfigService,
                    useFactory: configHelperFactory,
                    deps: [exports.CONFIG_DATA]
                }
            ]
        };
    };
    CdfMediaModule = CdfMediaModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [
                //COMPONENTS
                components_1.CdfImageComponent,
                components_1.CdfMediaComponent,
                components_1.CdfMediaSliderComponent,
                components_1.CdfVideoBackgroundComponent,
                components_1.CdfVideoYouTubeComponent
            ],
            exports: [
                //COMPONENTS
                components_1.CdfMediaComponent,
                components_1.CdfMediaSliderComponent,
                components_1.CdfVideoBackgroundComponent
            ],
            entryComponents: [
                //COMPONENTS
                components_1.CdfMediaComponent,
                components_1.CdfMediaSliderComponent,
                components_1.CdfVideoBackgroundComponent
            ],
            providers: []
        })
    ], CdfMediaModule);
    return CdfMediaModule;
    var CdfMediaModule_1;
}());
exports.CdfMediaModule = CdfMediaModule;
//# sourceMappingURL=cdf-media.module.js.map