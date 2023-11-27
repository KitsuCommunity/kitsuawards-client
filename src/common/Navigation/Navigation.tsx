import { Link } from 'react-router-dom';
import NavItem from './NavItem';
import styles from './navigation.module.css';
import { Brand } from 'components/Brand';
import { CategoryFragment } from 'src/graphql/categories.generated';
import { Category } from 'generated/graphql';
import { useContext, useState } from 'react';
import { globalUser, navOpen } from 'src/App';
import { Button } from 'components/Button';
import ProfileCard from 'components/ProfileCard';
import { Role } from 'types/role';

interface NavigationProps {
  categories?: CategoryFragment[];
}

export const Navigation = ({ categories }: NavigationProps) => {
  const [showResults, setShowResults] = useState(false);

  return (
    <aside
      className={[
        styles.navigationSidebar,
        navOpen.value ? styles.navVisible : null,
      ].join(' ')}
    >
      <Brand />
      <nav>
        <ul>
          <NavItem key="home" route="/">
            Home
          </NavItem>
          {categories?.map(({ name, url }) => (
            <NavItem
              route={`${showResults ? '/results' : ''}/category/${url}`}
              key={url}
            >
              {name}
            </NavItem>
          ))}
        </ul>
      </nav>
      <ProfileCard />
      <footer>
        {globalUser.value.role === Role.Admin && (
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
