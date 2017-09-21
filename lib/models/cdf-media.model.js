"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var cdf_root_model_1 = require("./cdf-root.model");
var CdfMediaModel = (function (_super) {
    __extends(CdfMediaModel, _super);
    function CdfMediaModel(id, type, title, description, imageUrl, youTubeId, videoList, body, imageHomeUrl) {
        var _this = _super.call(this, id, type, title, description, body) || this;
        _this.VideoList = [];
        _this.HasImage = false;
        _this.HasVideo = false;
        if (imageUrl) {
            _this.ImageUri = imageUrl;
            _this.HasImage = true;
        }
        if (imageHomeUrl) {
            _this.ImageHomeUri = imageHomeUrl;
            _this.HasImage = true;
        }
        if (youTubeId) {
            _this.YouTubeId = youTubeId;
            _this.HasVideo = true;
        }
        if (videoList) {
            _this.VideoList = videoList;
            _this.HasVideo = true;
        }
        return _this;
    }
    CdfMediaModel.prototype.SetImage = function (uri) {
        this.ImageUri = uri;
        this.HasImage = true;
    };
    ;
    CdfMediaModel.prototype.SetHomeImage = function (uri) {
        this.ImageHomeUri = uri;
        this.HasImage = true;
    };
    ;
    CdfMediaModel.prototype.SetYouTubeId = function (youTubeId) {
        this.YouTubeId = youTubeId;
        this.HasVideo = true;
    };
    ;
    return CdfMediaModel;
}(cdf_root_model_1.CdfRootModel));
exports.CdfMediaModel = CdfMediaModel;
//# sourceMappingURL=cdf-media.model.js.map