// functions/utils/handleOrder.js
import buildResponse from './buildResponse';
import getListOfWebhooks from './getListOfWebhooks';

const handleOrder = async (event, createPrintJob) => {
    if (event.httpMethod === 'OPTIONS') {
        return buildResponse(204, {});
    }

    try {
        const parsedBody = JSON.parse(event.body);
        const orderSummary = parsedBody.orderSummary;

        const existingWebhooks = await getListOfWebhooks();

        console.log(existingWebhooks);


        // You will add if-else logic here later

        await createPrintJob(orderSummary);

        return buildResponse(200, { message: 'Order processed successfully', orderId: orderSummary.id });
    } catch (error) {
        return buildResponse(500, { message: 'Internal Server Error', error: error.message });
    }
};

export default handleOrder;
