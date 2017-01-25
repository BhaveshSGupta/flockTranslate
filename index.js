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
var port = process.env.PORT || 8080;
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
    var trans = new MsTranslator({api_key: "431e427ba582406e87ba31290c7bb8ad"}, true);
    var params = {
  text: event.text
  , from: 'en'
  , to: 'es'
};
trans.translate(params, function(err, edata) {
    data=''
    if(err){
        data="errror";
    }
    else{
        data=edata;
    }
    flock.callMethod('chat.sendMessage', getUserToken(event.userId), {
        to: event.chat,
        text: data
    }, function(error, response) {
        if (!error) {
            console.log('error sending message: ' + event.chat+" "+event.userId+" "+getUserToken(event.userId));
            console.log('uid for message: ' + response.uid);
        } else {
            console.log('error sending message: ' + event.chat+" "+event.userId+" "+getUserToken(event.userId));
        }
    });  
});

});

getUserToken = function(userId) {
    return tokens[userId];
}
