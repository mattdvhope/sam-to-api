// functions/utils/createPrintJob.js
import axios from 'axios';
import { getApiConfig } from './apiConfig';
import showErrors from './showErrors';

// Function to generate dynamic timestamp for order external_id
const timestampForOrder = () => {
    const now = new Date();
    return now.toISOString().replace(/[-:.]/g, '');
};

const createPrintJob = async (orderSummary) => {
    if (!orderSummary || !orderSummary.customer || !orderSummary.items) {
        console.error('Invalid order summary structure:', orderSummary);
        return; // Exit if orderSummary is invalid
    }

    const { apiBaseURL, myHeaders } = await getApiConfig();

    // Assuming orderSummary.items is an array of items, you should map over them
    const lineItems = orderSummary.items.map(item => ({
        "external_id": `item-${item.product_id}`, // Unique reference for each item
        "printable_normalization": {
            "cover": {
                "source_url": process.env.SAM_PB_CV
            },
            "interior": {
                "source_url": process.env.SAM_PB_IN
            },
            "pod_package_id": process.env.SAM_PB_PPI
        },
        "quantity": item.quantity, // Quantity from orderSummary items
        "title": item.product_name // Product title from orderSummary
    }));

    const requestBody = {
        "contact_email": orderSummary.customer.email, // Email from orderSummary
        "external_id": `PbOrder-${timestampForOrder()}-${orderSummary.id}`, // Dynamic external_id with order ID
        "line_items": lineItems, // Assign mapped line items
        "production_delay": 120,
        "shipping_address": {
            "city": orderSummary.shipping_address.city,
            "country_code": orderSummary.shipping_address.country === 'USA' ? 'US' : orderSummary.shipping_address.country,
            "name": `${orderSummary.customer.first_name} ${orderSummary.customer.last_name}`, // Full name from customer
            "phone_number": orderSummary.customer.phone,
            "postcode": orderSummary.shipping_address.postal_code,
            "state_code": orderSummary.shipping_address.region, // State/region from orderSummary
            "street1": orderSummary.shipping_address.address_line_1
        },
        "shipping_level": "MAIL" // Default or dynamic shipping level can be used here
    };

    try {
        console.log("in try");
        const response = await axios.post(
            `${apiBaseURL}print-jobs/`,
            requestBody,
            { headers: myHeaders }
        );
        console.log("after axios post");
        console.log(response.data); // Successfully got data
    } catch (errorData) {
        console.error('Error Creating Print Job:', showErrors(errorData));
    }
};

export default createPrintJob;
