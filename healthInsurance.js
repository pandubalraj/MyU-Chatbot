var builder = require('botbuilder');

var isHealthFirstTime = [];

//Health insurance variables
var noOfAdults;
var noOfChild;
var healthDOB;
var healthCity;

exports.createPrompts = function(bot) {
    isHealthFirstTime[0] = true;
    //Prompts
    var askBikeModel = [
        function(session) {
            if(isHealthFirstTime[0]){
                isHealthFirstTime[0] = false;
                builder.Prompts.text(session, "How many Adults you want to insure?");
            }
            else{
                builder.Prompts.text(session, "I'm sorry, but I didn't understand.\nCan you please tell me how many Adults you want to insure?");
            }
        },
        function(session, results) {
            if(results.response){
                builder.Prompts.text(session, "Your bike is registered from which city?");
            }
            else{
                session.beginDialog('/healthInsurance');
            }
        }
    ];

    bot.dialog('/healthInsurance', askBikeModel);
};

exports.beginDialog = function(session, options) {
    session.beginDialog('/healthInsurance', options || {});
};