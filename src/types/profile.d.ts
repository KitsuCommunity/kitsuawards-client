import type { Role } from './role';

interface User {
    user: KitsuUser | null;
    token: Token | null;
    allowYouTube: boolean;
    role: Role;
}
