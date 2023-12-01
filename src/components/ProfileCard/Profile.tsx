import { Tag, Button } from 'common';
import { NavItem } from 'components';
import { globalUser } from 'signals';
import { signOut } from 'utils';

import { Role } from 'src/types/role';

import styles from './profile.module.css';

interface ProfileCardProps {
    className?: string;
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
    return (
        <>
            {globalUser.value.user ? (
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
                <NavItem className={styles.signIn} route="/signin" div>
                    Sign In
                </NavItem>
            )}
        </>
    );
};

export default ProfileCard;
