import NavItem from 'common/Navigation/NavItem';
import { Button } from 'components/Button';
import { useContext } from 'react';
import { UserContext } from 'src/App';
import { Role } from 'src/types/role';
import styles from './profile.module.css';

interface ProfileCardProps {
  className?: string;
  closeNav?: () => void;
}

export const ProfileCard = ({ className, closeNav }: ProfileCardProps) => {
  const [user, _, signOut] = useContext(UserContext);

  return (
    <>
      {!!user.user ? (
        <div className={[styles.account, className].join(' ')}>
          <img src={user.user.avatarImage?.views[0]?.url ?? 'https://kitsu.io/images/default_avatar-2ec3a4e2fc39a0de55bf42bf4822272a.png'} />
          <span>
            {user.user.name}{' '}
            {user.role !== Role.Regular ? `-- ${user.role}` : ''}
          </span>
          <Button
            className={styles.signOut}
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign out
          </Button>
        </div>
      ) : (
        <NavItem
          className={styles.signIn}
          route="/signin"
          closeNav={closeNav}
          div
        >
          Sign In
        </NavItem>
      )}
    </>
  );
};

export default ProfileCard;
