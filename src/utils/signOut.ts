import { globalUser } from 'signals/globalUser';
import { Role } from 'types/role';

export const signOut = () => {
  localStorage.removeItem('kitsu-token');
  globalUser.value = {
    ...globalUser.value,
    user: null,
    token: null,
    role: Role.Regular,
  };
};
