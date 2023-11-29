import { globalUser } from 'signals/globalUser';

import { getCurrentUser } from './getCurrentUser';

export const setToken = async (token: Token) => {
  const currentUser = await getCurrentUser(token.access_token);

  localStorage.setItem('kitsu-token', JSON.stringify(token));

  globalUser.value = {
    ...globalUser.value,
    user: currentUser.data.currentAccount.profile,
    token,
  };
};
