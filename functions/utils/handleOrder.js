 // functions/utils/handleOrder.js
import buildResponse from './buildResponse';

const handleOrder = async (event, createPrintJob) => {
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

export default handleOrder;
