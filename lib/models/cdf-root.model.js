"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CdfRootModel = (function () {
    function CdfRootModel(id, type, title, description, body) {
        this.Guid = this.guid();
        this.Id = id;
        this.Type = type;
        this.Title = title;
        this.Description = description;
        this.Body = body;
    }
    CdfRootModel.prototype.OnClick = function () {
        var message = 'OnClick METHOD MUST BE IMPLEMENTED BY CHILD COMPONENT TO CdfMediaModel';
        console.log('ERROR:', message);
    };
    ;
    CdfRootModel.prototype.guid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
    return CdfRootModel;
}());
exports.CdfRootModel = CdfRootModel;
//# sourceMappingURL=cdf-root.model.js.map