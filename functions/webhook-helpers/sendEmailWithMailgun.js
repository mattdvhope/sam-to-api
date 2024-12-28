import formData from 'form-data';
import Mailgun from 'mailgun.js';

// Initialize Mailgun with form data
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere',
});

// Function to send an email.
const sendEmailWithMailgun = async (email, subject, body) => {

    console.log("Print Job Status: ", subject);

    try {
        await mg.messages.create(process.env.MAILGUN_DOMAIN, {
            from: `Matt Malone - Author <info@${process.env.MAILGUN_DOMAIN}>`,
            to: [email],
            subject: `${subject}`,
            text: body, // Plain text fallback
            html: body // Send the styled HTML email
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.log("Error sending email:", error);
    }
};

export default sendEmailWithMailgun;
