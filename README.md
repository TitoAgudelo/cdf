# CDF Media UI Module (@titoagudelo/cdf-ng-media)
[![version][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]

> CDF-NG-MEDIA is an Angular module containing UI components for displaying different forms of media (images and/or video).  This module simplifies the displaying of media assets.  CDF-NG-MEDIA is a UI module existing in [Content Delivery Framework's][cdf-url] eco-system.

> Happy Coding!

![](logo-535x141.png)

# Requirements
CDF-NG-MEDIA requires the latest version of Angular (at the time of this writing: 2.4.7).
```sh
  //package.json

  "dependencies": {
    "@angular/common": "2.4.7",
    "@angular/compiler": "2.4.7",
    "@angular/core": "2.4.7",
    "@angular/forms": "2.4.7",
    "@angular/http": "2.4.7",
    "@angular/platform-browser": "2.4.7",
    "@angular/platform-browser-dynamic": "2.4.7",
    "@angular/router": "3.4.7"
	...
  }
```

CDF-NG-MEDIA also utilizes the following 3rd party sources:

* [JW Player][jwplayer-url] as the vehicle for loading videos.  CDF-NG-MEDIA is currently using:
  * JW Player version 7.6.1


# Installation
CDF-NG-MEDIA requires a JW Player key in order for JW Player to work correctly.  You will need to create an account and establish a JW Player key.  You will provide the JW Player Key during configuration.  See [JW Player][jwplayer-url] for creating an account.

## Installing CDF-NG-MEDIA in your Angular application:
```sh
    //STEP 1: INSTALL CDF-NG-MEDIA

    npm install @titoagudelo/cdf-ng-media --save

...................................................

    //STEP 2: create a config file (cdf-media-config.ts) to provide configuration settings:

    import { ConfigInterface } from '@titoagudelo/cdf-ng-media/lib';

    export const CdfMediaConfig: ConfigInterface =
      {
        JwPlayerKey: 'YOUR JW PLAYER KEY'
      };

...................................................
  //STEP 3: configure your AppModule:

    // app.module.ts
    import { CdfModule } from '@titoagudelo/cdf-ng/lib';
    import { CdfMediaConfig } from './configs';

    @NgModule({
      declarations: [ ... ],
      imports: [
        ...
        //3rd PARTY
        CdfMediaModule.forRoot(CdfMediaConfig),
      ],
      providers: [ ... ],
      bootstrap: [ ... ]
    })
    export class AppModule { }

```


# CDF-NG-MEDIA Models
CDF-NG-MEDIA containes the following models needed to show media asset(s):
* CdfMediaModel
* CdfVideoModel

## *CdfMediaModel*
CdfMediaModel is the model that contains data about the media asset (image and/or video).  CdfMediaModel contains the following data points:

```sh
	Id: string;
	Type: string;
	Title: string;
	Description: string;
	ImageUri: string;
	YouTubeId: string;
	VideoList: CdfVideoModel[] = [];
	HasImage: boolean = false;
	HasVideo: boolean = false;
```
  * Type can be used to apply a label ontop of the media asset (perfect for a collection of media assets of different types)
  * ImageUri is the complete http URL to an image
  * YouTubeId is the unique value representing a YouTube video (ex. 8geR0yacozY)
  * VideoList is an optional collection of URIs to different videos.  This is a placeholder for future functionality

## *CdfVideoModel*
CdfVideoModel is a placeholder data model for future development.



# CDF-NG-MEDIA Components
CDF-NG-MEDIA containes the following components you can use:
* CdfMediaComponent
* CdfMediaSliderComponent
* CdfVideoBackgroundComponent


## **CdfMediaComponent**
**CdfMediaComponent** is the base component used to display either an image or a video.  CdfMediaComponent consumes CdfMediaModel which contains all the data necessary to determine if the media asset is a video or an image.


## **CdfMediaSliderComponent**
**CdfMediaSliderComponent** is a component handling a collection of CdfMediaModels (mix of images and/or videos).   CdfMediaSliderComponent arranges the media in a grid.  If one of the items is a video, then playing the video will cause an information pane to slide out showing media's title, type, description and a button to click.  You can toggle on/off title, type, and description.

![][cdf-ng-media-slider-url]
![][cdf-ng-media-slider-video-url]

```sh
<cdf-media-slider [mediaModelList]="mediaModelList"
    [showType]="showType"
    [showTitle]="showTitle"
    [showDescription]="showDescription"
    (onImageClick)="doMediaClick($event)"></cdf-media-slider>
```


## CdfVideoBackgroundComponent
**CdfVideoBackgroundComponent** uses JW Player's capability to run a video contained in CdfMediaModel in the background.





# Helpful Links
* [Angular](https://angular.io/)
* [JW Player][jwplayer-url]
* [Solutia Consulting](http://solutiaconsulting.com)


## Release History

* 1.2.0
  * made cdf-media-slider self-contained
* 1.1.3
  * removed configuration requirement passing in image source URL
* < 1.0.65
  * Rounds and rounds of trial and error...

# Meta

Tom Schreck – [@tschreck](https://twitter.com/tschreck) – tom_schreck@solutiaconsulting.com

[https://github.com/tomschreck](https://github.com/tomschreck)

# License

[MIT](https://opensource.org/licenses/MIT)

[npm-image]: https://img.shields.io/npm/v/@cdf/cdf-ng-media.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@cdf/cdf-ng-media
[downloads-image]: https://img.shields.io/npm/dm/@cdf/cdf-ng-media.svg?style=flat-square
[downloads-url]: https://npm-stat.com/charts.html?package=%40cdf%2Fcdf-ng-media&from=2017-03-01
[license-image]: https://img.shields.io/npm/l/@cdf/cdf-ng-media.svg?style=flat-square
[license-url]: http://opensource.org/licenses/MIT
[jwplayer-url]:https://www.jwplayer.com/
[cdf-url]:http://cdf.cloud/

[cdf-ng-media-slider-url]:http://admin.cdf.cloud/domain-images/cdf-media-slider-grid.png
[cdf-ng-media-slider-video-url]:http://admin.cdf.cloud/domain-images/cdf-media-slider-grid-video.png