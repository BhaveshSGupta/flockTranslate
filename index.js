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
var lang;
try {
    lang = require('./lang.json');
} catch (e) {
    lang = {};
}

// save tokens on app.install
flock.events.on('app.install', function(event) {
    tokens[event.userId] = event.token;
    lang[event.userId]='es';
    flock.callMethod('chat.sendMessage', 'a86b41e0-93a8-4db9-b4a8-6ea371704b75', {
        to: event.userId,
        text:'TEXT',
        flockml: "<flockml><strong>Welcome to the world of translations</strong><br/>Your Current selected translation language is Hindi<br/>To change Language please type /translate changeLanguage<br/>To get list of languages please type /translate listLanguages<flockml>"
    }, function(error, response) {
        if (!error) {
            console.log('error sending message: ' + event.chat+" "+event.userId+" "+getUserToken(event.userId));
            console.log('uid for message: ' + response.uid);
        } else {
            console.log('error sending message: ' + event.chat+" "+event.userId+" "+getUserToken(event.userId));
        }
    });
});

// delete tokens on app.uninstall
flock.events.on('app.uninstall', function(event) {
    delete tokens[event.userId];
    delete lang[event.userId];
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
    fs.writeFileSync('./lang.json', JSON.stringify(lang));
});
flock.events.on('client.slashCommand', function(event) {
var firstword=(event.text).split(" ");
if(firstword[0]==="changeLanguage"){
//firstword.length();
input=firstword[1]
if(input==''||firstword.length==1) result="Please add a Language Code";
else if(firstword.length>2)result="Please write in format /translate changeLanguage [Language Code]"
// else if(input=='hi'){lang[event.userId]='hi';result="Your translating language has been change to Hindi";}
// else if(input=='es'){lang[event.userId]='es';result="Your translating language has been change to Spanish";}
// else if(input=='zh-CHS'){lang[event.userId]='zh-CHS';result="Your translating language has been change to Chinese Simplified";}
// else if(input=='zh-CHT'){lang[event.userId]='zh-CHT';result="Your translating language has been change to Chinese Traditional";}
// else if(input=='id'){lang[event.userId]='id';result="Your translating language has been change to Indonesian";}
// else if(input=='de'){lang[event.userId]='de';result="Your translating language has been change to German";}
// else if(input=='vi'){lang[event.userId]='vi';result="Your translating language has been change to Vietnamese";}
else if(input=='af'){lang[event.userId]='af';result='Your translating language has been change to Afrikaans';}
else if(input=='ar'){lang[event.userId]='ar';result='Your translating language has been change to Arabic';}
else if(input=='bs-Latn'){lang[event.userId]='bs-Latn';result='Your translating language has been change to Bosnian (Latin)';}
else if(input=='bg'){lang[event.userId]='bg';result='Your translating language has been change to Bulgarian';}
else if(input=='ca'){lang[event.userId]='ca';result='Your translating language has been change to Catalan';}
else if(input=='zh-CHS'){lang[event.userId]='zh-CHS';result='Your translating language has been change to Chinese Simplified';}
else if(input=='zh-CHT'){lang[event.userId]='zh-CHT';result='Your translating language has been change to Chinese Traditional';}
else if(input=='hr'){lang[event.userId]='hr';result='Your translating language has been change to Croatian';}
else if(input=='cs'){lang[event.userId]='cs';result='Your translating language has been change to Czech';}
else if(input=='da'){lang[event.userId]='da';result='Your translating language has been change to Danish';}
else if(input=='nl'){lang[event.userId]='nl';result='Your translating language has been change to Dutch';}
else if(input=='en'){lang[event.userId]='en';result='Your translating language has been change to English';}
else if(input=='et'){lang[event.userId]='et';result='Your translating language has been change to Estonian';}
else if(input=='fi'){lang[event.userId]='fi';result='Your translating language has been change to Finnish';}
else if(input=='fr'){lang[event.userId]='fr';result='Your translating language has been change to French';}
else if(input=='de'){lang[event.userId]='de';result='Your translating language has been change to German';}
else if(input=='el'){lang[event.userId]='el';result='Your translating language has been change to Greek';}
else if(input=='ht'){lang[event.userId]='ht';result='Your translating language has been change to Haitian Creole';}
else if(input=='he'){lang[event.userId]='he';result='Your translating language has been change to Hebrew';}
else if(input=='hi'){lang[event.userId]='hi';result='Your translating language has been change to Hindi';}
else if(input=='mww'){lang[event.userId]='mww';result='Your translating language has been change to Hmong Daw';}
else if(input=='hu'){lang[event.userId]='hu';result='Your translating language has been change to Hungarian';}
else if(input=='id'){lang[event.userId]='id';result='Your translating language has been change to Indonesian';}
else if(input=='it'){lang[event.userId]='it';result='Your translating language has been change to Italian';}
else if(input=='ja'){lang[event.userId]='ja';result='Your translating language has been change to Japanese';}
else if(input=='sw'){lang[event.userId]='sw';result='Your translating language has been change to Kiswahili';}
else if(input=='tlh'){lang[event.userId]='tlh';result='Your translating language has been change to Klingon';}
else if(input=='tlh-Qaak'){lang[event.userId]='tlh-Qaak';result='Your translating language has been change to Klingon (pIqaD)';}
else if(input=='ko'){lang[event.userId]='ko';result='Your translating language has been change to Korean';}
else if(input=='lv'){lang[event.userId]='lv';result='Your translating language has been change to Latvian';}
else if(input=='lt'){lang[event.userId]='lt';result='Your translating language has been change to Lithuanian';}
else if(input=='ms'){lang[event.userId]='ms';result='Your translating language has been change to Malay';}
else if(input=='mt'){lang[event.userId]='mt';result='Your translating language has been change to Maltese';}
else if(input=='no'){lang[event.userId]='no';result='Your translating language has been change to Norwegian';}
else if(input=='fa'){lang[event.userId]='fa';result='Your translating language has been change to Persian';}
else if(input=='pl'){lang[event.userId]='pl';result='Your translating language has been change to Polish';}
else if(input=='pt'){lang[event.userId]='pt';result='Your translating language has been change to Portuguese';}
else if(input=='otq'){lang[event.userId]='otq';result='Your translating language has been change to Querétaro Otomi';}
else if(input=='ro'){lang[event.userId]='ro';result='Your translating language has been change to Romanian';}
else if(input=='ru'){lang[event.userId]='ru';result='Your translating language has been change to Russian';}
else if(input=='sr-Cyrl'){lang[event.userId]='sr-Cyrl';result='Your translating language has been change to Serbian (Cyrillic)';}
else if(input=='sr-Latn'){lang[event.userId]='sr-Latn';result='Your translating language has been change to Serbian (Latin)';}
else if(input=='sk'){lang[event.userId]='sk';result='Your translating language has been change to Slovak';}
else if(input=='sl'){lang[event.userId]='sl';result='Your translating language has been change to Slovenian';}
else if(input=='es'){lang[event.userId]='es';result='Your translating language has been change to Spanish';}
else if(input=='sv'){lang[event.userId]='sv';result='Your translating language has been change to Swedish';}
else if(input=='th'){lang[event.userId]='th';result='Your translating language has been change to Thai';}
else if(input=='tr'){lang[event.userId]='tr';result='Your translating language has been change to Turkish';}
else if(input=='uk'){lang[event.userId]='uk';result='Your translating language has been change to Ukrainian';}
else if(input=='ur'){lang[event.userId]='ur';result='Your translating language has been change to Urdu';}
else if(input=='vi'){lang[event.userId]='vi';result='Your translating language has been change to Vietnamese';}
else if(input=='cy'){lang[event.userId]='cy';result='Your translating language has been change to Welsh';}
else if(input=='yua'){lang[event.userId]='yua';result='Your translating language has been change to Yucatec Maya';}
else {result="Please provide correct Language code. Type /translate listLanguages to get list of Languages";}
   flock.callMethod('chat.sendMessage', 'a86b41e0-93a8-4db9-b4a8-6ea371704b75', {
        to: event.userId,
        text:result
    }, function(error, response) {
        if (!error) {
            console.log('sending message: ' + event.chat+" "+event.userId+" "+getUserToken(event.userId));
            console.log('uid for message: ' + response.uid);
        } else {
            console.log('error sending message: ' + event.chat+" "+event.userId+" "+getUserToken(event.userId));
        }
    }); 
}
else if(firstword[0]==="listLanguages"){
flock.callMethod('chat.sendMessage', 'a86b41e0-93a8-4db9-b4a8-6ea371704b75', {
        to: event.userId,
        text:"result",
        flockml: "<flockml><strong>List of Languages:</strong><br/> Type <strong>af</strong> for <strong> Afrikaans</strong> <br/> Type <strong>ar</strong> for <strong> Arabic</strong> <br/> Type <strong>bs-Latn</strong> for <strong> Bosnian (Latin)</strong> <br/> Type <strong>bg</strong> for <strong> Bulgarian</strong> <br/> Type <strong>ca</strong> for <strong> Catalan</strong> <br/> Type <strong>zh-CHS</strong> for <strong> Chinese Simplified</strong> <br/> Type <strong>zh-CHT</strong> for <strong> Chinese Traditional</strong> <br/> Type <strong>hr</strong> for <strong> Croatian</strong> <br/> Type <strong>cs</strong> for <strong> Czech</strong> <br/> Type <strong>da</strong> for <strong> Danish</strong> <br/> Type <strong>nl</strong> for <strong> Dutch</strong> <br/> Type <strong>en</strong> for <strong> English</strong> <br/> Type <strong>et</strong> for <strong> Estonian</strong> <br/> Type <strong>fi</strong> for <strong> Finnish</strong> <br/> Type <strong>fr</strong> for <strong> French</strong> <br/> Type <strong>de</strong> for <strong> German</strong> <br/> Type <strong>el</strong> for <strong> Greek</strong> <br/> Type <strong>ht</strong> for <strong> Haitian Creole</strong> <br/> Type <strong>he</strong> for <strong> Hebrew</strong> <br/> Type <strong>hi</strong> for <strong> Hindi</strong> <br/> Type <strong>mww</strong> for <strong> Hmong Daw</strong> <br/> Type <strong>hu</strong> for <strong> Hungarian</strong> <br/> Type <strong>id</strong> for <strong> Indonesian</strong> <br/> Type <strong>it</strong> for <strong> Italian</strong> <br/> Type <strong>ja</strong> for <strong> Japanese</strong> <br/> Type <strong>sw</strong> for <strong> Kiswahili</strong> <br/> Type <strong>tlh</strong> for <strong> Klingon</strong> <br/> Type <strong>tlh-Qaak</strong> for <strong> Klingon (pIqaD)</strong> <br/> Type <strong>ko</strong> for <strong> Korean</strong> <br/> Type <strong>lv</strong> for <strong> Latvian</strong> <br/> Type <strong>lt</strong> for <strong> Lithuanian</strong> <br/> Type <strong>ms</strong> for <strong> Malay</strong> <br/> Type <strong>mt</strong> for <strong> Maltese</strong> <br/> Type <strong>no</strong> for <strong> Norwegian</strong> <br/> Type <strong>fa</strong> for <strong> Persian</strong> <br/> Type <strong>pl</strong> for <strong> Polish</strong> <br/> Type <strong>pt</strong> for <strong> Portuguese</strong> <br/> Type <strong>otq</strong> for <strong> Querétaro Otomi</strong> <br/> Type <strong>ro</strong> for <strong> Romanian</strong> <br/> Type <strong>ru</strong> for <strong> Russian</strong> <br/> Type <strong>sr-Cyrl</strong> for <strong> Serbian (Cyrillic)</strong> <br/> Type <strong>sr-Latn</strong> for <strong> Serbian (Latin)</strong> <br/> Type <strong>sk</strong> for <strong> Slovak</strong> <br/> Type <strong>sl</strong> for <strong> Slovenian</strong> <br/> Type <strong>es</strong> for <strong> Spanish</strong> <br/> Type <strong>sv</strong> for <strong> Swedish</strong> <br/> Type <strong>th</strong> for <strong> Thai</strong> <br/> Type <strong>tr</strong> for <strong> Turkish</strong> <br/> Type <strong>uk</strong> for <strong> Ukrainian</strong> <br/> Type <strong>ur</strong> for <strong> Urdu</strong> <br/> Type <strong>vi</strong> for <strong> Vietnamese</strong> <br/> Type <strong>cy</strong> for <strong> Welsh</strong> <br/> Type <strong>yua</strong> for <strong> Yucatec Maya</strong><flockml>"
    }, function(error, response) {
        if (!error) {
            console.log('sending message: ' + event.chat+" "+event.userId+" "+getUserToken(event.userId));
            console.log('uid for message: ' + response.uid);
        } else {
            console.log('error sending message: ' + event.chat+" "+event.userId+" "+getUserToken(event.userId));
        }
    }); 
}
else{
    var trans = new MsTranslator({api_key: "431e427ba582406e87ba31290c7bb8ad"}, true);
    var params = {
  text: event.text
  , from: 'en'
  , to: getUserTokenLan(event.userId)
};
trans.translate(params, function(err, edata) {
    data=''
    if(err){
flock.callMethod('chat.sendMessage', 'a86b41e0-93a8-4db9-b4a8-6ea371704b75', {
        to: event.chat,
        text: 'Translator Service is down there are some server issues which would be resolved soon.'
    }, function(error, response) {
        if (!error) {
            console.log('error sending message: ' + event.chat+" "+event.userId+" "+getUserToken(event.userId));
            console.log('uid for message: ' + response.uid);
        } else {
            console.log('error sending message: ' + event.chat+" "+event.userId+" "+getUserToken(event.userId));
        }
    });
    }
    else{
    flock.callMethod('chat.sendMessage', getUserToken(event.userId), {
        to: event.chat,
        text: edata
    }, function(error, response) {
        if (!error) {
            console.log('error sending message: ' + event.chat+" "+event.userId+" "+getUserToken(event.userId));
            console.log('uid for message: ' + response.uid);
        } else {
            console.log('error sending message: ' + event.chat+" "+event.userId+" "+getUserToken(event.userId));
        }
    });
    }
  
});

}



});

getUserToken = function(userId) {
    return tokens[userId];
}
getUserTokenLan = function(userId) {
    return lang[userId];
}