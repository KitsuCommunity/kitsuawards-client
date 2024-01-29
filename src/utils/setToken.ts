import { globalUser } from 'signals/globalUser';

import { getCurrentUser } from './getCurrentUser';

export const setToken = async (token: Token) => {
    let currentUser;
    try {
        currentUser = await getCurrentUser(token.access_token);
    } catch {
        localStorage.removeItem('kitsu-token');
        return;
    }

    localStorage.setItem('kitsu-token', JSON.stringify(token));

    globalUser.value = {
        ...globalUser.value,
        user: currentUser?.data.currentAccount.profile ?? null,
        token,
    };
};
