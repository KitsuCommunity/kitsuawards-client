import { useSignalEffect } from '@preact/signals';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router';

import { hamburgerIcon } from 'assets';
import { Loading } from 'common';
import { Navigation } from 'components';
import { Category, Home, NotFound, SignIn } from 'pages';
import { navOpen } from 'signals';
import { allowYouTube, getLocalStorage, setAdminRole, setToken } from 'utils';

import { globalUser } from 'signals/globalUser';
import { Role } from 'types/role';

import styles from './app.module.css';
import { useCategoriesQuery } from './graphql/categories.generated';

function App() {
  const [{ data }, refetchCategories] = useCategoriesQuery();

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
          <img src={hamburgerIcon} />
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
