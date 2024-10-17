// functions/process-webhook.js
import axios from 'axios';
import crypto from 'crypto';
import buildResponse from './utils/buildResponse'; // Import buildResponse

// Mailchimp API information
const MAIL_SVC_API_KEY = process.env.MC_SM_LL_WEBH_KEY;
const SERVER_PREFIX = process.env.MC_K_SUFFIX;
const AUDIENCE_ID = process.env.MC_AUD_ID;
const USER_NAME = process.env.MC_USERNAME;

// Helper function to get the base64-encoded Authorization header
const getAuthHeader = () => {
    const authString = `${USER_NAME}:${MAIL_SVC_API_KEY}`;
    return 'Basic ' + Buffer.from(authString).toString('base64');
};

// Helper function to hash email using MD5
const emailToMd5 = (email) => {
    return crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
};

// Function to add or update a subscriber in the Mailchimp audience
const addOrUpdateSubscriber = async (email, shippingAddress) => {
    if (!email) {
        throw new Error('Email is missing');
    }

    const subscriberHash = emailToMd5(email);
    const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${subscriberHash}`;

    const subscriberData = {
        email_address: email || null,
        status_if_new: "subscribed", // If the subscriber is new, set the status
        merge_fields: {
            FNAME: shippingAddress.name.split(' ')[0] || '', // First name
            LNAME: shippingAddress.name.split(' ')[1] || '', // Last name
            STREET1: shippingAddress.street1 || '',
            STREET2: shippingAddress.street2 || '',
            CITY: shippingAddress.city || '',
            STATE: shippingAddress.state_code || '',
            ZIPCODE: shippingAddress.postcode || '',
            PHONE: shippingAddress.phone_number || '',
        },
    };

    try {
        // Attempt to update the subscriber's information
        await axios.put(url, subscriberData, {
            headers: {
                'Authorization': getAuthHeader(),
                'Content-Type': 'application/json',
            },
        });
        console.log(`Subscriber ${email} added/updated successfully.`);
    } catch (error) {
        console.error(`Failed to add/update subscriber ${email}:`, error.response?.data || error.message);
        throw new Error('Failed to process subscriber');
    }
};

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

        const { contact_email, shipping_address } = webhookData.data;

        // If the email is not provided, skip Mailchimp update
        if (!contact_email || contact_email.trim() === '') {
            return buildResponse(400, { message: 'Email is missing' });
        }

        // Add or update the subscriber in Mailchimp
        await addOrUpdateSubscriber(contact_email, shipping_address);

        return buildResponse(200, { message: 'Webhook processed successfully' });
    } catch (error) {
        console.error('Error processing webhook:', error.message);
        return buildResponse(500, { message: 'Internal Server Error', error: error.message });
    }
};
