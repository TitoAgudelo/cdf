"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var models_1 = require("../models");
var YouTubeService = (function () {
    function YouTubeService() {
    }
    //GET JW PLAYER KEY
    YouTubeService.CreateMediaModelFromYouTubeJson = function (rawJson) {
        var id = undefined;
        var type = undefined;
        var title = undefined;
        var description = undefined;
        var imageUri = undefined;
        var youTubeId = undefined;
        var videoList = undefined;
        if (rawJson) {
            //SET YOUTUBE ID			
            if (rawJson.id && rawJson.id.videoId) {
                youTubeId = rawJson.id.videoId;
            }
            if (rawJson.snippet) {
                //Title
                if (rawJson.snippet.title) {
                    title = rawJson.snippet.title;
                }
                //POSTER IMAGE
                if (rawJson.snippet.thumbnails && rawJson.snippet.thumbnails.high && rawJson.snippet.thumbnails.high.url) {
                    imageUri = rawJson.snippet.thumbnails.high.url;
                }
                else if (rawJson.snippet.thumbnails && rawJson.snippet.thumbnails.medium && rawJson.snippet.thumbnails.medium.url) {
                    imageUri = rawJson.snippet.thumbnails.medium.url;
                }
                else if (rawJson.snippet.thumbnails && rawJson.snippet.thumbnails.default && rawJson.snippet.thumbnails.default.url) {
                    imageUri = rawJson.snippet.thumbnails.default.url;
                }
            }
        }
        return new models_1.CdfMediaModel(id, type, title, description, imageUri, youTubeId, videoList);
    };
    ;
    YouTubeService = __decorate([
        core_1.Injectable()
    ], YouTubeService);
    return YouTubeService;
}());
exports.YouTubeService = YouTubeService;
//# sourceMappingURL=you-tube.service.js.map