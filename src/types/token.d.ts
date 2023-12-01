interface Token {
    access_token: string; // Token used in Authorization header
    created_at: number;
    expires_in: number; // Seconds until the access_token expires (30 days default)
    refresh_token: string; // Token used to get a new access_token
    scope: 'public';
    token_type: 'bearer';
}
