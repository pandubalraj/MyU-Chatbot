var builder = require('botbuilder');

var isCarFirstTime = [];

//Car insurance variables
var carRegNo;
var carModel;
var cngLpgFitted;
var isInsured;
var carPurchaseDate;
var carRegPlace;
var carRegYear;
var lastTakenClaim;

exports.createPrompts = function(bot) {
    isCarFirstTime[0] = true;
    //Prompts
    var askCarRegNo = [
        function(session) {
            var style = builder.ListStyle["button"];
            var options = {
                retryPrompt: 'Please select from the available list of options.',
                listStyle: style
            };
            if (isCarFirstTime[0]) {
                builder.Prompts.confirm(session, "Do you remember your Car registration number?", options);
            }
        },
        function(session, results) {
            if (results.response) {
                session.beginDialog('/carRegNo');
            }
            else if(!results.response){
                session.beginDialog('/carModel');
            }
            else{
                session.send("Please select an appropriate option.");
            }
        }
    ];
    var getCarRegNo = [
        function(session) {
            builder.Prompts.text(session, "Please enter your vehicle registration number? \n(eg: TN-05-AB-1234)");
        },
        function(session, results) {
            if (results.response) {
                if (isValidCarRegNo(results.response["entity"])) {
                    session.send("The vehicle No. is validated to be correct.");
                }
                else {

                }
            }
            else {
                session.send("Please enter a valid Reg.No");
            }
        }
    ];
    var getCarModel = [
        function(session) {
            builder.Prompts.text(session, "Which Car do you drive?");
        },
        function(session, results) {

        }
    ];
    
    bot.dialog('/carInsurance', askCarRegNo);
    bot.dialog('/carRegNo', getCarRegNo);
    bot.dialog('/carModel', getCarModel);
};

exports.beginDialog = function(session, options) {
    session.beginDialog('/carInsurance', options || {});
};

function isValidCarRegNo(str) {
    var vehicleNo = str.split("-");
    if (vehicleNo.length == 4) {
        if (vehicleNo[0].length == 2 && vehicleNo[1].length == 2 && vehicleNo[2].length == 2 && vehicleNo[3].length == 4 &&
            isNaN(vehicleNo[0]) && isNaN(vehicleNo[2]) && !isNaN(vehicleNo[1]) && !isNaN(vehicleNo[3])) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}