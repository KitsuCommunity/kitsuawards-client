import { NavLink } from 'react-router-dom';

import { closeNav } from 'signals';

import styles from './navigation.module.css';

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
