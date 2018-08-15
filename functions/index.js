// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
}
    
// Uncomment and edit to make your own intent handler
// uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
// below to get this function to be run when a Dialogflow intent is matched

  function testint(agent) {
     
     var d = agent.parameters.id;
     if (d === 2){
      
    agent.add(`Here's your status for ${d} :`);
    agent.add(new Card({
        title: `BCT A Routine`,
        imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
        text: ``,
        buttonText: 'Open In Browser',
        buttonUrl: 'https://images.google.com/'
    })
);
agent.add(new Suggestion(`Thank You`));
agent.add(new Suggestion(`Go Back`));
 }  
}


function classopen (agent) {
if (currentlyOpen()) {
  agent.add(`There won't be classes tomorrow `);
} else {
  agent.add(`There will be classes tomorrow`);
}
}

function currentlyOpen () {
var currentDateTime = new Date(); // current time
var hours = currentDateTime.getHours();
var mins = currentDateTime.getMinutes();
var day = currentDateTime.getDay();

return day === 6 ||
      day === 5 ;
}

function ircustom(agent) {
  // var d = new Date().getDay();
   var d = agent.parameters.wday;
  switch(d) {
      case "Monday":
          agent.add(`Here's your routine for ${d} :`);
  agent.add(new Card({
      title: `BCT A Routine - ${d}`,
      imageUrl: 'http://testcreative.co.uk/wp-content/uploads/2017/10/Test-Logo-Small-Black-transparent-1.png',
      text: ``,
      buttonText: 'Open In Browser',
      buttonUrl: 'https://images.google.com/'
    })
  );

    break;
    
    case "Tuesday":
         agent.add(`Here's your routine for ${d} :`);
    agent.add(new Card({
        title: `BCT A Routine - ${d}`,
        imageUrl: 'http://testcreative.co.uk/wp-content/uploads/2017/10/Test-Logo-Small-Black-transparent-1.png',
        text: ``,
        buttonText: 'Open In Browser',
        buttonUrl: 'https://images.google.com/'
      })
    );
   
    break;
            
    case "Wednesday":
        agent.add(`Here's your routine for ${d} :`);
        agent.add(new Card({
        title: `BCT A Routine - ${d}`,
        imageUrl: 'http://testcreative.co.uk/wp-content/uploads/2017/10/Test-Logo-Small-Black-transparent-1.png',
        text: ``,
        buttonText: 'Open In Browser',
        buttonUrl: 'https://images.google.com/'
      })
    );
   
    break;
    
     case "Thursday":
         agent.add(`Here's your routine for ${d} :`);
    agent.add(new Card({
        title: `BCT A Routine - ${d}`,
        imageUrl: 'http://testcreative.co.uk/wp-content/uploads/2017/10/Test-Logo-Small-Black-transparent-1.png',
        text: ``,
        buttonText: 'Open In Browser',
        buttonUrl: 'https://images.google.com/'
      })
    );
    break;
    
    case "Friday":
        agent.add(`Here's your routine for ${d} :`);
   agent.add(new Card({
       title: `BCT A Routine - ${d}`,
       imageUrl: 'http://testcreative.co.uk/wp-content/uploads/2017/10/Test-Logo-Small-Black-transparent-1.png',
       text: ``,
       buttonText: 'Open In Browser',
       buttonUrl: 'https://images.google.com/'
     })
   );

   break;
   }
  
     
}

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

//test sheet
//

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('test', testint);
  intentMap.set('class-open', classopen);
  intentMap.set('info-routine - custom', ircustom);
  // intentMap.set('intent name' function name)
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
}); 















// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
