// functions/utils/timestampForOrder.js

const timestampForOrder = () => {
    const now = new Date();
    return now.toISOString().replace(/[-:.]/g, '');
};

export default timestampForOrder;
