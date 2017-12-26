var tmi = require('tmi.js');
// Created a seperate file that exports OAuth password
// This way I can put it on GitHub
var oauth = require('./auth.js');

var options = {
    options: {
        debug: true
    },
    connnection: {
        cluster: "aws",
        reconnect: true
    },
    identity: {
        username: "codeItBot",
        // Using the external file with the password
        password: oauth.password
    },
    channels: ["gocodeit"]
};

var client = new tmi.client(options);
client.connect();

client.on("connected", function (address, port) {
    client.action('gocodeit', "Officially Connected!");
});

client.on("join", function (channel, username, self) {
    client.action('gocodeit', 'People please welcome ' + username)
});

client.on("chat", function (channel, user, message, self) {
    if (message === "!project") {
        client.action('gocodeit', "Making a recipes website that my mother will use in her free time. Mean stack bish. https://les-recettes-de-maman.herokuapp.com");
    }
});