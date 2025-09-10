// /netlify/functions/send-audiobook-email.js
import { CORS_HEADERS, handlePreflight, parseJson, ok, bad, oops, sendMail } from './_shared/email-core.js';

export const handler = async (event) => {
  console.log('📥 send-audiobook-email triggered');
  const pre = handlePreflight(event);
  if (pre) return pre;

  let body;
  try { body = parseJson(event); }
  catch (err) { console.error('❌ JSON parse error', err); return bad('Invalid JSON'); }

  const email = body?.orderSummary?.customer?.email;
  if (!email) return bad('Missing customer email');

  const subject = 'Your Audiobook: Download & Listening Setup';
  const audioZipUrl = 'https://soaw-audio-book.s3.us-east-1.amazonaws.com/premium/SourceOfAllWealth.zip';

  const text = `Thanks for your order of "The Source of All Wealth" (Audiobook).

		Your download is available in your SamCart receipt and on the order confirmation page (no separate link needed).

		After downloading:
		- iPhone/iPad: Unzip in the Files app, then import into BookPlayer (free).
		- Android: Unzip, then open the folder in Voice Audiobook Player (free) or your preferred player.
		- Desktop: Unzip and play in Apple Music, VLC, or your preferred player.

		Step-by-step setup (with screenshots):
		https://www.sourceofallwealth.com/e-book-install-instructions

		120-Day Money-Back Guarantee: reply within 120 days for a full refund.
		Support: info@sourceofallwealth.com`;

  const html = `
		<div style="font-family: Georgia, 'Times New Roman', serif; font-size:16px; color:#333; line-height:1.6;">
		  <p style="margin:0 0 16px 0;">
		    Thank you for your order of <strong>“The Source of All Wealth” (Audiobook)</strong>.
		  </p>

		  <p style="margin:0 0 16px 0;">
		    🎧 <strong>Your Audiobook:</strong><br>
		    The download is available in your <strong>SamCart order confirmation page</strong>.
		    No separate link is required.
		  </p>

		  <p style="margin:0 0 16px 0;">
		    Go here to access step-by-step guides (with screenshots): 
		    <a href="https://www.sourceofallwealth.com/e-book-install-instructions" style="color:#0056b3; text-decoration:underline;">tap here</a>.
		  </p>

		  <p style="margin:0 0 16px 0; font-size:14px; color:#555;">
		    <strong>120-Day Money-Back Guarantee:</strong> If the audiobook isn’t for you, reply within 120 days for a full refund.
		  </p>

		  <hr style="border:none; border-top:1px solid #ddd; margin:16px 0;">

		  <p style="margin:0; font-size:14px; color:#555;">
		    Order support: <a href="mailto:info@sourceofallwealth.com" style="color:#0056b3; text-decoration:underline;">info@sourceofallwealth.com</a>
		  </p>
		</div>`.trim();


  try {
    await sendMail(email, subject, html, text);
    return ok({ message: 'Audiobook email sent' });
  } catch (err) {
    console.error('🚨 Mailgun error:', err);
    return oops('Email failed to send', err);
  }
};
