const jwt = require('jsonwebtoken');
const https = require('https');
const agent = new https.Agent({keepAlive: true});

// Configure these before uploading
const extensionClientID = "";
const extensionSecret = "";
const channelID = "";

/**
 * HTTP Cloud Function.
 * This function is exported by index.js, and is executed when
 * you make an HTTP request to the deployed function's endpoint.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.helloPOST = (req, res) => {
  sendData(req.body);
};

sendData = data => {
  // We need to decode the base64 encoded secret to use it to sign the JWT
  const decodedSecret = Buffer.from(extensionSecret, 'base64');

  // Create a minimally viable JWT
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + 60 * 15, // Expire the JWT 15 minutes from now
    role: "broadcaster",
    channel_id: channelID,
    user_id: channelID,
    opaque_user_id: "U" + channelID
  }, decodedSecret);

  // Make a request to the json store with the id track_info
  const postRequest = https.request({
    host: "sandbox.api.muxy.io",
    path: "/v1/e/json_store?id=track_info",
    protocol: "https:",
    method: "POST",
    agent: agent,
    headers: {
      'Authorization': `${extensionClientID} ${token}`
    }
  }, resp => {
    console.log(resp.statusCode);
    resp.on("data", function(chunk) {
      console.log("BODY: " + chunk);
    });
  });

  // Write the data we got from IFTTT into the json store request
  postRequest.write(JSON.stringify({
    trackInfo: data
  }));
  postRequest.end();
};
