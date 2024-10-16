// functions/process-webhook.js
import axios from 'axios';
import crypto from 'crypto';
import buildResponse from './utils/buildResponse';

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

// Function to add a new subscriber to the Mailchimp audience, or skip if they already exist
const addSubscriberToAudience = async (email, shippingAddress) => {
    const subscriberHash = emailToMd5(email);
    const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${subscriberHash}`;

    // Prepare the data for adding a new subscriber
    const subscriberData = {
        email_address: email,
        status: "subscribed", // Set to pending for double opt-in
        merge_fields: {
            FNAME: shippingAddress.name.split(' ')[0] || '', // First name
            LNAME: shippingAddress.name.split(' ')[1] || '', // Last name
            ADDRESS: {
                addr1: shippingAddress.street1 || '',        // Primary street address
                city: shippingAddress.city || '',            // City
                state: shippingAddress.state_code || '',     // State
                zip: shippingAddress.postcode || '',         // ZIP Code
                phone: shippingAddress.phone_number || '',
            },
        },
    };

    try {
        // First, check if the subscriber already exists in the audience.
        const response = await axios.get(url, {
            headers: {
                'Authorization': getAuthHeader(),
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            console.log(`${email} is already in the audience.`);
            return; // Exit the function if the subscriber is already in the audience
        }

    } catch (error) {
        console.error('Error checking subscriber:', error.message);
    } 

};

// Function to send email via Mailchimp
const sendMailchimpEmail = async (email, subject, body) => {
    const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/campaigns`;

    const campaignData = {
        type: "regular",
        recipients: {
            list_id: AUDIENCE_ID,
        },
        settings: {
            subject_line: subject,
            title: subject,
            from_name: "Your Company",
            reply_to: "your-email@gmail.com",
        },
    };

    try {
        const campaignResponse = await axios.post(url, campaignData, {
            headers: {
                'Authorization': getAuthHeader(),
                'Content-Type': 'application/json',
            },
        });

        const campaignId = campaignResponse.data.id;

        const contentUrl = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/campaigns/${campaignId}/content`;

        await axios.put(contentUrl, {
            html: `<p>${body}</p>`,
        }, {
            headers: {
                'Authorization': getAuthHeader(),
                'Content-Type': 'application/json',
            },
        });

        const sendUrl = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/campaigns/${campaignId}/actions/send`;

        await axios.post(sendUrl, {}, {
            headers: {
                'Authorization': getAuthHeader(),
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error sending email via Mailchimp:', error.message);
        throw new Error('Failed to send email');
    }
};

// Main handler for the webhook
exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return buildResponse(405, { message: 'Method Not Allowed' });
    }

    try {
        const webhookData = JSON.parse(event.body);
        // console.log('Received webhook data:', webhookData);

        if (!webhookData.data || !webhookData.data.status) {
            throw new Error('Invalid webhook data');
        }

        const { status: { name }, contact_email, shipping_address } = webhookData.data;

        // console.log('Shipping Address:', shipping_address); // Log the shipping address for debugging

        if (statusActions[name]) {
            const { subject, body } = statusActions[name];

            // Add the buyer to the audience with shipping details
            await addSubscriberToAudience(contact_email, shipping_address);

            // Send email via Mailchimp
            // await sendMailchimpEmail(contact_email, subject, body); // Uncommented to enable sending email
        }

        return buildResponse(200, { message: 'Webhook processed successfully' });
    } catch (error) {
        console.error('Error processing webhook:', error.message);
        return buildResponse(500, { message: 'Internal Server Error', error: error.message });
    }
};
