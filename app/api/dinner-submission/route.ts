import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "dinner_submissions.json");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received dinner submission body:", body);
    const { fullName, phone, email, income, requests } = body;

    // Validate request
    if (!fullName || !phone || !email || !income) {
      console.log("Validation failed - missing fields:", { fullName, phone, email, income });
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    // Prepare data entry
    const newSubmission = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      fullName,
      phone,
      email,
      income,
      requests: requests || "",
    };

    // Ensure directory exists (belt and braces)
    const dataDir = path.dirname(DATA_FILE_PATH);
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }

    // Read existing data
    let submissions = [];
    try {
      const fileData = await fs.readFile(DATA_FILE_PATH, "utf-8");
      submissions = JSON.parse(fileData);
    } catch {
      // File doesn't exist or is empty/corrupt, we'll start fresh
      submissions = [];
    }

    // Add new submission
    submissions.push(newSubmission);

    // Save back to file
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(submissions, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Dinner submission storage error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
