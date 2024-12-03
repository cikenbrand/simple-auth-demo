import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbconnect";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { email, password, username } = await req.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: "Email already in use" }, { status: 400 });
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return NextResponse.json({ message: "Username already in use" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    username,
  });

  return NextResponse.json(
    { message: "User created successfully", user: newUser },
    { status: 201 }
  );
}
