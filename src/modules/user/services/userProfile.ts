import http from '@/app/services/http.ts';
import { useUserStore } from '@/modules/user/stores/user.ts';
import { toCamelCase } from '@/utils/objects.ts';

interface IUserProfileFollowers {
  href: string;
  total: number;
}

interface IUserProfileImage {
  url: string;
  height: number;
  width: number;
}

export interface IUserProfile {
  country: string;
  displayName: string;
  email: string;
  explicitContent: object;
  externalUrls: object;
  followers: IUserProfileFollowers;
  href: string;
  id: string;
  images: IUserProfileImage[];
  product: string;
  type: string;
  uri: string;
}

export class UserProfileService {
  public async me(): Promise<IUserProfile | null> {
    const userStorage = useUserStore();

    if (!userStorage.isLoggedIn) {
      return null;
    }

    const response = await http.get<IUserProfile>('/me');

    if (response.status !== 200) {
      return null;
    }

    const userProfile: IUserProfile = toCamelCase(response.data);

    userStorage.setUserProfile(userProfile);

    return userProfile;
  }

  public async init(): Promise<void> {
    await this.me();
  }
}

export default new UserProfileService();
