interface IArtistFollowers {
  href: string | null;
  total: number;
}

interface IArtistImage {
  url: string;
  height: number;
  width: number;
}

export interface IArtist {
  externalUrls: object;
  followers: IArtistFollowers;
  genres: string[];
  href: string;
  id: string;
  images: IArtistImage[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export class ArtistsService {}

export default new ArtistsService();
