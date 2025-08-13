// app/api/members/[id]/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { Member, IMember } from '@/models/Employee'; // Using Mongoose model
import dbConnect from '@/lib/dbConnect'; // Using Mongoose connection
// import bcrypt from 'bcryptjs'; // IMPORTANT: Don't forget to install and use for hashing!

// Corrected type definition for the route context
// Next.js expects the context object to have a 'params' property
// where 'params' itself is an object containing the dynamic segment keys.
type RouteParams = {
  id: string; // This matches your dynamic route folder name [id]
};

// Handle PUT requests
export async function PUT(
  req: NextRequest,
  { params }: { params: RouteParams } // Directly destructure params and type it
) {
  await dbConnect(); // Connect via Mongoose
  const { id } = params; // Access id directly from destructured params

  const { username, password } = await req.json();

  try {
    // Server-side duplicate username check (excluding the current member being updated)
    const existingMember = await Member.findOne({ username, _id: { $ne: id } });
    if (existingMember) {
      return NextResponse.json({ error: 'Username already exists.' }, { status: 409 });
    }

    let updateData: any = { username };
    if (password) {
      // ⚠️ IMPORTANT: Hash the new password before updating!
      // updateData.password = await bcrypt.hash(password, 10);
      updateData.password = password; // REPLACE with hashed password in a real app!
    }

    const updatedMember: IMember | null = await Member.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } // `new: true` returns the updated doc; `runValidators` ensures schema validation
    );

    if (!updatedMember) {
      return NextResponse.json({ message: 'Member not found.' }, { status: 404 });
    }

    // Return the updated member with masked password and timestamps
    return NextResponse.json({
      _id: updatedMember._id!.toString(),
      username: updatedMember.username,
      password: '********',
      createdAt: updatedMember.createdAt.toISOString(),
      updatedAt: updatedMember.updatedAt.toISOString(),
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating member:', error);
    return NextResponse.json({ message: error.message || 'Failed to update member.' }, { status: 500 });
  }
}

// Handle DELETE requests
export async function DELETE(
  req: NextRequest,
  { params }: { params: RouteParams } // Apply the same type here
) {
  await dbConnect(); // Connect via Mongoose
  const { id } = params; // Access id directly from destructured params

  try {
    const deletedMember: IMember | null = await Member.findByIdAndDelete(id);

    if (!deletedMember) {
      return NextResponse.json({ message: 'Member not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Member deleted successfully.' }, { status: 200 });

  } catch (error: any) {
    console.error('Error deleting member:', error);
    return NextResponse.json({ message: error.message || 'Failed to delete member.' }, { status: 500 });
  }
}