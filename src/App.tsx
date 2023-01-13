import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
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
import useGetUser from 'hooks/useGetUser';
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

export const UserContext = createContext<
  [
    user: User,
    setToken: (token: Token) => Promise<void>,
    signOut: () => void,
    allowYouTube: () => void,
  ]
>([profile, async (token: Token) => {}, () => {}, () => {}]);

function App() {
  const [{ data, fetching, error }, refetchCategories] = useCategoriesQuery();
  const [navOpen, setNavOpen] = useState(false);
  const [user, setUser] = useState<User>(profile);

  const closeNav = () => {
    setNavOpen(false);
  };

  const setToken = async (token: Token) => {
    const currentUser = await getCurrentUser(token.access_token);

    setUser((existing) => ({
      ...existing,
      user: currentUser.data.currentAccount.profile,
      token,
    }));
    refetchCategories({
      variables: {
        token: token.access_token,
        signedIn: true,
      },
    });
  };

  const signOut = () => {
    setUser((exsisting) => ({
      ...exsisting,
      user: null,
      token: null,
    }));
    localStorage.removeItem('kitsu-token');
  };

  const allowYouTube = () => {
    localStorage.setItem('allowYouTube', 'true');
    setUser((exsisting) => ({
      ...exsisting,
      allowYouTube: true,
    }));
  };

  const setAdminRole = (user: User) => {
    console.log('checking admin role');
    console.log(user);
    if (
      user.user?.id === '171606' ||
      user.user?.id === '171273' ||
      user.user?.id === '195642'
    ) {
      console.log('Setting admin role');
      setUser((existing) => ({ ...existing, role: Role.Admin }));
    }
  };

  useEffect(() => {
    const token = getLocalStorage<Token>('kitsu-token');
    const allowYouTubeBool = getLocalStorage<boolean>('allowYouTube');

    if (allowYouTubeBool) allowYouTube();

    if (token) setToken(token);
  }, []);

  useEffect(() => {
    if (user.role === Role.Regular) setAdminRole(user);
  }, [user]);

  if (data?.year[0]) {
    const currentYear = data.year[0];

    return (
      <div
        className={[styles.app, navOpen ? styles.navVisible : null].join(' ')}
      >
        <UserContext.Provider value={[user, setToken, signOut, allowYouTube]}>
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
        </UserContext.Provider>
      </div>
    );
  }

  return <Loading fullscreen />;
}

export default App;
