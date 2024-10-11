// functions/utils/createRequestBody.js
import timestampForOrder from './timestampForOrder'; 

const createRequestBody = (orderSummary, lineItems, shippingLevel) => ({
    "contact_email": orderSummary.customer.email,
    "external_id": `PbOrder-${timestampForOrder()}-${orderSummary.id}`, // Ensure you import timestampForOrder
    "line_items": lineItems,
    "production_delay": 120,
    "shipping_address": {
        "city": orderSummary.shipping_address.city,
        "country_code": orderSummary.shipping_address.country === 'USA' ? 'US' : orderSummary.shipping_address.country,
        "name": `${orderSummary.customer.first_name} ${orderSummary.customer.last_name}`,
        "phone_number": orderSummary.customer.phone,
        "postcode": orderSummary.shipping_address.postal_code,
        "state_code": orderSummary.shipping_address.region,
        "street1": orderSummary.shipping_address.address_line_1
    },
    "shipping_level": shippingLevel
});

export default createRequestBody;
