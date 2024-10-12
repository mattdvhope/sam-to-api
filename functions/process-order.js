// app/functions/process-order.js
import createPrintJob from './utils/createPrintJob';
import buildResponse from './utils/buildResponse'; // Import the buildResponse function

exports.handler = async (event) => {
    if (event.httpMethod === 'OPTIONS') {
        return buildResponse(204, {}); // No body needed for OPTIONS
    }

    try {
        const parsedBody = JSON.parse(event.body);
        const orderSummary = parsedBody.orderSummary;

        await createPrintJob(orderSummary);

        return buildResponse(200, { message: 'Order processed successfully', orderId: orderSummary.id });
    } catch (error) {
        return buildResponse(500, { message: 'Internal Server Error', error: error.message });
    }
};