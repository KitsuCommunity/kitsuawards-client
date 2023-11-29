import { signal } from '@preact/signals';

import type { User } from 'types/profile';
import { Role } from 'types/role';

const profile: User = {
  user: null,
  token: null,
  allowYouTube: false,
  role: Role.Regular,
};

export const globalUser = signal<User>(profile);
