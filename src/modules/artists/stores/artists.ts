import {
  IArtist,
  IUserTopArtistsRequest,
  TimeRangeEnum,
} from '@/modules/artists/services/artists.ts';
import { defineStore } from 'pinia';

export const useArtistsStore = defineStore('artistsStore', {
  state: () => ({
    topArtists: [] as IArtist[],
    userTopArtistsRequest: {
      time_range: TimeRangeEnum.SHORT_TERM,
      limit: 20,
      offset: 0,
    } as IUserTopArtistsRequest,
  }),
  actions: {
    setTopArtists(artists: IArtist[]): void {
      this.topArtists = artists;
    },
    setUserTopArtistsRequest(request: IUserTopArtistsRequest): void {
      this.userTopArtistsRequest = request;
    },
  },
});
