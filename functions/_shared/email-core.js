// /netlify/functions/_shared/email-core.js
import Mailgun from 'mailgun.js';
import formData from 'form-data';

export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://soaw.samcart.com',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Credentials': 'true',
};

export const mailgun = new Mailgun(formData).client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
  url: 'https://api.mailgun.net',
});

export const handlePreflight = (event) =>
  event.httpMethod === 'OPTIONS'
    ? { statusCode: 200, headers: CORS_HEADERS, body: 'Preflight OK' }
    : null;

export const parseJson = (event) => JSON.parse(event.body || '{}');

export const ok = (payload) => ({
  statusCode: 200,
  headers: CORS_HEADERS,
  body: JSON.stringify(payload),
});

export const bad = (message, extra = {}) => ({
  statusCode: 400,
  headers: CORS_HEADERS,
  body: JSON.stringify({ message, ...extra }),
});

export const oops = (message, error) => ({
  statusCode: 500,
  headers: CORS_HEADERS,
  body: JSON.stringify({ message, error: error?.message }),
});

export const sendMail = (to, subject, html, text) =>
  mailgun.messages.create(process.env.MAILGUN_DOMAIN, {
    from: `Matt Malone - Author <info@${process.env.MAILGUN_DOMAIN}>`,
    to,
    subject,
    html,
    text,
  });
