import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navigation.module.css';
import { closeNav } from 'src/App';

interface NavItemProps {
  route: string;
  children: string;
  className?: string;
  div?: boolean;
}

export const NavItem = ({
  route,
  children,
  className,
  div = false,
}: NavItemProps) => {
  if (div) {
    return (
      <div className={[styles.navigationItem, className].join(' ')}>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : '')}
          to={route}
          onClick={() => {
            closeNav();
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
        onClick={() => {
          closeNav();
        }}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default NavItem;
