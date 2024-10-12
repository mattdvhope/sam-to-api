// functions/utils/buildResponse.js

// Define common headers for CORS
const commonHeaders = {
    'Access-Control-Allow-Origin': 'https://soaw.samcart.com',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Credentials': true,
};

// Helper function for building the response
const buildResponse = (statusCode, body) => ({
    statusCode,
    headers: commonHeaders,
    body: JSON.stringify(body),
});

// Export the buildResponse function
export default buildResponse;
