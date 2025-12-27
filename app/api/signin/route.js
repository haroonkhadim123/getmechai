import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // <- adjusted path
import bcrypt from "bcryptjs";



export async function POST(request) {
    try {
        const body = await request.json();
        const client = await clientPromise;
        const db =  client.db('signdb');
        const collection =  db.collection('sign');

        const alreadyExist = await collection.findOne({ email: body.email });
        if (alreadyExist) {
            return NextResponse.json({ success: false, error: true, message: "Account already exists" });
        }
   const hashedPassword = await bcrypt.hash(body.password, 10);

    await collection.insertOne({
      name: body.name,
      email: body.email,
      password: hashedPassword
    });
        return NextResponse.json({ success: true, message: "Account created successfully" });

    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json({ success: false, error: true, message: "Internal server error" }, { status: 500 });
    }
}
