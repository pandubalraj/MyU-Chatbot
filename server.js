var restify = require('restify');
var builder = require('botbuilder');

var sourceFile = require('./sourceFile');

var car = require("./carInsurance");
var bike = require("./bikeInsurance");
var health = require("./healthInsurance");
var term = require("./termInsurance");
var child = require("./childInsurance");
var investment = require("./investmentPolicy");
var pension = require("./pensionPolicy");

//LUIS AI app model for MyU
var insuranceRecognizer = new builder.LuisRecognizer('https://api.projectoxford.ai/luis/v1/application?id=3441c805-65b1-4cc0-8b5e-e6c92b747ca8&subscription-key=c9ad898006c6426d95251f015167aaa1&q=');
var faqRecognizerApp1 = new builder.LuisRecognizer('https://api.projectoxford.ai/luis/v1/application?id=b746432a-7f7d-44be-92eb-900db813a733&subscription-key=c9ad898006c6426d95251f015167aaa1&q=');
var faqRecognizerApp2 = new builder.LuisRecognizer('https://api.projectoxford.ai/luis/v1/application?id=37d62173-2e8e-45e0-96fa-6b5e054096da&subscription-key=c9ad898006c6426d95251f015167aaa1&q=');
var faqRecognizerApp3 = new builder.LuisRecognizer('https://api.projectoxford.ai/luis/v1/application?id=9ef81def-abde-4531-8470-af3024ab7d57&subscription-key=c9ad898006c6426d95251f015167aaa1&q=');

var dialog = new builder.IntentDialog({
    recognizers: [insuranceRecognizer, faqRecognizerApp1, faqRecognizerApp2, faqRecognizerApp3]
});

//#region Bot Connector
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector, {
    localizerSettings: {
        botLocalePath: "./node_modules/botbuilder/lib/locale",
        defaultLocale: "en"
    }
});
var server = restify.createServer();
server.post('/api/messages', connector.listen());
server.get(/.*/, restify.serveStatic({
    'directory': '.',
    'default': 'index.html'
}));

server.listen(process.env.port || process.env.PORT || 3978, process.env.ip || process.env.IP, function() {
    console.log('%s listening to %s', server.name, server.url);
});
//#endregion Bot Connector

// //#region Console Connector
// var connector = new builder.ConsoleConnector().listen();
// var bot = new builder.UniversalBot(connector, {
//     localizerSettings: {
//         botLocalePath: "./node_modules/botbuilder/lib/locale",
//         defaultLocale: "en"
//     }
// });
// var server = restify.createServer(); // Setup Restify Server
// server.get(/.*/, restify.serveStatic({ // Serve a static web page
//     'directory': '.',
//     'default': 'index.html'
// }));
// server.listen(process.env.port || process.env.PORT || 3978, process.env.IP || process.env.ip, function() {
//     console.log('%s listening to %s', server.name, server.url);
// });
// //#endregion Console Connector

var availableInsuranceTypes = ["Car", "Bike", "Health", "Term", "Child", "Investment", "Pension"];
var typeOfInsurance = "";
var name;

//Initialize all the prompts in Car
car.createPrompts(bot);

// Use the below dialog as a testing workbench
// bot.dialog('/',[
//     function (session) {
//         if(car != null){
//             session.send("yay");
//             car.beginDialog(session);
//         }
//     }
// ]);

//#region FAQ Dialogues
bot.dialog('/faqs', dialog);
//App 1
dialog.matches('None', builder.DialogAction.send(sourceFile.None));
dialog.matches('Insurance', builder.DialogAction.send(sourceFile.Insurance));
dialog.matches('CIMandate', builder.DialogAction.send(sourceFile.CIMandate));
dialog.matches('CITypes', builder.DialogAction.send(sourceFile.CITypes));
dialog.matches('Policy', builder.DialogAction.send(sourceFile.Policy));
dialog.matches('LiabilityPolicy', builder.DialogAction.send(sourceFile.LiabilityPolicy));
dialog.matches('CICompPackage', builder.DialogAction.send(sourceFile.CICompPackage));
dialog.matches('AddOnCover', builder.DialogAction.send(sourceFile.AddOnCover));
dialog.matches('Exclusion', builder.DialogAction.send(sourceFile.Exclusion));
dialog.matches('Duration', builder.DialogAction.send(sourceFile.Duration));
dialog.matches('InspectVehicle', builder.DialogAction.send(sourceFile.InspectVehicle));
dialog.matches('Premium', builder.DialogAction.send(sourceFile.Premium));
dialog.matches('CarEval', builder.DialogAction.send(sourceFile.CarEval));
dialog.matches('IDV', builder.DialogAction.send(sourceFile.IDV));
dialog.matches('PlaceOfReg', builder.DialogAction.send(sourceFile.PlaceOfReg));
dialog.matches('DiffCompPremium', builder.DialogAction.send(sourceFile.DiffCompPremium));
dialog.matches('Discounts', builder.DialogAction.send(sourceFile.Discounts));
dialog.matches('Deductible', builder.DialogAction.send(sourceFile.Deductible));
dialog.matches('Claim', builder.DialogAction.send(sourceFile.Claim));
dialog.matches('Greeting', builder.DialogAction.send(sourceFile.Greeting));

