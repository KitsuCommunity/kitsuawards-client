import { useState } from 'react';
import { Route, Routes } from 'react-router';
import { Judges } from 'components/Judges';
import { Navigation } from 'common/Navigation';
import Home from './pages/Home';
import styles from './app.module.css';
import NotFound from './pages/NotFound';
import { useCategoriesQuery } from './graphql/categories.generated';
import Category from './pages/Category';
import { Loading } from 'common/Loading';
import icon from 'assets/hamburger_icon.svg';
import SignIn from './pages/SignIn';

function App() {
  const [{ data, fetching, error }] = useCategoriesQuery();
  const [navOpen, setNavOpen] = useState(false);

  const closeNav = () => {
    setNavOpen(false);
  };

  if (data)
    return (
      <div
        className={[styles.app, navOpen ? styles.navVisible : null].join(' ')}
      >
        <Navigation
          categories={data?.year[0].categories}
          open={navOpen}
          close={closeNav}
        />
        <button
          className={styles.navToggle}
          onClick={() => setNavOpen((c) => !c)}
        >
          <img src={icon} />
        </button>
        <Routes>
          <Route
            path="/"
            element={<Home description={data.year[0].description} />}
          />
          <Route path="/signin" element={<SignIn />} />
          {data.year[0].categories.map((category) => (
            <Route
              path={`/category/${category.url}`}
              element={<Category category={category} key={category.url} />}
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );

  return <Loading fullscreen />;
}

export default App;
