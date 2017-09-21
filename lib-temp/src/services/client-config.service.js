var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
var ClientConfigService = (function () {
    function ClientConfigService() {
    }
    ClientConfigService_1 = ClientConfigService;
    //GET JW PLAYER KEY
    ClientConfigService.GetJwPlayerKey = function () {
        return ClientConfigService_1.ConfigModel.JwPlayerKey;
    };
    ;
    ClientConfigService = ClientConfigService_1 = __decorate([
        Injectable()
    ], ClientConfigService);
    return ClientConfigService;
    var ClientConfigService_1;
}());
export { ClientConfigService };
//# sourceMappingURL=client-config.service.js.map