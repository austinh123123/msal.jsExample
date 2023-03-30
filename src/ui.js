import { signIn, signOut } from './auth';
const signInButton = document.getElementById('signIn');
const welcomeMessage = document.getElementById('userName');
const userInfo = document.getElementById('userInfo');

/**
 * Updates UI when a user is signed in 
 */
export const updateUISi = (name) => {
    // change 
    signInButton.innerHTML = "Sign Out";
    document.getElementById('signIn').removeEventListener('click', signIn);
    document.getElementById('signIn').addEventListener('click', signOut);
    welcomeMessage.innerHTML = `
        Welcome ${name}
        <br>
        Check out the source code for how this sample works. 
        <br>
        See msalConfig.js for the configuration 
        <br>
        auth.js for the authentication logic.
        <br>
        ui.js for the UI logic and index.js inserts the event listeners.
    `;
    
    
}

/**
 * Updates UI when a user is signed out
 */
export const updateUISo = () => {
    signInButton.innerHTML = "Sign In";
    document.getElementById('signIn').removeEventListener('click', signOut);
    document.getElementById('signIn').addEventListener('click', signIn);
}