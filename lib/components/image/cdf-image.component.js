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
var CdfImageComponent = (function () {
    function CdfImageComponent() {
    }
    CdfImageComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", index_1.CdfMediaModel)
    ], CdfImageComponent.prototype, "imageModel", void 0);
    CdfImageComponent = __decorate([
        core_1.Component({
            selector: 'cdf-image',
            template: "\n\t<section *ngIf=\"(imageModel)\" \n\t\tclass=\"cdf-background-image\" \n\t\t[ngStyle]=\"{'background-image': 'url(' + imageModel.ImageUri + ')'}\">\t\t\n\t</section>\n\t<ng-content></ng-content>",
            styles: ["\n\t:host \n\t{\n\t\tmargin: auto;\n\t\twidth: 100%;\n\t}\n\t\t\n\t.cdf-background-image\n\t{\n\t\tbackground-repeat:no-repeat;\n\t\tbackground-size: cover;\n\t\tbackground-position:center center;\t\n\t\theight: 100%;\n\t\ttransition: all 0.3s ease 0s;\n\t\twidth:100%;\n\t}"]
        }),
        __metadata("design:paramtypes", [])
    ], CdfImageComponent);
    return CdfImageComponent;
}());
exports.CdfImageComponent = CdfImageComponent;
//# sourceMappingURL=cdf-image.component.js.map