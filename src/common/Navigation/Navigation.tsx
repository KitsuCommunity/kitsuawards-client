import { Link } from 'react-router-dom';
import NavItem from './NavItem';
import styles from './navigation.module.css';
import { Brand } from 'components/Brand';
import { CategoryFragment } from 'src/graphql/categories.generated';
import { Category } from 'src/generated/graphql';

interface NavigationProps {
  categories?: CategoryFragment[];
  open: boolean;
  close: () => void;
}

export const Navigation = ({ categories, open, close }: NavigationProps) => {
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
            <NavItem route={`/category/${url}`} key={url} closeNav={close}>
              {name}
            </NavItem>
          ))}
        </ul>
      </nav>
      <div className={styles.account}>
        <img src="https://media.kitsu.io/users/avatars/171606/large.jpeg" />
        <span>Username</span>
        <button>Sign out</button>
      </div>
      <footer>
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
