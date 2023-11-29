import { globalUser } from 'signals/globalUser';

export const allowYouTube = () => {
  localStorage.setItem('allowYouTube', 'true');
  globalUser.value = {
    ...globalUser.value,
    allowYouTube: true,
  };
};
