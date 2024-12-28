// functions/utils/createHtftiwPrintJob.js
import createPrintJob from './createPrintJob';

const createHtftiwPrintJob = async (orderSummary) => {
    const books = [];
    books.push({
        cover: process.env.SAM_HTFTIW_CVR,
        interior: process.env.SAM_HTFTIW_INT,
        podPackageId: process.env.SAM_HTFTIW_PPI,
    });

    const shippingLevel = "MAIL";

    return createPrintJob(orderSummary, books, shippingLevel);
};

export default createHtftiwPrintJob;
