/*
    This is a bot made using discord with its functionality based around getting information from the YELP API using commands discord to the bot.
    This bot only has 5 commands it can use currently. These commands are:

    phonebusiness
    fastfood
    businessmatches
    auto
    sport
*/

require("dotenv").config();

let yelpAPI = require('yelp-api');
let apiKey = process.env.API_KEY;
let yelp = new yelpAPI(apiKey);

const { Client, Intents } = require('discord.js');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.on("ready", function() {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async function(message) {
    command = message.content.split(" ");
    console.log(command);
      
    if (command[0] == "phonebusiness") {
        let params = [{phone: "+14159083801"}]

        yelp.query("businesses/search/phone", params).then(function(data) {
            var obj = JSON.parse(data);
            console.log(command);
            message.reply(obj.businesses[0].image_url);
        }).catch(err => {
            console.log(err);
        });
    }
    else if (command[0] == "fastfood") {
        let params2 = [{term: "pizza"},
                       {latitude: 43.6503},
                       {longitude: -79.91014},
                       {category: "italian"},
                       {radius: 40000}];

        yelp.query("businesses/search", params2).then(function(data){
            var obj = JSON.parse(data);
            console.log(obj.businesses[0].location.state);
            message.reply(obj.businesses[0].location.state);
        }).catch(err => {
            console.log(err);
        });
    }
    else if (command[0] == "businessmatches") {
        let params3 = [{name: "Gary Danko"},
                       {address1: "800 N Point St"},
                       {city: "San Francisco"},
                       {state: "CA"},
                       {country: "US"}];

        yelp.query("businesses/matches", params3).then(function(data) {
            var obj = JSON.parse(data);
            console.log(obj.businesses[0].alias);
            message.reply(obj.businesses[0].alias);
        }).catch(err => {
            console.log(err);
        });
    }
    else if (command[0] == "auto") {
        let params4 = [{text: "Delfina"},
                       {latitude: "37.8112634"},
                       {longitude: "-122.2659978"}];

        yelp.query("autocomplete", params4).then(function(data) {
            var obj = JSON.parse(data);
            console.log(obj.businesses[1].id);
            message.reply(obj.businesses[1].id);
        }).catch(err => {
            console.log(err);
        });
    }
    else if (command[0] == "sport") {
        let params5 = [{term: "sports"},
                       {location: "New York City"},
                       {categories: "soccer"},
                       {limit: 30}];

        yelp.query("businesses/search", params5).then(function(data) {
            var obj = JSON.parse(data);
            console.log(obj.businesses[0].rating);
            message.reply(String(obj.businesses[0].rating));
        }).catch(err => {
            console.log(err);
        });
    }
});

client.login(process.env.BOT_TOKEN);



