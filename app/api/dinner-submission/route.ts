import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received dinner submission body:", body);
    const { fullName, phone, email, requests } = body;

    // Validate request
    if (!fullName || !phone || !email) {
      console.log("Validation failed - missing fields:", { fullName, phone, email });
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    // Combine special fields into the note for CRM
    const noteContent = `Lead from Zenora Website - Exclusive Dinner
Special Requests: ${requests || "None"}`;

    const params = new URLSearchParams({
      "api_key": process.env.SELLDO_API_KEY!,
      "sell_do[form][lead][name]": fullName,
      "sell_do[form][lead][email]": email,
      "sell_do[form][lead][phone]": phone,
      "sell_do[campaign][srd]": process.env.SELLDO_SRD!,
      "sell_do[form][note][content]": noteContent,
    });

    // Send to Sell.do CRM
    const response = await fetch(
      `https://app.sell.do/api/leads/create?${params.toString()}`,
      { method: "POST" }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Sell.do API error for dinner form:", errorText);
      return NextResponse.json({ error: "Failed to submit lead to CRM" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Dinner submission storage error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
