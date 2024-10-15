// functions/process-webhook.js
import buildResponse from './utils/buildResponse';

const statusActions = {
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
        body: "Shipping details are being processed.",
    },
};

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return buildResponse(405, { message: 'Method Not Allowed' });
    }

    try {
        const webhookData = JSON.parse(event.body);
        console.log('Received webhook data:', webhookData);

        const { status: { name }, contact_email } = webhookData.data;

        if (statusActions[name]) {
            const { subject, body } = statusActions[name];
            console.log(`EMAIL to ${contact_email}...`);
            console.log(`Subject: ${subject}`);
            console.log(`Body: ${body}`);
        }

        return buildResponse(200, { message: 'Webhook processed successfully' });
    } catch (error) {
        console.error('Error processing webhook:', error.message);
        return buildResponse(500, { message: 'Internal Server Error', error: error.message });
    }
};
