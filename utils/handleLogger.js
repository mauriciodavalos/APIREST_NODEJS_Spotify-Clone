const slackWebhook = require("@slack/webhook");
const webhook = new slackWebhook.IncomingWebhook(process.env.SLACK_WEBHOOK);

const loggerStream = {
    write: message => {
        webhook.send({     ///AQUI EN ESTE PUNTO PUEDES CONECTAR A DIFERENTES CANALES (MAIL; DISCORD!!)
            text: message
        })
        console.log("capturando el log",message)
      // do anything - emit to websocket? send message somewhere? log to cloud?
    },
  };

  module.exports = loggerStream;