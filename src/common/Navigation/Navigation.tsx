import { Link } from 'react-router-dom';
import NavItem from './NavItem';
import styles from './navigation.module.css';
import { Brand } from 'components/Brand';
import { CategoryFragment } from 'src/graphql/categories.generated';
import { Category } from 'src/generated/graphql';

interface NavigationProps {
  categories?: CategoryFragment[];
}

export const Navigation = ({ categories }: NavigationProps) => {
  return (
    <aside className={styles.navigationSidebar}>
      <Brand />
      <nav>
        <ul>
          <NavItem route="/">Home</NavItem>
          {categories?.map(({ name, url }) => (
            <NavItem route={`/category/${url}`} key={url}>
              {name}
            </NavItem>
          ))}
        </ul>
      </nav>
      <footer>Made with ❤️ by Reina and Gakamine</footer>
    </aside>
  );
};

export default Navigation;
