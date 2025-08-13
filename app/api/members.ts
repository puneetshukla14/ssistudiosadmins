// app/api/members/route.ts
import { NextResponse } from 'next/server';
// No need for NextApiRequest/NextApiResponse in App Router API routes

import { Member, IMember } from '@/models/Employee'; // Adjust path if needed
import dbConnect from '@/lib/dbConnect'; // Adjust path if needed
// import bcrypt from 'bcryptjs'; // IMPORTANT: Install and use this for password hashing!

// Handle GET requests (e.g., fetching all members)
export async function GET() {
  await dbConnect(); // Ensure database is connected

  try {
    const members: IMember[] = await Member.find({}); // Fetch all members using Mongoose

    // Map members to a safer format, exposing timestamps but masking password
    const safeMembers = members.map(m => ({
      _id: m._id!.toString(), // 💡 THE FIX: Added non-null assertion operator (!)
      username: m.username,
      password: '********', // Always mask passwords for the frontend
      createdAt: m.createdAt.toISOString(), // Convert Date to ISO string
      updatedAt: m.updatedAt.toISOString(), // Convert Date to ISO string
    }));

    return NextResponse.json(safeMembers, { status: 200 }); // Send the processed data
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json({ message: 'Failed to fetch members.' }, { status: 500 });
  }
}

// Handle POST requests (e.g., adding a new member)
export async function POST(req: Request) { // Use 'Request' object for App Router POST
  await dbConnect(); // Ensure database is connected

  try {
    const { username, password } = await req.json(); // Parse JSON body from 'Request' object

    // Server-side duplicate username validation
    const existingMember = await Member.findOne({ username });
    if (existingMember) {
      return NextResponse.json({ error: 'Username already exists.' }, { status: 409 });
    }

    // ⚠️ IMPORTANT: Hash the password before saving to the database!
    // const hashedPassword = await bcrypt.hash(password, 10);
    
    const newMember: IMember = await Member.create({
      username,
      password: password, // REPLACE with hashedPassword in a real app!
    });

    // Return the created member with masked password and timestamps
    return NextResponse.json({
      _id: newMember._id!.toString(), // 💡 THE FIX: Added non-null assertion operator (!)
      username: newMember.username,
      password: '********',
      createdAt: newMember.createdAt.toISOString(),
      updatedAt: newMember.updatedAt.toISOString(),
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error adding member:', error);
    // Handle Mongoose/MongoDB duplicate key error specifically
    if (error.code === 11000) { 
      return NextResponse.json({ error: 'Username already exists.' }, { status: 409 });
    }
    return NextResponse.json({ message: error.message || 'Failed to add member.' }, { status: 500 });
  }
}