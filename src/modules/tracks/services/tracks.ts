export interface IImage {
  url: string;
  height: number;
  width: number;
}

export interface IExternalUrls {
  spotify: string;
}

export interface IArtist {
  externalUrls: IExternalUrls;
  href: string;
  id: string;
  name: string;
  type: 'artist';
  uri: string;
}

export interface IAlbum {
  albumType: 'single' | 'album' | 'compilation';
  totalTracks: number;
  availableMarkets: string[];
  externalUrls: IExternalUrls;
  href: string;
  id: string;
  images: IImage[];
  name: string;
  releaseDate: string;
  releaseDatePrecision: 'day' | 'month' | 'year';
  type: 'album';
  uri: string;
  artists: IArtist[];
}

export interface IExternalIds {
  isrc?: string;
  ean?: string;
  upc?: string;
}

export interface ITrack {
  album: IAlbum;
  artists: IArtist[];
  availableMarkets: string[];
  discNumber: number;
  duration_ms: number;
  explicit: boolean;
  externalIds: IExternalIds;
  externalUrls: IExternalUrls;
  href: string;
  id: string;
  name: string;
  popularity: number;
  previewUrl: string | null;
  trackNumber: number;
  type: 'track';
  uri: string;
  isLocal: boolean;
  isPlaying: boolean;
}

export class TracksService {}

export default new TracksService();
