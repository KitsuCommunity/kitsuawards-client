import { Button } from 'components/Button';
import { useContext } from 'react';
import { UserContext } from 'src/App';
import styles from './profile.module.css';

interface ProfileCardProps {
  className?: string;
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
  const [user, _, signOut] = useContext(UserContext);

  return (
    <>
      {!!user.user ? (
        <div className={[styles.account, className].join(' ')}>
          <img src={user.user.avatarImage.views[0].url} />
          <span>{user.user.name}</span>
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
        <Button className={styles.signIn} type="link" to="/signin">
          Sign In
        </Button>
      )}
    </>
  );
};

export default ProfileCard;
