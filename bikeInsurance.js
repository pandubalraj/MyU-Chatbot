var builder = require('botbuilder');
var main = require("./server");


var isBikeFirstTime = [];

//Bike insurance variables
var bikeModel;
var bikeCity;
var bikeYear;
var bikePolicyExpiry;
var bikeLastClaim;

exports.createPrompts = function(bot) {
    isBikeFirstTime[0] = true;
    //Prompts
    var askBikeModel = [
        function(session) {
            var options = {
                retryPrompt: "Sorry, but I didn't get that. Please enter the Bike model again?"
            };
            if (isBikeFirstTime[0]) {
                builder.Prompts.text(session, "Which Bike do you drive?", options);
            }
            else {
                builder.Prompts.text(session, "Sorry, but I didn't get that. Please enter the Bike model again?");
            }
        },
        function(session, results) {
            isBikeFirstTime[0] = false;
            if (results.response) {
                if(isValidBikeModel(results.response)){
                    isBikeFirstTime[0] = true;
                    bikeModel = results.response;
                    session.endDialog();
                    session.beginDialog('/bikeCity');
                }
                else{
                    session.beginDialog('/bikeInsurance');
                }
            }
            else {
                session.beginDialog('/bikeInsurance');
            }
        }
    ];
    var askBikeRegCity = [
        function(session){
            var options = {
                retryPrompt: "Please enter the Registered City correctly!"
            };
            if(isBikeFirstTime[0]){
                builder.Prompts.text(session, "Your bike is registered from which city?", options);   
            }
            else{
                builder.Prompts.text(session, "Please enter the Registered City correctly!");
            }
        },
        function(session, results){
            isBikeFirstTime[0] = false;
            if(results.response){
                if(isValidCityName(results.response)){
                    isBikeFirstTime[0] = true;
                    bikeCity = results.response;
                    session.endDialog();
                    session.beginDialog('/bikeYear');
                }
                else{
                    session.beginDialog('/bikeCity');    
                }
            }
            else{
                session.beginDialog('/bikeCity');
            }
        }
    ];
    var askBikeYear = [
        function(session){
            var options = {
                retryPrompt: "Please enter the year correctly!",
                listStyle: builder.ListStyle["button"]
            };
            if(isBikeFirstTime[0]){
                builder.Prompts.choice(session, "Your bike is registered in which year?", ["2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015"], options);   
            }
            else{
                builder.Prompts.choice(session, "Please enter the year correctly!", ["2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015"], options);   
            }
        },
        function(session, results){
            isBikeFirstTime[0] = false;
            if(results.response){
                if(isValidYear(results.response["entity"])){
                    isBikeFirstTime[0] = true;
                    bikeYear = results.response["entity"];
                    session.endDialog();
                    session.beginDialog('/bikeExpiry');
                }
                else{
                    session.beginDialog('/bikeYear');
                }
            }
            else{
                session.beginDialog('/bikeYear');
            }
        }
    ];
    var askBikePolicyExpiry = [
        function(session){
            var options = {
                retryPrompt: "Please enter the appropriate option!",
                listStyle: builder.ListStyle["button"]
            };
            if(isBikeFirstTime[0]){
                builder.Prompts.choice(session, "Is your Previous Policy Expired? ", ["NOT YET EXPIRED", "IN LAST 90 DAYS", "BEFORE 90 DAYS"], options);   
            }
            else{
                builder.Prompts.choice(session, "Please enter the appropriate option!", ["NOT YET EXPIRED", "IN LAST 90 DAYS", "BEFORE 90 DAYS"], options);   
            }
        },
        function(session, results){
            isBikeFirstTime[0] = false;
            if(results.response){
                if(results.response["entity"]){
                    isBikeFirstTime[0] = true;
                    bikePolicyExpiry = results.response["entity"];
                    session.endDialog();
                    session.beginDialog('/bikeLastClaim');
                }
                else{
                    session.beginDialog('/bikeExpiry');
                }
            }
            else{
                session.beginDialog('/bikeExpiry');
            }
        }
    ];
    var askBikeLastClaim = [
        function(session){
            var options = {
                retryPrompt: "Please enter the appropriate option!",
                listStyle: builder.ListStyle["button"]
            };
            if(isBikeFirstTime[0]){
                builder.Prompts.choice(
                    session,
                    'When you have taken your last claim?', ["Never", "Less than 1 year ago", "October 2014 to September 2015", "October 2013 to September 2014", "October 2012 to September 2013", "October 2011 to September 2012"],
                    options
                );
            }
            else{
                builder.Prompts.choice(
                    session,
                    'Please enter the appropriate option!', ["Never", "Less than 1 year ago", "October 2014 to September 2015", "October 2013 to September 2014", "October 2012 to September 2013", "October 2011 to September 2012"],
                    options
                );
            }
        },
        function(session, results){
            isBikeFirstTime[0] = false;
            if(results.response){
                if(isValidLastClaimOption(results.response["entity"])){
                    isBikeFirstTime[0] = true;
                    bikeLastClaim = results.response["entity"];
                    session.send("BikeModel:%s,\nBikeCity:%s,\nBikeYear:%s,\nBikePolicyExpiry:%s,\nBikeLastClaim:%s", bikeModel, bikeCity, bikeYear, bikePolicyExpiry, bikeLastClaim);
                    session.sendBatch();
                    session.endDialog();
                    main.beginHelpQuery(session);
                }
                else{
                    session.beginDialog('/bikeLastClaim');
                }
            }
            else{
                session.beginDialog('/bikeLastClaim');
            }
        }
    ];

    bot.dialog('/bikeInsurance', askBikeModel);
    bot.dialog('/bikeCity', askBikeRegCity);
    bot.dialog('/bikeYear', askBikeYear);
    bot.dialog('/bikeExpiry', askBikePolicyExpiry);
    bot.dialog('/bikeLastClaim', askBikeLastClaim);
};

exports.beginBikeInsurance = function(session, options) {
    session.beginDialog('/bikeInsurance', options || {});
};

exports.beginBikeCity = function(session, options){
    session.beginDialog('/bikeCity', options || {});   
};

exports.beginBikeYear = function(session, options){
    session.beginDialog('/bikeYear', options || {});   
};

function isValidBikeModel(bikeName){
    //TODO: validate the Bike model entered by the user
    return true;
}

function isValidCityName(cityName){
    //TODO: validate the city name entered by the user
    return true;
}

function isValidYear(year){
    //TODO: validate the year to be correct
    return true;
}

function isValidLastClaimOption(option){
    //TODO: validate the option selected by the user
    return true;
}

