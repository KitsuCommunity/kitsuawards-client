import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navigation.module.css';

interface NavItemProps {
  route: string;
  children: string;
  closeNav?: () => void;
  className?: string;
  div?: boolean;
}

export const NavItem = ({
  route,
  children,
  closeNav,
  className,
  div = false,
}: NavItemProps) => {
  if (div) {
    return (
      <div className={[styles.navigationItem, className].join(' ')}>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : '')}
          to={route}
          onClick={(e) => {
            closeNav && closeNav();
          }}
        >
          {children}
        </NavLink>
      </div>
    );
  }
  return (
    <li className={[styles.navigationItem, className].join(' ')}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : '')}
        to={route}
        onClick={(e) => {
          closeNav && closeNav();
        }}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default NavItem;
