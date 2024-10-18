// functions/process-webhook.js

import axios from 'axios';
import buildResponse from './utils/buildResponse';
import { statusActions } from './webhook-helpers/statusActions';
import sendEmailWithMailgun from './webhook-helpers/sendEmailWithMailgun';

// Main handler for the webhook 
exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return buildResponse(405, { message: 'Method Not Allowed' });
    }

    try {
        const webhookData = JSON.parse(event.body);
        if (!webhookData.data || !webhookData.data.status) {
            throw new Error('Invalid webhook data');
        }

        const { status: { name }, contact_email } = webhookData.data;

        if (statusActions[name]) {
            const { subject, body } = statusActions[name]; // Destructure to get body directly
            
            console.log(body);

            // Send email using Mailgun
            await sendEmailWithMailgun(contact_email, subject, body); // Use body directly
        }

        return buildResponse(200, { message: 'Webhook processed successfully' });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return buildResponse(500, { message: 'Internal Server Error' });
    }
};