//App 2
dialog.matches('NCB', builder.DialogAction.send(sourceFile.NCB));
dialog.matches('Bonus', builder.DialogAction.send(sourceFile.Bonus));
dialog.matches('OldNoClaim', builder.DialogAction.send(sourceFile.OldNoClaim));
dialog.matches('NoClaimTransfer', builder.DialogAction.send(sourceFile.NoClaimTransfer));
dialog.matches('Insurer', builder.DialogAction.send(sourceFile.Insurer));
dialog.matches('NoClaimLapse', builder.DialogAction.send(sourceFile.NoClaimLapse));
dialog.matches('AAMDiscount', builder.DialogAction.send(sourceFile.AAMDiscount));
dialog.matches('ATDDiscount', builder.DialogAction.send(sourceFile.ATDDiscount));
dialog.matches('SellCar', builder.DialogAction.send(sourceFile.SellCar));
dialog.matches('InsureRenewal', builder.DialogAction.send(sourceFile.InsureRenewal));
dialog.matches('CancelInsure', builder.DialogAction.send(sourceFile.CancelInsure));
dialog.matches('Installments', builder.DialogAction.send(sourceFile.Installments));
dialog.matches('InsureCert', builder.DialogAction.send(sourceFile.InsureCert));
dialog.matches('DocsNeeded', builder.DialogAction.send(sourceFile.DocsNeeded));
dialog.matches('TotalLoss', builder.DialogAction.send(sourceFile.TotalLoss));
dialog.matches('Insured', builder.DialogAction.send(sourceFile.Insured));
dialog.matches('CashlessClaims', builder.DialogAction.send(sourceFile.CashlessClaims));
dialog.matches('CarStolen', builder.DialogAction.send(sourceFile.CarStolen));
dialog.matches('OtherPerson', builder.DialogAction.send(sourceFile.OtherPerson));
dialog.matches('CarAccessories', builder.DialogAction.send(sourceFile.CarAccessories));

//App 3
dialog.matches('BetterIDV', builder.DialogAction.send(sourceFile.BetterIDV));
dialog.matches('NCBAllowed', builder.DialogAction.send(sourceFile.NCBAllowed));
dialog.matches('BreakInInsure', builder.DialogAction.send(sourceFile.BreakInInsure));
dialog.matches('LPGCNG', builder.DialogAction.send(sourceFile.LPGCNG));
dialog.matches('Endorsement', builder.DialogAction.send(sourceFile.Endorsement));
dialog.matches('Electric', builder.DialogAction.send(sourceFile.Electric));
dialog.matches('Bike', builder.DialogAction.send(sourceFile.Bike));
dialog.matches('RTO', builder.DialogAction.send(sourceFile.RTO));
dialog.matches('RTOCode', builder.DialogAction.send(sourceFile.RTOCode));
dialog.matches('Aggregator', builder.DialogAction.send(sourceFile.Aggregator));
dialog.matches('DiffAggregator', builder.DialogAction.send(sourceFile.DiffAggregator));
dialog.matches('MyUniverse', builder.DialogAction.send(sourceFile.MyUniverse));
dialog.matches('MyUniverseTypes', builder.DialogAction.send(sourceFile.MyUniverseTypes));
dialog.matches('EasyPolicy', builder.DialogAction.send(sourceFile.EasyPolicy));

//Changing to Insurance bot
dialog.matches('Exit', function(session) {
    session.send("Ok, let me redirect you to our Insurance Expert.");
    session.endDialog();
    session.beginDialog('/insurance');
});
//#endregion FAQ Dialogues


var isFirstTime = true,
    cases = 0;
