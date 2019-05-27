const conf = {
  "Auth": {

    "identityPoolId": "us-east-1:9e414cfe-5e75-4cfe-acea-85899992cfd6",

    "region": "us-east-1",

    "identityPoolRegion": "us-east-1",

    "userPoolId": "us-east-1_f5naA3Cnx",

    "userPoolWebClientId": "258mhpb6n41pp6s3n7v6q24tk1",

    "mandatorySignIn": false,

    "appWebDomain": "smoothflow-dev.auth.us-east-1.amazoncognito.com",

    "authenticationFlowType": "USER_PASSWORD_AUTH"
  },
  "API": {

    "endpoints" : [{
      "name" : "GetAllBots",
      "endpoint" : "https://smoothbotservicesdev.plus.smoothflow.io/DBF/API/1.0.0.0/BotService/Bots/"
    }]

  }
};

export default conf;