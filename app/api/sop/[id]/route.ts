import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import SOP from "@/models/SOP";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    await connectDB();

    const sop = await SOP.findOne({ 
      _id: id,
      userId: session.user.id 
    });

    if (!sop) {
      return NextResponse.json(
        { error: "SOP not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(sop);
  } catch (error) {
    console.error("Get SOP error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const updateData = await request.json();
    
    await connectDB();

    const sop = await SOP.findOneAndUpdate(
      { 
        _id: id,
        userId: session.user.id 
      },
      { 
        ...updateData,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!sop) {
      return NextResponse.json(
        { error: "SOP not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(sop);
  } catch (error) {
    console.error("Update SOP error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 