// functions/utils/createPrintJob.js
import axios from 'axios';
import { getApiConfig } from './apiConfig';
import showErrors from './showErrors';
import validateOrderSummary from './validateOrderSummary';
import createRequestBody from './createRequestBody'; // Import the request body function
import createLineItems from './createLineItems'; // Import the new function.

const createPrintJob = async (orderSummary) => {
    if (!validateOrderSummary(orderSummary)) return;

    const { apiBaseURL, myHeaders } = await getApiConfig();

    const books = [];

    books.push({
        cover: process.env.SAM_HC_CV,
        interior: process.env.SAM_HC_IN,
        podPackageId: process.env.SAM_HC_PPI,
    });

    books.push({
        cover: process.env.SAM_PB_CV,
        interior: process.env.SAM_PB_IN,
        podPackageId: process.env.SAM_PB_PPI,
    });

    const lineItems = createLineItems(orderSummary, books);
    const shippingLevel = "MAIL";
    const requestBody = createRequestBody(orderSummary, lineItems, shippingLevel);

    try {
        const response = await axios.post(
            `${apiBaseURL}print-jobs/`,
            requestBody,
            { headers: myHeaders }
        );
        console.log(response.data); 
    } catch (errorData) {
        console.error('Error Creating Print Job:', showErrors(errorData));
    }
};

export default createPrintJob;
