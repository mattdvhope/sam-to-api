// functions/utils/validateOrderSummary.js

const validateOrderSummary = (orderSummary) => {
    if (!orderSummary || !orderSummary.customer || !orderSummary.items) {
        console.error('Invalid order summary structure:', orderSummary);
        return false; // Return false if validation fails
    }
    return true; // Return true if validation passes
};

export default validateOrderSummary;
