import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, organisation, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST,
      port:   Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from:    `"${process.env.NEXT_PUBLIC_PROJECT_NAME} Website" <${process.env.SMTP_USER}>`,
      to:      process.env.CONTACT_EMAIL,
      replyTo: `"${name}" <${email}>`,
      subject: `[Contact] ${subject ?? "New message from website"}`,
      text: `
Name:         ${name}
Email:        ${email}
Organisation: ${organisation ?? "—"}
Subject:      ${subject ?? "—"}

Message:
${message}
      `.trim(),
      html: `
<div style="font-family:sans-serif;max-width:600px">
  <h2 style="color:#0f2144">New contact form submission</h2>
  <table style="border-collapse:collapse;width:100%">
    <tr><td style="padding:6px 12px;font-weight:bold;color:#6b7280">Name</td><td style="padding:6px 12px">${name}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;color:#6b7280">Email</td><td style="padding:6px 12px"><a href="mailto:${email}">${email}</a></td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;color:#6b7280">Organisation</td><td style="padding:6px 12px">${organisation ?? "—"}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;color:#6b7280">Subject</td><td style="padding:6px 12px">${subject ?? "—"}</td></tr>
  </table>
  <div style="margin-top:16px;padding:16px;background:#f8f5ef;border-radius:6px">
    <strong style="color:#6b7280">Message:</strong>
    <p style="margin-top:8px;white-space:pre-wrap">${message}</p>
  </div>
</div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact] Email send error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
