import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navigation.module.css';

interface NavItemProps {
  route: string;
  children: string;
}

export const NavItem = ({ route, children }: NavItemProps) => {
  return (
    <li className={styles.navigationItem}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : '')}
        to={route}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default NavItem;
