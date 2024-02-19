import twilio from 'twilio';
import createError from 'http-errors';
export const addNumber = async () => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);
  try {
    // Download the helper library from https://www.twilio.com/docs/node/install
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure

    client.validationRequests
      .create({
        friendlyName: 'My Home Phone Number',
        phoneNumber: '+14158675310',
      })
      .then((validation_request) =>
        console.log(validation_request.friendlyName)
      );
  } catch (e) {
    console.log(e);
    throw createError(404, 'Error while sending code');
  }
};
