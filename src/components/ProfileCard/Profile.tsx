import NavItem from 'common/Navigation/NavItem';
import { Button } from 'components/Button';
import Tag from 'components/Tag';
import { Role } from 'src/types/role';
import styles from './profile.module.css';
import { globalUser, signOut } from 'src/App';

interface ProfileCardProps {
  className?: string;
  closeNav?: () => void;
}

export const ProfileCard = ({ className, closeNav }: ProfileCardProps) => {
  return (
    <>
      {!!globalUser.value.user ? (
        <div className={[styles.account, className].join(' ')}>
          <img
            src={
              globalUser.value.user.avatarImage?.views[0]?.url ??
              'https://kitsu.io/images/default_avatar-2ec3a4e2fc39a0de55bf42bf4822272a.png'
            }
          />
          <p>
            {globalUser.value.user.name}{' '}
            {globalUser.value.role !== Role.Regular ? (
              <Tag>{globalUser.value.role}</Tag>
            ) : (
              ''
            )}
          </p>
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
