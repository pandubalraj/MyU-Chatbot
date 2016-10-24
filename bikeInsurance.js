var builder = require('botbuilder');

var isBikeFirstTime = [];

//Bike insurance variables
var bikeRegNo;

exports.createPrompts = function(bot) {
    isBikeFirstTime[0] = true;
    //Prompts
    var askBikeModel = [
        function(session) {
            if(isBikeFirstTime[0]){
                isBikeFirstTime[0] = false;
                builder.Prompts.text(session, "Which Bike do you drive?");
            }
            else{
                builder.Prompts.text(session, "Sorry, but I didn't get that. Please enter the Bike model again?");
            }
        },
        function(session, results) {
            if(results.response){
                builder.Prompts.text(session, "Your bike is registered from which city?");
            }
            else{
                session.beginDialog('/bikeInsurance');
            }
        },
        function(session, results){
            if(results.response){
                
            }
            else{
                
            }
        }
    ];

    bot.dialog('/bikeInsurance', askBikeModel);
};

exports.beginDialog = function(session, options) {
    session.beginDialog('/bikeInsurance', options || {});
};