import { globalUser } from 'signals/globalUser';
import { Role } from 'types/role';

export const setAdminRole = () => {
    if (
        globalUser.value.user?.id === '171606' ||
        globalUser.value.user?.id === '171273' ||
        globalUser.value.user?.id === '195642'
    ) {
        globalUser.value = { ...globalUser.value, role: Role.Admin };
    }
};
