import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, firstName, lastName, address, phone, postalCode } = req.body;

        try {
            // Configure the Nodemailer transporter
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'your-email@gmail.com', // Your email here
                    pass: 'your-email-password', // Your password or app-specific password here
                },
            });

            // Define the email content
            const mailOptions = {
                from: 'your-email@gmail.com', // Your email here
                to: 'itxzubair45@gmail.com',  // The recipient's email
                subject: 'New Customer Order Placed',
                text: `
A new customer has placed an order!

Customer Details:
- Email: ${email}
- First Name: ${firstName}
- Last Name: ${lastName}
- Address: ${address}
- Phone: ${phone}
- Postal Code: ${postalCode}

Please prepare for delivery.
                `,
            };

            // Send the email
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Order details emailed successfully!' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Failed to send email.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