// Create bot root dialog for Bot
bot.dialog('/', [
    function(session) {
        //getting the name
        if (isFirstTime) {
            session.send("Hi there,\nit's a pleasure meeting you.");
            builder.Prompts.text(session, ["May I have your name please.", "Hi! What is your name?", "By the way i didn't get your name.", "May I know how you may be called?"]);
        }
        else {
            switch (cases) {
                //the below cases 1,2,3 are for wrong names
                case 1:
                    builder.Prompts.text(session, "Please enter your full name.");
                    break;
                case 2:
                    builder.Prompts.text(session, "Please enter a valid name.");
                    break;
                case 3:
                    builder.Prompts.text(session, "Please enter your name.");
                    break;
                    // the below cases 4,5 are for wrong option selection
                case 4:
                    builder.Prompts.text(session, "No option found. Please select the appropriate Option.");
                    break;
                case 5:
                    builder.Prompts.text(session, "Please select an Option.");
                    break;
                default:
                    builder.Prompts.text(session, "Please enter a valid name.");
            }
        }
    },
    function(session, results, next) {
        //setting the name and asking how to help
        isFirstTime = false;
        //redirect to next question if the name already retrieved from the user
        if (cases >= 4) {
            next();
        }
        else {
            if (results.response) {
                //This will run for a valid string
                if (isNaN(results.response) && isValid(results.response)) {
                    //Lets check if it is a full name
                    if (results.response.split(' ').length > 1) {
                        // isFirstTime = true;
                        name = results.response;
                        session.send(["Welcome " + name + " it's a pleasure meeting you.", "Hi there,\nit's good to see you, " + name + "."]);
                        var options = {
                            retryPrompt: 'Please select with what I can help you today.',
                            listStyle: builder.ListStyle["button"]
                        };
                        builder.Prompts.choice(
                            session,
                            'Please let me know what what I may help you with, today?', ["I have a question!", "I am looking for an insurance"],
                            options
                        );
                    }
                    else {
                        cases = 1;
                        session.beginDialog('/');
                    }
                }
                else {
                    cases = 2;
                    session.beginDialog('/');
                }
            }
            else {
                cases = 3;
                session.beginDialog('/');
            }
        }
    },
    function(session, results) {
        //redirecting depending upon the help required by the user
        if (results.response) {
            if (results.response["index"] == 0) {
                session.send("Sure, please hold on " + name + " while we connect you to our Techncial Advisor.");
                session.send("Thank you for your patience. You are now talking with " + generateRandomName() + ". You can ask your queries now.");
                session.endDialog();
                session.beginDialog('/faqs');
            }
            else if (results.response["index"] == 1) {
                session.endDialog();
                isFirstTime = true;
                cases = 0;
                session.beginDialog('/insurance');
            }
            else {
                cases = 4;
                session.beginDialog('/');
            }
        }
        else {
            cases = 5;
            session.beginDialog('/');
        }
    }
]);

//Serve the user with an Insurance Policy
bot.dialog('/insurance', [
    function(session) {
        //ask what type of policy user wants
        var options = {
            retryPrompt: 'Please select from the available list of policies.',
            listStyle: builder.ListStyle["button"]
        };
        if (isFirstTime) {
            session.send("Great!!!\nLet us get you covered with the best insurance policy !\nWe will help you compare Insurance Plans from 24+ Companies !!");
            builder.Prompts.choice(
                session,
                'But before that please let me know what type of plan you are looking for?', ["Car", "Bike", "Health", "Term", "Child", "Investment", "Pension"],
                options
            );
        }
        else {
            switch (cases) {
                //the below cases 1,2 are for wrong policy option
                case 1:
                    builder.Prompts.choice(
                        session,
                        'Please choose from the below list.', ["Car", "Bike", "Health", "Term", "Child", "Investment", "Pension"],
                        options
                    );
                    break;
                case 2:
                    builder.Prompts.choice(
                        session,
                        'Please choose from the below list.', ["Car", "Bike", "Health", "Term", "Child", "Investment", "Pension"],
                        options
                    );
                    break;
                default:
                    builder.Prompts.choice(
                        session,
                        'Please choose from the below list.', ["Car", "Bike", "Health", "Term", "Child", "Investment", "Pension"],
                        options
                    );
            }
        }
    },
    function(session, results) {
        //set the type of policy the user wants and redirect appropriately
        isFirstTime = false;
        if (results.response) {
            if (availableInsuranceTypes.indexOf(results.response["entity"]) > -1) {
                typeOfInsurance = results.response["entity"];
                session.send("We are glad to help you get a " + typeOfInsurance + ((results.response["index"] < 5) ? " Insurance." : " Policy.") + "\nPlease hold on " + name + " while we connect you to " + generateRandomName() + " who is our " + typeOfInsurance + ((results.response["index"] < 5) ? " Insurance." : " Policy.") + " Expert.\nPlease answer following few questions, so we can quickly get a quote that suits you!");
                if (typeOfInsurance == "Car") {
                    car.beginCarInsurance(session);
                }
                else if (typeOfInsurance == "Bike") {
                    // session.beginDialog('/bikeInsurance');
                    session.send("bike insurance queries");
                }
                else if (typeOfInsurance == "Health") {
                    // session.beginDialog('/healthInsurance');
                    session.send("health insurance queries");
                }
                else if (typeOfInsurance == "Term") {
                    // session.beginDialog('/termInsurance');
                    session.send("term insurance queries");
                }
                else if (typeOfInsurance == "Child") {
                    // session.beginDialog('/childInsurance');
                    session.send("child insurance queries");
                }
                else if (typeOfInsurance == "Investment") {
                    // session.beginDialog('/investmentPolicy');
                    session.send("investment insurance queries");
                }
                else if (typeOfInsurance == "Pension") {
                    // session.beginDialog('/pensionPolicy');
                    session.send("pension insurance queries");
                }
            }
            else {
                cases = 1;
                session.beginDialog('/insurance');
            }
        }
        else {
            cases = 2;
            session.beginDialog('/insurance');
        }
    }
]);

