import { useSignal } from '@preact/signals';

import { Button } from 'common';
import { ProfileCard, Brand } from 'components';
import { navOpen, globalUser } from 'signals';

import type { CategoryFragment } from 'src/graphql/categories.generated';
import { Role } from 'types/role';

import { NavItem } from './NavItem';
import styles from './navigation.module.css';

interface NavigationProps {
  categories?: CategoryFragment[];
}

export const Navigation = ({ categories }: NavigationProps) => {
  const showResults = useSignal(false);

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
              route={`${showResults.value ? '/results' : ''}/category/${url}`}
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
              showResults.value = !showResults.value;
            }}
          >
            {showResults.value ? 'Navigate Voting' : 'Navigate Results'}
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
