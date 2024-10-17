// utils/updateMailchimpList.js
import axios from 'axios';
import crypto from 'crypto';
import buildResponse from './buildResponse'; // Import buildResponse

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
const addOrUpdateSubscriber = async (customer, email, shippingAddress) => {
    if (!email) {
        throw new Error('Email is missing');
    }

    const subscriberHash = emailToMd5(email);
    const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${subscriberHash}`;

    const subscriberData = {
        email_address: email || null,
        status_if_new: "subscribed", // If the subscriber is new, set the status
        merge_fields: {
            FNAME: customer.first_name || '',
            LNAME: customer.last_name || '',
            STREET1: shippingAddress.address_line_1 || '',
            STREET2: shippingAddress.address_line_2 || '',
            CITY: shippingAddress.city || '',
            STATE: shippingAddress.region || '',
            ZIPCODE: shippingAddress.postal_code || '',
            PHONE: customer.phone || '',
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
        // Log the full error response
        console.error('Full error response:', error.response);
        throw new Error('Failed to process subscriber');
    }

};

// Main function to update Mailchimp list
const updateMailchimpList = async (orderSummary) => {
    try {
        const { customer, shipping_address } = orderSummary;
        const contactEmail = customer.email;

        // If the email is not provided, skip Mailchimp update
        if (!contactEmail || contactEmail.trim() === '') {
            console.log(`Email is missing for order ID ${orderSummary.id}`);
            return buildResponse(400, { message: `Email is missing for order ID ${orderSummary.id}` });
        }

        // Add or update the subscriber in Mailchimp
        await addOrUpdateSubscriber(customer, contactEmail, shipping_address);

        return buildResponse(200, { message: 'Subscriber updated successfully' });
    } catch (error) {
        console.error('Error updating Mailchimp list:', error.message);
        console.error('Order Summary:', JSON.stringify(orderSummary, null, 2)); // Log the order summary for context
        return buildResponse(500, { message: 'Internal Server Error', error: error.message });
    }
};


export default updateMailchimpList;
