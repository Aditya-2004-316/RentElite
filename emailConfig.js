import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create email transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Email templates (renamed to match your import)
const emailTemplates = {
    passwordReset: (resetUrl) => ({
        subject: "Reset Your RentElite Password",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <img src="https://i.imgur.com/YourLogoUrl.png" alt="RentElite Logo" style="max-width: 150px;">
                    <h1 style="color: #0fa16d; margin-top: 10px;">RentElite</h1>
                </div>
                
                <h2 style="color: #333;">Password Reset Request</h2>
                <p>You requested a password reset for your RentElite account.</p>
                <p>Click the button below to reset your password:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetUrl}" 
                       style="background-color: #0fa16d; color: white; padding: 12px 24px; 
                              text-decoration: none; border-radius: 5px; display: inline-block;">
                        Reset Password
                    </a>
                </div>
                
                <p>This link will expire in 1 hour.</p>
                <p>If you didn't request this reset, please ignore this email or contact our support team.</p>
                
                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eaeaea; text-align: center; color: #666; font-size: 12px;">
                    <p>© ${new Date().getFullYear()} RentElite. All rights reserved.</p>
                    <p>This is an automated email. Please do not reply.</p>
                </div>
            </div>
        `,
    }),
};

// For production, use a transactional email service
const productionTransporter = nodemailer.createTransport({
    // Example for SendGrid
    service: "SendGrid",
    auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_API_KEY,
    },
});

// Keep this for backward compatibility
const emailConfig = {
    from: "noreply@rentelite.com",
    supportEmail: "support@rentelite.com",
    templates: emailTemplates,
};

export { productionTransporter, transporter, emailConfig, emailTemplates };
