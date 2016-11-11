var builder = require('botbuilder');
var main = require("./server");

var isCarFirstTime = [];

//Car insurance variables
var carRegNo = "";
var carMake;
var carModel;
var carRegCity;
var carRegYear;
var carLastTakenClaim;
var carCngLpg;
var isInsured;
var carCost;


exports.createPrompts = function(bot) {
    isCarFirstTime[0] = true;
    //Prompts
    var askCarRegNo = [
        function(session) {
            session.send("We are glad to help you get a Car Insurance. <br> Please hold on while we connect you to our Insurance Expert. <br> Please answer following few questions, so we can quickly get a quote that suits you!");
            var options = {
                retryPrompt: "Please confirm if you know your car registration number or not?",
                listStyle: builder.ListStyle["button"]
            };
            
            builder.Prompts.confirm(session, "Do you remember your Car registration number?", options);
            // if (isCarFirstTime[0]) {
            //     builder.Prompts.confirm(session, "Do you remember your Car registration number?", options);
            // }
            // else {
            //     builder.Prompts.confirm(session, "Please confirm if you know your car registration number or not?", options);
            // }
        },
        function(session, results) {
            // isCarFirstTime[0] = false;
            if (results.response) {
                // isCarFirstTime[0] = true;
                session.endDialog();
                session.beginDialog('/carRegNo');
            }
            else if (!results.response) {
                // isCarFirstTime[0] = true;
                session.endDialog();
                session.beginDialog('/carMake');
            }
            else {
                session.beginDialog('/carInsurance');
            }
        }
    ];
    var getCarRegNo = [
        function(session) {
            var options = {
                retryPrompt: "Wrong vehicle number.\nPlease enter your vehicle registration number exactly as shown in the example below?\n(eg: TN-05-AB-1234)"
            };
            // if (isCarFirstTime[0]) {
                builder.Prompts.text(session, "Please enter your vehicle registration number? \n(eg: TN-05-AB-1234)", options);
            // }
            // else {
            //     builder.Prompts.text(session, "Wrong vehicle number.\nPlease enter your vehicle registration number exactly as shown in the example below?\n(eg: TN-05-AB-1234)");
            // }
        },
        function(session, results) {
            // isCarFirstTime[0] = false;
            if (results.response) {
                if (isValidCarRegNo(results.response)) {
                    // isCarFirstTime[0] = true;
                    carRegNo = results.response;
                    // session.send("CarRegNo:" + carRegNo);
                    session.endDialog();
                    session.beginDialog('/carMake');
                }
                else {
                    session.beginDialog('/carRegNo');
                }
            }
            else {
                session.beginDialog('/carRegNo');
            }
        }
    ];
    
    var getCarMake = [
        function(session) {
            builder.Prompts.text(session, "Which car do you drive?");
        },
        function(session, results) {
            if (results.response) {
                carMake = results.response;
                session.endDialog();
                session.beginDialog('/carModel');
            }
            else {
                session.beginDialog('/carMake');
            }
        }
    ];
    
    var getCarModel = [
        function(session) {
            if (isCarFirstTime[0]) {
                builder.Prompts.text(session, "What is the model of your "+carMake+"?" );
            }
            else {
                builder.Prompts.text(session, "The car model is not in our directory. Please make sure you have entered the correct Car model.");
            }
        },
        function(session, results) {
            isCarFirstTime[0] = false;
            if (results.response) {
                if (isValidCarModel(results.response)) {
                    isCarFirstTime[0] = true;
                    carModel = results.response;
                    session.endDialog();
                    session.beginDialog('/carCity');
                }
                else {
                    session.beginDialog('/carModel');
                }
            }
            else {
                session.beginDialog('/carModel');
            }
        }
    ];
    var getCarCity = [
        function(session) {
            if (isCarFirstTime[0]) {
                builder.Prompts.text(session, "Your car is registered from which city?");
            }
            else {
                builder.Prompts.text(session, "The City name is validated to be erroneous. Please enter the correct option from the drop down.");
            }
        },
        function(session, results) {
            isCarFirstTime[0] = false;
            if (results.response) {
                if (isValidCarCity(results.response)) {
                    isCarFirstTime[0] = true;
                    carRegCity = results.response;
                    session.endDialog();
                    session.beginDialog('/carYear');
                }
                else {
                    session.beginDialog('/carCity');
                }
            }
            else {
                session.beginDialog('/carCity');
            }
        }
    ];
    var getCarYear = [
        function(session) {
            var options = {
                retryPrompt: 'Please select the correct year your car was registered in from the options given.',
                listStyle: builder.ListStyle["button"]
            };
            // if (isCarFirstTime[0]) {
                builder.Prompts.choice(
                    session,
                    'Your car is registered in which year? ', ["2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015"],
                    options
                );
            // }
            // else {
            //     builder.Prompts.choice(
            //         session,
            //         'Please select the correct year your car was registered in from the options given.', ["2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015"],
            //         options
            //     );
            // }
        },
        function(session, results) {
            // isCarFirstTime[0] = false;
            if (results.response) {
                if (isValidCarYear(results.response["entity"])) {
                    // isCarFirstTime[0] = true;
                    carRegYear = results.response["entity"];
                    session.endDialog();
                    session.beginDialog('/carCost');
                }
                else {
                    session.beginDialog('/carYear');
                }
            }
            else {
                session.beginDialog('/carYear');
            }
        }
    ];
    
       var getCarCost = [
        function(session) {
            builder.Prompts.number(session, "How much did you spend on your car?");
        },
        function(session, results) {
            if (results.response) {
                carCost = results.response;
                session.endDialog();
                session.beginDialog('/carLastClaim');
            }
            else {
                session.beginDialog('/carCost');
            }
        }
    ];
    
    var getCarLastClaim = [
        function(session) {
            var options = {
                retryPrompt: 'Please select the correct year you made your last claim from the options given below.',
                listStyle: builder.ListStyle["button"]
            };
            // if (isCarFirstTime[0]) {
                builder.Prompts.choice(
                    session,
                    'When you have taken your last claim?', ["Never", "Less than 1 year ago", "October 2014 to September 2015", "October 2013 to September 2014", "October 2012 to September 2013", "October 2011 to September 2012"],
                    options
                );
            // }
            // else {
            //     builder.Prompts.choice(
            //         session,
            //         'Please select the correct year you made your last claim from the options given below.', ["Never", "Less than 1 year ago", "October 2014 to September 2015", "October 2013 to September 2014", "October 2012 to September 2013", "October 2011 to September 2012"],
            //         options
            //     );
            // }
        },
        function(session, results) {
            // isCarFirstTime[0] = false;
            if (results.response) {
                if (isValidCarLastClaim(results.response["entity"])) {
                    // isCarFirstTime[0] = true;
                    carLastTakenClaim = results.response["entity"];
                    if (carLastTakenClaim == "Never") {
                        isInsured = false;
                    }
                    else {
                        isInsured = true;
                    }
                    session.endDialog();
                    session.beginDialog('/carCngLpg');
                }
                else {
                    session.beginDialog('/carLastClaim');
                }
            }
            else {
                session.beginDialog('/carLastClaim');
            }
        }
    ];
    var getCarCngLpg = [
        function(session) {
            var options = {
                retryPrompt: 'Please select if your car is fitted with CNG\/LPG from the options given below.',
                listStyle: builder.ListStyle["button"]
            };
            // if (isCarFirstTime[0]) {
                builder.Prompts.choice(
                    session,
                    'Is your Car CNG or LPG?', ["Don\'t have CNG\/LPG Kit", "Have Company Fitted", "Have Externally Fitted"],
                    options
                );
            // }
            // else {
            //     builder.Prompts.choice(
            //         session,
            //         'Please select if your car is fitted with CNG\/LPG from the options given below.', ["Don\'t have CNG\/LPG Kit", "Have Company Fitted", "Have Externally Fitted"],
            //         options
            //     );
            // }
        },
        function(session, results) {
            // isCarFirstTime[0] = false;
            if (results.response) {
                if (isValidCarCngLpg(results.response["entity"])) {
                    // isCarFirstTime[0] = true;
                    carCngLpg = results.response["entity"];
                    session.send("CarModel:%s,\nCarCity:%s,\nCarYear:%s,\nCarLastClaim:%s,\nCarCost:%s", carModel, carRegCity, carRegYear, carLastTakenClaim, isInsured, carCost);
                    session.sendBatch();
                    session.endDialog();
                    // main.beginHelpQuery(session);
                }
                else {
                    session.beginDialog('/carCngLpg');
                }
            }
            else {
                session.beginDialog('/carCngLpg');
            }
        }
    ];

    bot.dialog('/carInsurance', askCarRegNo);
    bot.dialog('/carRegNo', getCarRegNo);
    bot.dialog('/carMake', getCarMake);
    bot.dialog('/carModel', getCarModel);
    bot.dialog('/carCity', getCarCity);
    bot.dialog('/carYear', getCarYear);
    bot.dialog('/carCost', getCarCost);
    bot.dialog('/carLastClaim', getCarLastClaim);
    bot.dialog('/carCngLpg', getCarCngLpg);
};

