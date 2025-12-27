import { NextResponse } from "next/server";
import clientPromise from "@/lib/paydb";



export async function POST(request) {
  try {
    const body = await request.json();
  

    
    const client = await clientPromise;
    const db = client.db("paydb");
    const collection = db.collection("pay");

    // Insert or update existing user
  await collection.insertOne({
    name:body.name,
    message:body.message,
    amount:body.amount


  })

    return NextResponse.json({
      success: true,
      message: " Payment has done successfully",
    });
  } catch (error) {
    console.error("POST API ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
export async function GET(){
    try {
        const client= await clientPromise;
        const db= client.db('paydb');
        const collection=db.collection('pay');
        const data= await collection.find({}).toArray();
            return NextResponse.json(data, { status: 200 });

        
    } catch (error) {
        console.error("GET API ERROR:",error)
        
    }
}
