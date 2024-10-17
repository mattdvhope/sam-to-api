// functions/process-webhook.js
import axios from 'axios';
import buildResponse from './utils/buildResponse'; // Import buildResponse
import formData from 'form-data';
import Mailgun from 'mailgun.js';

// Initialize Mailgun with form data
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere',
});

// Define status actions for different order statuses
const statusActions = {
    PRODUCTION_DELAYED: {
        subject: "Your book is on the docket to be printed!",
        body: "Your book will be printed later.",
    },
    PRODUCTION_READY: {
        subject: "Printing of book begins soon!!",
        body: "Your book is about to be printed.",
    },
    IN_PRODUCTION: {
        subject: "Your book is being printed now!!",
        body: "Production is underway.",
    },
    SHIPPED: {
        subject: "Your book has been shipped!!",
        body: "Your book will arrive in a little more than a week.",
    },
};

// Function to send an email
const sendEmail = async (email, subject, body) => {

    console.log("Print Job Status: ", subject);

    try {
        await mg.messages.create(process.env.MAILGUN_DOMAIN, {
            from: `Matt Malone - Author <info@${process.env.MAILGUN_DOMAIN}>`,
            to: [email], // Use the email parameter here
            subject: `${subject}`,
            text: `Print job status: ${body}`, // You can customize the message
            html: `<h1>Print Job Status Update</h1><p>${body}</p>`
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.log("Error sending email:", error);
    }
};

// Main handler for the webhook
exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return buildResponse(405, { message: 'Method Not Allowedddd' });
    }


    try {
        const webhookData = JSON.parse(event.body);
        if (!webhookData.data || !webhookData.data.status) {
            throw new Error('Invalid webhook data');
        }

        const { status: { name }, contact_email } = webhookData.data;

        if (statusActions[name]) {
            const { subject, body } = statusActions[name];
            await sendEmail(contact_email, subject, body);
        }

        return buildResponse(200, { message: 'Webhook processed successfully' });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return buildResponse(500, { message: 'Internal Server Error' });
    }
};
