var request = require('request');
var flock = require('flockos');
var config = require('./config.js');
var express = require('express');
var fs = require('fs');
var MsTranslator = require('mstranslator');
// var translate = require('@google-cloud/translate')({
//   projectId: 'graphic-tangent-156509',
//   keyFilename: './FlockGoogleTranslate-c6672cb57344.json'
// });
var app = express();
var client = new MsTranslator({
  api_key: "431e427ba582406e87ba31290c7bb8ad" // use this for the new token API. 
}, true);
flock.setAppId(config.appId);
flock.setAppSecret(config.appSecret);

app.use(flock.events.tokenVerifier);
app.post('/events', flock.events.listener);

// Read tokens from a local file, if possible.
var tokens;
try {
    tokens = require('./tokens.json');
} catch (e) {
    tokens = {};
}

// save tokens on app.install
flock.events.on('app.install', function(event) {
    tokens[event.userId] = event.token;
});

// delete tokens on app.uninstall
flock.events.on('app.uninstall', function(event) {
    delete tokens[event.userId];
});

// Start the listener after reading the port from config
var port = config.port || 8080||process.env.PORT;
app.listen(port, function() {
    console.log('Listening on port: ' + port);
});

// exit handling -- save tokens in token.js before leaving
process.on('SIGINT', process.exit);
process.on('SIGTERM', process.exit);
process.on('exit', function() {
    fs.writeFileSync('./tokens.json', JSON.stringify(tokens));
});
flock.events.on('client.slashCommand', function(event) {
     var params = {
  text: event.text
  , from: 'en'
  , to: 'es'
};
client.translate(params, function(err, data) {
    flock.callMethod('chat.sendMessage', getUserToken(event.userId), {
        to: event.chat,
        text: data
    }, function(error, response) {
        if (!error) {
            console.log('uid for message: ' + response.uid);
        } else {
            console.log('error sending message: ' + error.id);
        }
    });  
});

});

getUserToken = function(userId) {
    return tokens[userId];
}
// // googleTranslate.translate('My name is Brandon', 'es', function(err, translation) {
// //   console.log(translation.translatedText);
// //   // =>  Mi nombre es Brandon
// });
// // Imports the Google Cloud client library


// // Your Google Cloud Platform project ID
// const projectId = 'YOUR_PROJECT_ID';

// // Instantiates a client
// const translateClient = Translate({
//     projectId: projectId
// });

// // The text to translate
// const text = 'Hello, world!';
// // The target language
// const target = 'ru';

// // Translates some text into Russian
// translateClient.translate(text, target)
//     .then((results) => {
//         const translation = results[0];

//         console.log(`Text: ${text}`);
//         console.log(`Translation: ${translation}`);
//     });

// function translateText(input, target) {
//   // The text to translate, e.g.:
//   // input = 'Hello, world';
//   // The target language, e.g.:
//   // target = 'ru';

//   if (!Array.isArray(input)) {
//     input = [input];
//   }

//   // Instantiates a client
//   const translate = Translate();

//   // Translates the text into the target language. "input" can be a string for
//   // translating a single piece of text, or an array of strings for translating
//   // multiple texts.
//   return translate.translate(input, target)
//     .then((results) => {
//       let translations = results[0];
//       translations = Array.isArray(translations) ? translations : [translations];

//       console.log('Translations:');
//       translations.forEach((translation, i) => {
//         console.log(`${input[i]} => (${target}) ${translation}`);
//       });

//       return translations;
//     });
// }

// Second parameter to constructor (true) indicates that
// the token should be auto-generated.

// // old token API
// var client = new MsTranslator({
//   client_id: "your client_id" // use this for the old token API
//   , client_secret: "your client secret" // use this for the old token API
// }, true);

// new token API




// Don't worry about access token, it will be auto-generated if needed.
