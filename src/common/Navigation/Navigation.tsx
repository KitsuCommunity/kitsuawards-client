import { Link } from 'react-router-dom';
import NavItem from './NavItem';
import styles from './navigation.module.css';
import { Brand } from 'components/Brand';
import { CategoryFragment } from 'src/graphql/categories.generated';
import { Category } from 'src/generated/graphql';
import { useContext, useState } from 'react';
import { UserContext } from 'src/App';
import { Button } from 'components/Button';
import ProfileCard from 'components/ProfileCard';
import { Role } from 'src/types/role';

interface NavigationProps {
  categories?: CategoryFragment[];
  open: boolean;
  close: () => void;
}

export const Navigation = ({ categories, open, close }: NavigationProps) => {
  const [user, _, signOut] = useContext(UserContext);
  const [showResults, setShowResults] = useState(false);

  return (
    <aside
      className={[
        styles.navigationSidebar,
        open ? styles.navVisible : null,
      ].join(' ')}
    >
      <Brand />
      <nav>
        <ul>
          <NavItem key="home" route="/" closeNav={close}>
            Home
          </NavItem>
          {categories?.map(({ name, url }) => (
            <NavItem
              route={`${showResults ? '/results' : ''}/category/${url}`}
              key={url}
              closeNav={close}
            >
              {name}
            </NavItem>
          ))}
        </ul>
      </nav>
      <ProfileCard closeNav={close} />
      <footer>
        {user.role === Role.Admin && (
          <Button
            onClick={() => {
              setShowResults((value) => !value);
            }}
          >
            {showResults ? 'Navigate Voting' : 'Navigate Results'}
          </Button>
        )}
        <p>Made with ❤️ by Reina and Gakamine</p>
        <p>
          Source code available on{' '}
          <a
            href="https://github.com/Gakamine/kitsuawards-client"
            rel="noreferrer noopener"
            target="_blank"
          >
            GitHub
          </a>
        </p>
      </footer>
      <div className={styles.bottomPadding} />
    </aside>
  );
};

export default Navigation;
