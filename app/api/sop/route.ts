import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import SOP from "@/models/SOP";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    console.log("Session data:", session);
    
    if (!session?.user?.id) {
      console.log("No session or user ID found");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const sopData = await request.json();
    console.log("SOP data received:", Object.keys(sopData));
    
    await connectDB();

    const sop = await SOP.create({
      userId: session.user.id, // Use string ID directly
      ...sopData,
    });

    console.log("SOP saved successfully:", sop._id);

    return NextResponse.json(
      { message: "SOP saved successfully", sopId: sop._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Save SOP error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    console.log("GET /api/sop - Session:", session);
    
    if (!session?.user?.id) {
      console.log("No session or user ID found in GET request");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log("User ID:", session.user.id);
    await connectDB();

    const sops = await SOP.find({ userId: session.user.id }) // Use string ID directly
      .sort({ createdAt: -1 })
      .select('-__v');

    console.log("Found SOPs:", sops.length, "for user:", session.user.id);
    return NextResponse.json(sops);
  } catch (error) {
    console.error("Get SOPs error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 