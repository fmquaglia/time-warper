import fs from 'fs';
import {config} from 'dotenv';
import { google } from 'googleapis';

config({
    path: '../.env'
})

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI,
} = process.env;


//http://localhost:5173/oauthcallback
// ?code=4/0AVHEtk5a8gnRo8KvOPzuxE333xgplvbkBowLRBtGhyAKAI2G-sVEmI37D6uj4JLrh1UFxg
// &scope=https://www.googleapis.com/auth/calendar
const code = '4/0AVHEtk5a8gnRo8KvOPzuxE333xgplvbkBowLRBtGhyAKAI2G-sVEmI37D6uj4JLrh1UFxg';

const {OAuth2} = google.auth;
const oauth2Client = new OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI,
);

if(!code) {
    // Generate an authorization URL
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar'],
    });
    
    console.log('Authorize your app by visiting this URL:', authUrl);
    
    
    // After the user grants permission, they'll be redirected to your redirect URI
    // with a "code" parameter
    // Replace this with the actual code from the URL
} else {
    // Exchange the authorization code for access and refresh tokens
    oauth2Client.getToken(
        code, (err, tokens) => {
            if (err) {
                console.error('Error getting tokens:', err);
                return
            }
            oauth2Client.setCredentials(tokens);
            
            // Save tokens to a file or a database for future use
            fs.writeFileSync('tokens.json', JSON.stringify(tokens));
            
            // Your authenticated API calls go here, e.g., listing calendar events
            // or creating new events
            // Use the oauth2Client instance with the Google Calendar API client
        },
    );
}

// In this example, the OAuth2 client is created with your client ID, client secret,
// and redirect URI. It generates an authorization URL where users can grant access
// to their Google Calendar data. After the user grants permission, they will be
// redirected to the specified redirect URI with a "code" parameter in the URL.

// You need to replace the `code` variable in the example with the actual code
// from the URL. Then, the OAuth2 client exchanges the authorization code for
// access and refresh tokens. These tokens are used to authenticate your
// application for API calls. It's important to store the tokens securely
// (e.g., in a file or a database) for future use, as you don't want to go
// through the OAuth flow each time your application needs access to the user's
// calendar data.

// Once you have the access and refresh tokens, you can make authenticated API
// calls using the `oauth2Client` instance.
//  Remember that access tokens expire, so you'll need to refresh them when
//  they expire. The Google APIs Node.js Client handles this automatically if
//  you have a refresh token and the `oauth2Client` instance is configured with
//  the refresh token.
//  This example demonstrates a simple command-line-based OAuth flow. In a real
//  web application, you would need to implement a proper flow using your web
//  framework, such as Express.js or similar, to handle the redirects and
//  token exchange.
