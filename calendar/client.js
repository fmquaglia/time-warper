import fs from 'fs';
import { config } from 'dotenv';
import { google } from 'googleapis';

config({
    path: '../.env',
})

const {OAuth2} = google.auth;

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI,
} = process.env;


const oauth2Client = new OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
);

const tokens = JSON.parse(fs.readFileSync('tokens.json'))
console.log(tokens);

// Set the obtained tokens to the OAuth 2.0 client
// const tokens = {
//     access_token: tokens.access_token,
//     refresh_token: tokens.refresh_token,
//     scope: 'https://www.googleapis.com/auth/calendar',
//     token_type: 'Bearer',
//     expiry_date: 1679792412133,
// };

oauth2Client.setCredentials(tokens);

// Now you can use the oauth2Client instance to make authenticated API calls
const calendar = google.calendar({version: 'v3', auth: oauth2Client});

calendar.events.list(
    {
        calendarId: 'c682b6ee3345e73c551fc3c5133a66dfb19ff19071c13552b9a159dd00ddd4fe@group.calendar.google.com',
        timeMin: (new Date()).toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
    },
    (err, res) => {
        if (err) {
            console.error('The API returned an error:', err);
            return;
        }
        
        const events = res.data.items;
        if (events.length) {
            console.log('Upcoming events:');
            events.forEach((event) => {
                const start = event.start.dateTime || event.start.date;
                console.log(`${start} - ${event.summary}`);
            });
        } else {
            console.log('No upcoming events found.');
        }
    },
);
