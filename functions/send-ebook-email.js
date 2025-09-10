// /netlify/functions/send-ebook-email.js
import { CORS_HEADERS, handlePreflight, parseJson, ok, bad, oops, sendMail } from './_shared/email-core.js';

export const handler = async (event) => {
  console.log('📥 send-ebook-email triggered');
  const pre = handlePreflight(event);
  if (pre) return pre;

  let body;
  try { body = parseJson(event); }
  catch (err) { console.error('❌ JSON parse error', err); return bad('Invalid JSON'); }

  const email = body?.orderSummary?.customer?.email;
  if (!email) return bad('Missing customer email');

  const subject = 'Your eBook: Download & Setup Instructions';
  const text = `Thanks for your order of "The Source of All Wealth" (eBook).
    Setup help for iPhone/iPad, Android, and desktop:
    https://www.sourceofallwealth.com/e-book-install-instructions

    120-Day Money-Back Guarantee: reply to this email within 120 days for a full refund.
    Support: info@sourceofallwealth.com`;

  const html = `
    <div style="font-family: Georgia, 'Times New Roman', serif; font-size:16px; color:#333; line-height:1.6;">
      <p style="margin:0 0 16px 0;">
        Thank you for your order of <strong>“The Source of All Wealth” (eBook)</strong>.
      </p>

      <p style="margin:0 0 16px 0;">
        <a href="https://www.sourceofallwealth.com/e-book-install-instructions"
           style="color:#0056b3; text-decoration:underline;">Click here</a>
        for step-by-step setup on iPhone/iPad, Android, and desktop.
      </p>

      <ul style="margin:0 0 16px 20px; padding:0;">
        <li><strong>iPhone/iPad:</strong> Tap the EPUB, then choose <em>Open in Books</em> (Apple Books).</li>
        <li><strong>Android:</strong> Open with <em>Google Play Books</em> or a free reader like <em>ReadEra</em> or <em>Lithium</em>.</li>
        <li><strong>Desktop:</strong> Open in <em>Apple Books</em> (macOS) or <em>Calibre</em> (Windows/macOS).</li>
      </ul>

      <p style="margin:0 0 16px 0;">
        Need a hand? Just reply to this email—happy to help.
      </p>

      <p style="margin:0 0 16px 0; font-size:14px; color:#555;">
        <strong>120-Day Money-Back Guarantee:</strong> If the eBook isn’t for you, reply within 120 days for a full refund.
      </p>

      <hr style="border:none; border-top:1px solid #ddd; margin:16px 0;">

      <p style="margin:0; font-size:14px; color:#555;">
        Order support: <a href="mailto:info@sourceofallwealth.com" style="color:#0056b3; text-decoration:underline;">info@sourceofallwealth.com</a>
      </p>
    </div>`.trim();

  try {
    await sendMail(email, subject, html, text);
    return ok({ message: 'eBook email sent' });
  } catch (err) {
    console.error('🚨 Mailgun error:', err);
    return oops('Email failed to send', err);
  }
};
