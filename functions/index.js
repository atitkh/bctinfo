// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

// initialise DB connection
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'ws://atitkharel-201017.firebaseio.com/', //from firebase database
});
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to BCT Info!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
}
    


  function testint(agent) {   //just a test function created to test parameter value comparison
     
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


function classopen (agent) {  //funtion to notify about tomorrow's class
if (currentlyOpen()) {
  agent.add(`There won't be classes tomorrow `);
} else {
  agent.add(`There will be classes tomorrow`);
}
}

function currentlyOpen () {   // reutrn day as friday or saturday (5 or 6)
var currentDateTime = new Date(); // current time
var hours = currentDateTime.getHours();
var mins = currentDateTime.getMinutes();
var day = currentDateTime.getDay();

return day === 6 ||
      day === 5 ;
}

function ircustom(agent) {
  // var d = new Date().getDay();
  var mclass = agent.parameters.mclass; //main class selected
  var msec = agent.parameters.msection; //main section selected
  var opt = agent.parameters.option; // options - routine or assignments
  if(opt === "routine" && mclass === "BCT" && msec === "A")
  {
    bctaroutine ();  //function to print BCT A Routine
  }
  
  else {
    agent.add('Sorry, this function is only available for BCT A at the moment.'); 
  }
  
}

function iassign(agent) // Function for assignment
{
  var mclass = agent.parameters.mclass; //main class
  var msec = agent.parameters.msection; //main section
  var assign = agent.parameters.assign; //assignment
  if( assign === "assignments" && mclass === "BCT" && msec === "A")
  {
    return admin.database().ref('assignmentInfo').transaction((assignmentInfo) => {
      if(assignmentInfo !== null) {
        let currentAssignment = assignmentInfo.assignBCTA;
        agent.add(currentAssignment);
      }
      return assignmentInfo;
    });
   // agent.add('you chose assignments');
  }
  else {
    agent.add('Sorry, this function is only available for BCT A at the moment.'); 
  }
}

function bctaroutine() // Routine of BCT A
{
  var d = agent.parameters.wday; // week day selected
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

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('test', testint);
  intentMap.set('class-open', classopen);
  intentMap.set('info-routine - custom', ircustom);
  intentMap.set('info-assignments', iassign);
 // intentMap.set('Info-class', ClassSec);
  // intentMap.set('intent name', function name)  

  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
}); 






