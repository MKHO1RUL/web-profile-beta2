"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  if (!name || !email || !subject || !message) {
    return { success: false, message: "All fields are required." }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Default Resend sender
      to: ["irulkhoirul414@gmail.com"],
      subject: `New Mission Report: ${subject} from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #FF8C00, #4A90E2); padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0; text-align: center;">🥷 New Message from Your Portfolio!</h2>
          </div>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; border: 1px solid #ddd;">
            <p><strong>🥷 Ninja Name:</strong> ${name}</p>
            <p><strong>📧 Messenger Bird Address:</strong> ${email}</p>
            <p><strong>📋 Mission Type:</strong> ${subject}</p>
            <p><strong>📜 Mission Details:</strong></p>
            <div style="border: 1px solid #ddd; padding: 15px; border-radius: 5px; background-color: white; margin: 10px 0;">
              ${message.replace(/\n/g, "<br>")}
            </div>
            <p style="color: #666; font-size: 0.9em; text-align: center; margin-top: 20px;">
              This message was sent from your Naruto-themed portfolio website.
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return { success: false, message: "Failed to send message. Please try again later." }
    }

    return { success: true, message: "Your messenger bird has successfully delivered the message!" }
  } catch (error) {
    console.error("Failed to send email:", error)
    return { success: false, message: "Failed to send message. Please try again later." }
  }
}
