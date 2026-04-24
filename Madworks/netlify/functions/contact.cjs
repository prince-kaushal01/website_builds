const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ success: false }) };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ success: false, error: 'Invalid request' }) };
  }

  const { name = '', email = '', phone = '', service = '', date = '', message = '' } = data;

  if (!name.trim() || !email.trim()) {
    return { statusCode: 422, headers, body: JSON.stringify({ success: false, error: 'Name and email are required' }) };
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const text = [
    'You have a new enquiry from the Madworks website.',
    '--------------------------------------------',
    `Name    : ${name}`,
    `Email   : ${email}`,
    `Phone   : ${phone}`,
    `Service : ${service}`,
    `Date    : ${date}`,
    '',
    `Message :\n${message}`,
  ].join('\n');

  try {
    await transporter.sendMail({
      from: `"Madworks Website" <${process.env.SMTP_USER}>`,
      to: 'manager@madworks.com',
      replyTo: email,
      subject: `New Enquiry from ${name} — Madworks`,
      text,
    });
    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error('Mail error:', err.message);
    return { statusCode: 500, headers, body: JSON.stringify({ success: false, error: 'Failed to send' }) };
  }
};
