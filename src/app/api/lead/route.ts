import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

    // Define path for storing leads
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const filePath = path.join(dataDir, 'leads.json');
    let leads = [];

    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        leads = JSON.parse(fileContent);
      } catch (err) {
        // If file is empty or corrupted, reset to empty array
        leads = [];
      }
    }

    // Append new lead
    const newLead = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      message: message || '',
      type: type || 'general',
      createdAt: new Date().toISOString(),
    };

    leads.push(newLead);
    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2), 'utf8');

    return NextResponse.json({ success: true, message: 'Lead submitted successfully!' });
  } catch (error) {
    console.error('Error saving lead:', error);
    return NextResponse.json(
      { error: 'Internal server error while saving lead.' },
      { status: 500 }
    );
  }
}
