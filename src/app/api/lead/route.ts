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

    // CRM connection hook (Sell.do)
    const isHomePage = type === 'home-enquiry';
    const isContactPage = type === 'general';

    if (isHomePage || isContactPage) {
      try {
        const sellDoApiKey = "69f342a7632e73e6f895191899e2537d"; 
        
        const sellDoParams = new URLSearchParams();
        sellDoParams.append("api_key", sellDoApiKey);
        sellDoParams.append("sell_do[form][lead][name]", name);
        if (email) sellDoParams.append("sell_do[form][lead][email]", email);
        sellDoParams.append("sell_do[form][lead][phone]", phone);
        sellDoParams.append("sell_do[campaign][srd]", "***");
        
        let noteContent = `Lead Type: ${type}\nMessage: ${message || "N/A"}`;
        sellDoParams.append("sell_do[form][content][note]", noteContent);

        const crmResponse = await fetch(`https://app.sell.do/api/leads/create?${sellDoParams.toString()}`, {
          method: "POST",
        });
        
        if (!crmResponse.ok) {
          console.error("[SELL.DO CRM HTTP ERROR]", crmResponse.status, await crmResponse.text());
        } else {
          console.log("[SELL.DO CRM SUCCESS]");
        }
      } catch (crmError) {
        console.error("[SELL.DO CRM ERROR]", crmError);
      }
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
