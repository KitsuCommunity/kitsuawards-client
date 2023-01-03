import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navigation.module.css';

interface NavItemProps {
  route: string;
  children: string;
  closeNav: () => void;
}

export const NavItem = ({ route, children, closeNav }: NavItemProps) => {
  return (
    <li className={styles.navigationItem}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : '')}
        to={route}
        onClick={(e) => {
          closeNav();
        }}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default NavItem;
