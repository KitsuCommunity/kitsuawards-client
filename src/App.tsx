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

function App() {
  const [{ data, fetching, error }] = useCategoriesQuery();

  console.log(data);

  if (fetching) return <Loading fullscreen />;

  return (
    <div className={styles.app}>
      <Navigation categories={data?.year[0].categories} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="judges" element={<Judges />} />
        {data?.year[0].categories.map((category) => (
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

export default App;
