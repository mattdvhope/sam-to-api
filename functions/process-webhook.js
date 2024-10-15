// functions/process-webhook.js
import buildResponse from './utils/buildResponse';

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return buildResponse(405, { message: 'Method Not Allowed' }); // Handle non-POST requests
    }

    try {
        // Parse the incoming webhook data
        const webhookData = JSON.parse(event.body);
        console.log('Received webhook data:', webhookData);

        // Process the webhook data as needed
        // For example, handle different event types:
        if (webhookData.topic === "PRINT_JOB_STATUS_CHANGED") {
            // Handle the PRINT_JOB_STATUS_CHANGED event
            console.log('Handling PRINT_JOB_STATUS_CHANGED event...');
        }

        if (webhookData.data.status.name === "IN_PRODUCTION") {
            console.log("EMAIL!!! > Your book is being printed now!!")
        }

        if (webhookData.data.status.name === "SHIPPED") {
            console.log("EMAIL!!! > Your book has been shipped!!")
        }

        // Return a success response
        return buildResponse(200, { message: 'Webhook processed successfully' });
    } catch (error) {
        console.error('Error processing webhook:', error.message);
        return buildResponse(500, { message: 'Internal Server Error', error: error.message });
    }
};
