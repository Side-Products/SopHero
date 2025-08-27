import { NextRequest, NextResponse } from "next/server";
import { generateSOPWithOpenAI, generateEnhancedSOP } from "@/lib/sop-generator";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // Try to generate SOP with OpenAI first, fallback to template if it fails
    let generatedSOP: string;
    try {
      generatedSOP = await generateSOPWithOpenAI(formData);
    } catch (error) {
      console.log("OpenAI generation failed, using fallback:", error);
      generatedSOP = generateEnhancedSOP(formData);
    }
    
    return NextResponse.json({
      success: true,
      sop: generatedSOP
    });
  } catch (error) {
    console.error("Generate SOP error:", error);
    return NextResponse.json(
      { error: "Failed to generate SOP" },
      { status: 500 }
    );
  }
} 