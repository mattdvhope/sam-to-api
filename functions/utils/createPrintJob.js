// functions/utils/createPrintJob.js
import axios from 'axios';
import { getApiConfig } from './apiConfig';
import showErrors from './showErrors';
import validateOrderSummary from './validateOrderSummary';
import createRequestBody from './createRequestBody';
import createLineItems from './createLineItems';

const createPrintJob = async (orderSummary, books, shippingLevel) => {
    if (!validateOrderSummary(orderSummary)) return;

    const { apiBaseURL, myHeaders } = await getApiConfig();

    const lineItems = createLineItems(orderSummary, books);
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
