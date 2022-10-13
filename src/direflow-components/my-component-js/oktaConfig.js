import {
    OktaAuth,
} from '@okta/okta-auth-js';

const main = (clientId, issuer, redirectUri) => {
    const config = {
        issuer,
        clientId,
        redirectUri,
        transformAuthState: async (oktaAuth, authState) => {
            if (!authState.isAuthenticated) {
                return authState;
            }
            // extra requirement: user must have valid Okta SSO session
            const user = await oktaAuth.token.getUserInfo();
            authState.isAuthenticated = !!user; // convert to boolean
            authState.users = user; // also store user object on authState
            return authState;
        },
        scopes:['openid', 'profile', 'email', 'address', 'phone', 'offline_access']
    };
    const authClient = new OktaAuth(config);
    authClient.tokenManager.on('expired', async function (key, expiredToken) {
        console.log('Token with key', key, ' has expired:');
        console.log(expiredToken);
      });
    authClient.tokenManager.on('renewed', function (key, newToken, oldToken) {
        console.log('Token with key', key, 'has been renewed');
        console.log('Old token:', oldToken);
        console.log('New token:', newToken);
    });
    return authClient
}

export default main