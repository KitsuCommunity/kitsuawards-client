import { useEffect, useState } from 'react';
import { signal, useSignalEffect } from '@preact/signals';
import { Route, Routes } from 'react-router';
import { Navigation } from 'common/Navigation';
import Home from './pages/Home';
import styles from './app.module.css';
import NotFound from './pages/NotFound';
import { useCategoriesQuery } from './graphql/categories.generated';
import Category from './pages/Category';
import { Loading } from 'common/Loading';
import icon from 'assets/hamburger_icon.svg';
import SignIn from './pages/SignIn';
import getCurrentUser from 'helpers/getUser';
import getLocalStorage from 'helpers/getLocalStorage';
import { Role } from './types/role';
import { User } from './types/profile';

const profile: User = {
  user: null,
  token: null,
  allowYouTube: false,
  role: Role.Regular,
};

export const globalUser = signal<User>(profile);

export const signOut = () => {
  localStorage.removeItem('kitsu-token');
  globalUser.value = {
    ...globalUser.value,
    user: null,
    token: null,
    role: Role.Regular,
  };
};

export const allowYouTube = () => {
  localStorage.setItem('allowYouTube', 'true');
  globalUser.value = {
    ...globalUser.value,
    allowYouTube: true,
  };
};

const setAdminRole = () => {
  if (
    globalUser.value.user?.id === '171606' ||
    globalUser.value.user?.id === '171273' ||
    globalUser.value.user?.id === '195642'
  ) {
    globalUser.value = { ...globalUser.value, role: Role.Admin };
  }
};

export const setToken = async (token: Token) => {
  const currentUser = await getCurrentUser(token.access_token);

  localStorage.setItem('kitsu-token', JSON.stringify(token));

  globalUser.value = {
    ...globalUser.value,
    user: currentUser.data.currentAccount.profile,
    token,
  };
};

export const navOpen = signal(false);
export const closeNav = () => (navOpen.value = false);

function App() {
  const [{ data, fetching, error }, refetchCategories] = useCategoriesQuery();

  useEffect(() => {
    const storedToken = getLocalStorage<Token>('kitsu-token');
    const storedAllowYouTube = getLocalStorage<boolean>('allowYouTube');

    if (storedAllowYouTube) allowYouTube();
    if (storedToken) setToken(storedToken);
  }, []);

  useSignalEffect(() => {
    if (!globalUser.value.token?.access_token) return;

    refetchCategories({
      variables: {
        token: globalUser.value.token.access_token,
        signedIn: true,
      },
    });
  });

  useSignalEffect(() => {
    if (globalUser.value.role === Role.Regular) setAdminRole();
  });

  if (data?.year[0]) {
    const currentYear = data.year[0];

    return (
      <div
        className={[styles.app, navOpen.value ? styles.navVisible : null].join(
          ' ',
        )}
      >
        <Navigation categories={data?.year[0].categories} />
        <button
          className={styles.navToggle}
          onClick={() => (navOpen.value = !navOpen.value)}
        >
          <img src={icon} />
        </button>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                description={currentYear.description}
                start={currentYear.start}
                end={currentYear.end}
              />
            }
          />
          <Route path="/signin" element={<SignIn />} />
          {currentYear.categories.map((category) => (
            <Route
              path={`/category/${category.url}`}
              element={<Category category={category} key={category.url} />}
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );
  }

  return <Loading fullscreen />;
}

export default App;
