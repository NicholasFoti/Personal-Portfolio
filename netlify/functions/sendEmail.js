const emailjs = require('@emailjs/browser');

exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
    }

    const { name, email, message } = JSON.parse(event.body);

    const templateParams = {
        name,
        email,
        message,
    };

    try {
        const response = await emailjs.send(
            process.env.EMAILJS_SERVICE_ID,
            process.env.EMAILJS_TEMPLATE_ID,
            templateParams,
            process.env.EMAILJS_PUBLIC_KEY
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully!', response }),
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send email' }),
        };
    }
};