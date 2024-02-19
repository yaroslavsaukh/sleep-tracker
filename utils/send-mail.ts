import createError from 'http-errors';
import nodemailer from 'nodemailer';

interface MailOption {
  subject: string;
  to: string[];
  text: string;
}

export const sendMail = async ({ subject, to, text }: MailOption) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_MAIL,
        pass: process.env.MAIL_API_KEY,
      },
    });

    const recipients = to.join(', ');

    const result = await transporter.sendMail({
      from: {
        name: 'Sleep Tracker',
        address: `${process.env.MAIL_MAIL}`,
      },
      to: recipients,
      subject,
      text,
    });

    return result;
  } catch (e) {
    console.log(e);
    throw createError(500, 'Error while sending email');
  }
};
