const emailjs = require('@emailjs/browser');

exports.handler = async function (event) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
    }

    try {
        const { name, email, message } = JSON.parse(event.body);

        console.log('Received Data:', { name, email, message });

        const templateParams = { name, email, message };
        console.log('Template Params:', templateParams);

        console.log('Service ID:', process.env.EMAILJS_SERVICE_ID);
        console.log('Template ID:', process.env.EMAILJS_TEMPLATE_ID);
        console.log('Public Key:', process.env.EMAILJS_PUBLIC_KEY);

        const response = await emailjs.send(
            process.env.EMAILJS_SERVICE_ID,
            process.env.EMAILJS_TEMPLATE_ID,
            templateParams,
            process.env.EMAILJS_PUBLIC_KEY
        );

        console.log('EmailJS Response:', response);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully!' }),
        };
    } catch (error) {
        console.error('Error in sendEmail function:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send email', details: error.message }),
        };
    }
};