// bot.dialog('/healthInsurance', [
//     function(session) {

//     },
//     function(session, results) {

//     }
// ]);

// bot.dialog('/termInsurance', [
//     function(session) {

//     },
//     function(session, results) {

//     }
// ]);

// bot.dialog('/childInsurance', [
//     function(session) {

//     },
//     function(session, results) {

//     }
// ]);

// bot.dialog('/investmentPolicy', [
//     function(session) {

//     },
//     function(session, results) {

//     }
// ]);

// bot.dialog('/pensionPolicy', [
//     function(session) {

//     },
//     function(session, results) {

//     }
// ]);

function isValid(str) {
    return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
}

function generateRandomName() {
    var randomGender = Math.floor(Math.random() * 2);
    var males = ["Sathish", "Robert", "Dhanish", "Parker", "Zeeshan", "Vinay", "Rathod", "Vijayan", "Aashish", "Bharath", "Ajith", "Nithin", "Ramesh"];
    var females = ["Aarthi", "Aswathy", "Swathy", "Trisha", "Gayathri", "Nivethitha", "Shruthi", "Yamini", "Preethi", "Dharini", "Sindhuja"];
    var randomName;
    if (randomGender == 1) {
        randomName = "Mr." + males[Math.floor(Math.random() * males.length)];
    }
    else {
        randomName = ((Math.random() < 0.5) ? "Mrs." : "Ms.") + females[Math.floor(Math.random() * females.length)];
    }
    return randomName;
}

// bot.dialog('/getPDate', [
//     function (session) {
//     builder.Prompts.time(session, "When did you purchase your car? Please enter your date format as DD-MM-YYYY");
//   },
//     function (session, results) {
//     if (results.response) {
//         carPDate = new Date(results.response["resolution"]["start"]);
//         session.beginDialog('/getCost');
//         }
//     else
//         {
//         session.send('Please prompt valid car model...');
//         session.beginDialog('/getModel');
//         }
//     }
// ]);

// bot.dialog('/getCost', [
//     function (session, args) {
//         builder.Prompts.number(session,'What is the price of your car?', {retryPrompt:"How much you spend on buying a car!"});
//     },
//     function (session, results) {
//         if (results.response) {
//             carCost =  results.response;
//         }
//         session.beginDialog('/getRegNo');
//     }
// ]);

// bot.dialog('/getRegNo', [
//     function (session) {
//         session.send("Please share your vehicle RTO number");
//         session.send("Please find below sample image from which you can find your RTO number");
//         var msg = new builder.Message(session)
//             .attachments([{
//                 contentType: "image/jpeg",
//                 contentUrl: "http://www.team-bhp.com/forum/attachments/indian-car-scene/164039d1248451018t-high-security-registration-plates-hsrp-india-dsc_6975.jpg"
//             }]);
//         session.send(msg);
//         builder.Prompts.number(session,'Your RTO number please...');
//     },
//     function (session, results) {
//         if (results.response) {
//             carRegNo = results.response;
//             session.beginDialog('/getClaim');
//         }
//     }
// ]);