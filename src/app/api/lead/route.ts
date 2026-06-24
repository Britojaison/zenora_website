import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, type } = body;

    // Simple validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required.' },
        { status: 400 }
      );
    }

    const relayFormData = new FormData();
    relayFormData.append("name", name);
    relayFormData.append("email", email);
    relayFormData.append("phone", phone);
    if (message) relayFormData.append("message", message);
    if (type) relayFormData.append("type", type);
    relayFormData.append("_subject", `New Lead Submission: ${type || 'Zenvistas'}`);
    relayFormData.append("_captcha", "false");
    relayFormData.append("_template", "table");

    const targetEmail = process.env.MARKETING_EMAIL || "info@zenvistas.co.in";

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: relayFormData
      });

      const data = await response.json();
      if (!response.ok || data.success !== "true") {
        console.error("FormSubmit relay failed:", data);
        // We log the error but still return success so the user sees a success message if possible
      }
    } catch (formSubmitError) {
      console.error("FormSubmit exception:", formSubmitError);
    }

    return NextResponse.json({ success: true, message: 'Lead submitted successfully!' });
  } catch (error) {
    console.error('Error saving lead:', error);
    return NextResponse.json(
      { error: 'Internal server error while saving lead.' },
      { status: 500 }
    );
  }
}
