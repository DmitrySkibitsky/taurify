import http from '@/app/services/http.ts';
import { useArtistsStore } from '@/modules/artists/stores/artists.ts';
import { AxiosResponse } from 'axios';

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

export enum TimeRangeEnum {
  SHORT_TERM = 'short_term',
  MEDIUM_TERM = 'medium_term',
  LONG_TERM = 'long_term',
}

export interface ITimeRange {
  enum: TimeRangeEnum;
  name: string;
}

export const TIME_RANGES: ITimeRange[] = [
  {
    enum: TimeRangeEnum.SHORT_TERM,
    name: '1 Month',
  },
  {
    enum: TimeRangeEnum.MEDIUM_TERM,
    name: '6 Months',
  },
  {
    enum: TimeRangeEnum.LONG_TERM,
    name: 'All Time',
  },
];

export interface IUserTopArtistsRequest {
  time_range: TimeRangeEnum;
  limit: number;
  offset: number;
}

export class ArtistsService {
  public getTimeRanges(): ITimeRange[] {
    return TIME_RANGES;
  }
  public getTimeRangeByEnum(enumValue: TimeRangeEnum): ITimeRange {
    return TIME_RANGES.find((item: ITimeRange) => {
      return item.enum === enumValue;
    })!;
  }

  public async getUserTopArtists(
    request: IUserTopArtistsRequest = {
      time_range: TimeRangeEnum.SHORT_TERM,
      limit: 20,
      offset: 0,
    }
  ): Promise<IArtist[]> {
    const response: AxiosResponse = await http.get<IArtist[]>(
      '/me/top/artists',
      {
        params: request,
      }
    );

    if (response.status !== 200) {
      return [];
    }

    const artists: IArtist[] = response.data?.items ?? [];

    const artistsStore = useArtistsStore();

    artistsStore.setTopArtists(artists);
    artistsStore.setUserTopArtistsRequest(request);

    return artists;
  }
}

export default new ArtistsService();
