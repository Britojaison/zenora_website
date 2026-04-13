import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, note, srd } = body;

    if (!name || !phone || !email) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const params = new URLSearchParams({
      "api_key": process.env.SELLDO_API_KEY || "69f342a7632e73e6f895191899e2537d",
      "sell_do[form][lead][name]": name,
      "sell_do[form][lead][email]": email,
      "sell_do[form][lead][phone]": phone,
      "sell_do[campaign][srd]": srd || process.env.SELLDO_SRD || "69b90e4058f1e7692bde687e",
      "sell_do[form][note][content]": note || "Lead from Zenora Website",
    });

    const response = await fetch(
      `https://app.sell.do/api/leads/create?${params.toString()}`,
      { method: "POST" }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Sell.do API error:", errorText);
      return NextResponse.json({ error: "Failed to submit lead" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
