import { CdfRootModel } from './cdf-root.model';
import { CdfVideoModel } from './cdf-video.model';
export declare class CdfMediaModel extends CdfRootModel {
    ImageUri: string;
    ImageHomeUri: string;
    YouTubeId: string;
    VideoList: CdfVideoModel[];
    HasImage: boolean;
    HasVideo: boolean;
    constructor(id?: string, type?: string, title?: string, description?: string, imageUrl?: string, youTubeId?: string, videoList?: CdfVideoModel[], body?: string, imageHomeUrl?: string);
    SetImage(uri: string): void;
    SetHomeImage(uri: string): void;
    SetYouTubeId(youTubeId: string): void;
}
