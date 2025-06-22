import { AccessTokenDTO } from '@/modules/user/services/auth/types.ts';
import { DateTime } from 'luxon';

export function isTokenExpired(accessTokenDTO: AccessTokenDTO): boolean {
  const expiresDateTime: DateTime = DateTime.fromISO(
    accessTokenDTO.created_at
  ).plus({
    second: accessTokenDTO.expires_in,
  });

  return expiresDateTime.diffNow('seconds').seconds <= 0;
}