exports.beginCarInsurance = function(session, options) {
    session.beginDialog('/carInsurance', options || {});
};

exports.beginCarRegNo = function(session, options) {
    session.beginDialog('/carRegNo', options || {});
};

exports.beginCarModel = function(session, options) {
    session.beginDialog('/carModel', options || {});
};

exports.beginCarCity = function(session, options) {
    session.beginDialog('/carCity', options || {});
};

exports.beginCarYear = function(session, options) {
    session.beginDialog('/carYear', options || {});
};

exports.beginCarLastClaim = function(session, options) {
    session.beginDialog('/carLastClaim', options || {});
};

exports.beginCarCngLpg = function(session, options) {
    session.beginDialog('/carCngLpg', options || {});
};

function isValidCarRegNo(carRegNo) {
    var vehicleNo = carRegNo.split("-");
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

function isValidCarRegNoCity(carRegNoCity) {
    //TODO: Validate the first 2 letters of the car reg no. eg: TN,AP
    return true;
}

function isValidCarModel(carModel) {
    //TODO: Not yet implemented validation of Car model.
    return true;
}

function isValidCarCity(carCity) {
    //TODO: Validate the Car Registratioon City
    return true;
}

function isValidCarYear(carYear) {
    //TODO: Validate the Car Year
    return true;
}

function isValidCarLastClaim(carLastClaim) {
    //TODO: Validate the Car last Claim
    return true;
}

function isValidCarCngLpg(carCngLpg) {
    //TODO: Validate if the car is fitted with CNG LPG or not
    return true;
}
