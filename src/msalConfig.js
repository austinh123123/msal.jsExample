
const tenantName = "testadb2c123179";
const defaultUserFlow = "B2C_1_testUserFlow";

const msalConfig = {
    auth: {
        /**
         * We create an app registration in Azure AD for SPA 
         * and get the client id from the app registration.
         * Make sure to add http://localhost:8080 as a redirect URI
         */
        clientId: "f36c8d39-8126-4051-a166-02f75007689f",
        authority: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${defaultUserFlow}`,
        redirectUri: "http://localhost:8080", // make sure redirect uri is added in the app registration
        knownAuthorities: [`${tenantName}.b2clogin.com`],
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true,
    },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
const loginRequest = {
    scopes: ["openid", "profile"]
};

// Add here the endpoints for MS Graph API services you would like to use.
const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};

// Add here scopes for access token to be used at MS Graph API endpoints.
const tokenRequest = {
    scopes: ["openid", "profile"],
    forceRefresh: false // Set this to "true" to skip a cached token and go to the server to get a new token
};

const silentRequest = {
    scopes: ["openid", "profile"]
};

const logoutRequest = {}

export {
    msalConfig,
    loginRequest,
    tokenRequest,
    graphConfig,
    silentRequest,
    logoutRequest
};