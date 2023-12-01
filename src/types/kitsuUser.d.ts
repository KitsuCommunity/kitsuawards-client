interface KitsuUser {
    avatarImage: {
        blurhash: string;
        views: {
            name: string;
            url: string;
        }[];
    };
    name: string;
    id: string;
}

interface KitsuUserRes {
    data: { findProfileById: KitsuUser };
}

interface CurrentAccountRes {
    data: { currentAccount: { profile: KitsuUser } };
}
