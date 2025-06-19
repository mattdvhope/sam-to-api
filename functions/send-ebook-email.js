import Mailgun from 'mailgun.js';
import formData from 'form-data'; // ✅ required for Mailgun in Node

// ✅ Proper Mailgun instantiation
const mailgunInstance = new Mailgun(formData);
const mailgun = mailgunInstance.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
  url: 'https://api.mailgun.net', // optional but explicit
});

// ✅ Reusable CORS headers
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://soaw.samcart.com',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Credentials': 'true',
};

export const handler = async (event) => {
  console.log("📥 Function triggered. Raw event:", event);

  // ✅ Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: 'Preflight check successful',
    };
  }

  if (!event.body) {
    console.error("❌ event.body is empty");
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ message: 'No body received' }),
    };
  }

  let parsed;
  try {
    parsed = JSON.parse(event.body);
  } catch (err) {
    console.error("❌ JSON parse error:", err);
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ message: 'Invalid JSON', error: err.message }),
    };
  }

  const email = parsed?.orderSummary?.customer?.email;

  if (!email) {
    console.error("❌ No customer email found in:", parsed);
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ message: 'Missing customer email' }),
    };
  }

  console.log("📧 Email to send:", email);

  const emailData = {
    from: `Matt Malone - Author <info@${process.env.MAILGUN_DOMAIN}>`,
    to: email,
    subject: `How to Start Reading Your Ebook`,
    text: `I hope you enjoy “The Source of All Wealth!” Visit https://www.sourceofallwealth.com/e-book-install-instructions to get instructions on how to open your ebook.`,
    html: `
            <div style="font-family: Georgia, serif; font-size: 16px; color: #333; line-height: 3.5;">
              <p style="margin: 0 0 16px 0;">
                I hope you enjoy <span style="font-weight: 600;">“The Source of All Wealth!”</span>
              </p>
              <p style="margin: 0;">
                <a href="https://www.sourceofallwealth.com/e-book-install-instructions"
                   style="color: #0056b3; text-decoration: underline;">
                  Click here</a> to get instructions on how to open your Ebook.
              </p>
            </div>
          `,
  };

  console.log("📨 Mailgun payload:", emailData);

  try {
    const response = await mailgun.messages.create(process.env.MAILGUN_DOMAIN, emailData);
    console.log("✅ Mailgun response:", response);
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error("🚨 Mailgun error:", error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ message: 'Email failed to send', error: error.message }),
    };
  }
};