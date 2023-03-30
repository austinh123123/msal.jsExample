import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig, tokenRequest } from "./msalConfig";
import { updateUISi, updateUISo } from "./ui";
import * as msal from "@azure/msal-browser";

// check if browser is ms edge
const ua = window.navigator.userAgent;
const msie = ua.indexOf("MSIE ");
const msie11 = ua.indexOf("Trident/");
const msedge = ua.indexOf("Edge/");
const isIE = msie > 0 || msie11 > 0;
const isEdge = msedge > 0;

let signInType = isIE || isEdge ? "loginRedirect" : "loginPopup";
let accountId = "";

let msalInstance = new PublicClientApplication(msalConfig);

const handleSignInResponse = (response) => {
    console.log(response);
    if (response) {
        accountId = response.account.homeAccountId;
        console.log(accountId);
        msalInstance.setActiveAccount(response.account);
        return response.idTokenClaims.given_name;
    } 
    // there wasn't a successful sign in 
    const currentAccounts = msalInstance.getAllAccounts();
    console.log(currentAccounts)
    if (!currentAccounts || currentAccounts.length < 1) {
        // No accounts signed in
        return;
    } 
    // we can add logic to handle multiple accounts here
    let activeAccount = currentAccounts[0];
    accountId = activeAccount.homeAccountId;
    msalInstance.setActiveAccount(activeAccount);
};

const signIn = async () => {
    // we use await to make sure that the interaction is completed or cancelled before we move on  
    const resp = await msalInstance[signInType](tokenRequest);
    const name = handleSignInResponse(resp);
    // check if account is set 
    if (msalInstance.getActiveAccount() === null) {
        // account is not set, so do nothing
        console.log("account is not set");
        return;
    }
    // get a token 
    getTokenRedirect(tokenRequest).then(response => {
        console.log(response);
        // if response was successful, there is a jwt token in the response
        if (response) {
            updateUISi(name);
        }
    })
    .catch(error => {
        console.log(error);
    })
    .finally(() => {
        console.log("done");
    });
}

function signOut(interactionType) {
    const logoutRequest = {
        account: msalInstance.getAccountByHomeId(accountId)
    };

    if (interactionType === "popup") {
        msalInstance.logoutPopup(logoutRequest).then(() => {
            window.location.reload();
        });
    } else {
        msalInstance.logoutRedirect(logoutRequest);
    }
    updateUISo();
}

async function getTokenRedirect(request) {
    console.log(request)
    try {
        // this gets a new token without user interaction
        return await msalInstance.acquireTokenSilent(request);
    } catch (error) {
        console.log(error);
        if (error instanceof msal.InteractionRequiredAuthError) {
            return await msalInstance.acquireTokenRedirect(request);
        } else {
            console.log(error);
        }
    }
}   

export {signIn, signOut, msalInstance, accountId, getTokenRedirect};