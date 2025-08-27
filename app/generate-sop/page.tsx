"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Download, Edit, Save, PlusCircle } from "lucide-react";
import { generateSOPWithOpenAI, generateEnhancedSOP } from "@/lib/sop-generator";

interface FormData {
  fullName: string;
  email: string;
  targetUniversity: string;
  targetProgram: string;
  currentEducation: string;
  gpa: string;
  workExperience: string;
  researchExperience: string;
  extracurricularActivities: string;
  achievements: string;
  skills: string;
  careerGoals: string;
  whyThisProgram: string;
  whyThisUniversity: string;
  futurePlans: string;
}

export default function GenerateSOP() {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [generatedSOP, setGeneratedSOP] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSOP, setEditedSOP] = useState("");

  useEffect(() => {
    const savedData = localStorage.getItem("sopFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      generateSOP(parsedData);
    }
  }, []);

  const generateSOP = async (data: FormData) => {
    setIsGenerating(true);
    try {
      // Generate SOP using the API route
      const response = await fetch("/api/generate-sop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to generate SOP");
      }

      const result = await response.json();
      const sop = result.sop;
      
      setGeneratedSOP(sop);
      setEditedSOP(sop);
    } catch (error) {
      console.error("Error generating SOP:", error);
      // Fallback to template generation
      const fallbackSOP = generateEnhancedSOP(data);
      setGeneratedSOP(fallbackSOP);
      setEditedSOP(fallbackSOP);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    const content = isEditing ? editedSOP : generatedSOP;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SOP_${formData?.fullName || "Statement_of_Purpose"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    setGeneratedSOP(editedSOP);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSOP(generatedSOP);
    setIsEditing(false);
  };

  if (!formData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">No form data found. Please complete the questionnaire first.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Statement of Purpose</h1>
          <p className="text-muted-foreground">
            SopHero has generated a personalized SOP based on your information
          </p>
        </div>

        {/* SOP Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generated Statement of Purpose</CardTitle>
                <CardDescription>
                  For {formData.targetProgram} at {formData.targetUniversity}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} size="sm" className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                )}
                <Button onClick={handleDownload} size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isGenerating ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">SopHero is crafting your Statement of Purpose with AI...</p>
                </div>
              </div>
            ) : (
              <Textarea
                value={isEditing ? editedSOP : generatedSOP}
                onChange={(e) => setEditedSOP(e.target.value)}
                className="min-h-[600px] font-mono text-sm leading-relaxed"
                readOnly={!isEditing}
                placeholder="Your Statement of Purpose will appear here..."
              />
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button asChild variant="outline">
            <a href="/questionnaire" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Another SOP
            </a>
          </Button>
          <Button onClick={handleDownload} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download SOP
          </Button>
        </div>

        {/* Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">SopHero Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Review and edit your SOP to ensure it reflects your unique voice and experiences</li>
              <li>• Keep your SOP concise, typically 500-1000 words</li>
              <li>• Focus on specific examples and achievements rather than general statements</li>
              <li>• Proofread carefully for grammar and spelling errors</li>
              <li>• Consider having a mentor or advisor review your final SOP</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 