import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

admin.initializeApp();

// ✅ Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "umarsarfraz51@gmail.com",             // ✅ Your Gmail address
    pass: "ykqexxqlpomyfric",          // ✅ App Password from Gmail
  },
});

/**
 * 📩 Contact Form Email + Auto-reply
 */
export const sendContactEmail = onDocumentCreated("contacts/{contactId}", async (event) => {
  const data = event.data?.data();
  if (!data) {
    logger.error("No contact data found.");
    return;
  }

  // ✅ Send to admin
  await transporter.sendMail({
    from: "umarsarfraz51@gmail.com",
    to: "umarsarfraz51@gmail.com",
    subject: "📩 New Contact Form Submission",
    text: `
Name: ${data.name}
Email: ${data.email}
Message: ${data.message}
    `,
  });

  // 🔁 Auto-reply to user
  if (data.email) {
    await transporter.sendMail({
      from: "umarsarfraz51@gmail.com",
      to: data.email,
      subject: "✅ We Received Your Message",
      text: `Hi ${data.name || "there"},\n\nThank you for contacting us. We’ve received your message and will get back to you shortly.\n\nBest,\nSourcing Agent Team`,
    });
  }

  logger.info("✅ Contact email and auto-reply sent.");
});

/**
 * 📦 Sourcing Request Email + Auto-reply
 */
export const sendSourcingEmail = onDocumentCreated("sourcingRequests/{requestId}", async (event) => {
  const data = event.data?.data();
  if (!data) {
    logger.error("No sourcing request data found.");
    return;
  }

  // ✅ Send to admin
  await transporter.sendMail({
    from: "umarsarfraz51@gmail.com",
    to: "umarsarfraz51@gmail.com",
    subject: "📦 New Sourcing Request Received",
    text: `
Product: ${data.product}
Quantity: ${data.quantity}
Target Price: ${data.price}
Destination: ${data.destination}
Description: ${data.description}

Submitted by:
Name: ${data.name || "N/A"}
Email: ${data.email || "N/A"}
    `,
  });

  // 🔁 Auto-reply to user
  if (data.email) {
    await transporter.sendMail({
      from: "umarsarfraz51@gmail.com",
      to: data.email,
      subject: "✅ Your Sourcing Request Was Received",
      text: `Hi ${data.name || "there"},\n\nThanks for submitting your sourcing request. Our team will review it and get in touch with you soon.\n\nBest,\nSourcing Agent Team`,
    });
  }

  logger.info("✅ Sourcing email and auto-reply sent.");
});
