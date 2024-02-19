import twilio from 'twilio';
import createError from 'http-errors';
export const sendCode = async (code: string, phone: string) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);
  try {
    await client.messages.create({
      body: `Your code is ${code}`,
      from: process.env.TWILIO_NUMBER,
      to: phone,
    });
  } catch (e) {
    throw createError(404, 'Error while sending code');
  }
};
