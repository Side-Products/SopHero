"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Download, ArrowLeft, RefreshCw } from "lucide-react";

interface SOP {
  _id: string;
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
  generatedSOP: string;
  createdAt: string;
  updatedAt: string;
}

export default function ViewSOP() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [sop, setSop] = useState<SOP | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [editedSOP, setEditedSOP] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (status === "authenticated" && params.id) {
      fetchSOP();
    }
  }, [status, params.id, router]);

  const fetchSOP = async () => {
    try {
      const response = await fetch(`/api/sop/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setSop(data);
        setEditedSOP(data.generatedSOP);
      } else {
        console.error("Failed to fetch SOP");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error fetching SOP:", error);
      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!sop) return;
    
    const blob = new Blob([editedSOP], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SOP_${sop.fullName}_${sop.targetUniversity}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRegenerate = async () => {
    if (!sop) return;
    
    setIsRegenerating(true);
    try {
      // Prepare form data for regeneration
      const formData = {
        fullName: sop.fullName,
        email: sop.email,
        targetUniversity: sop.targetUniversity,
        targetProgram: sop.targetProgram,
        currentEducation: sop.currentEducation,
        gpa: sop.gpa,
        workExperience: sop.workExperience,
        researchExperience: sop.researchExperience,
        extracurricularActivities: sop.extracurricularActivities,
        achievements: sop.achievements,
        skills: sop.skills,
        careerGoals: sop.careerGoals,
        whyThisProgram: sop.whyThisProgram,
        whyThisUniversity: sop.whyThisUniversity,
        futurePlans: sop.futurePlans,
      };

      // Generate new SOP
      const response = await fetch("/api/generate-sop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to regenerate SOP");
      }

      const result = await response.json();
      const newSOP = result.sop;
      
      // Update the SOP in the database
      const updateResponse = await fetch(`/api/sop/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ generatedSOP: newSOP }),
      });

      if (updateResponse.ok) {
        setSop(prev => prev ? { ...prev, generatedSOP: newSOP } : null);
        setEditedSOP(newSOP);
      }
    } catch (error) {
      console.error("Error regenerating SOP:", error);
    } finally {
      setIsRegenerating(false);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your SOP...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  if (!sop) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">SOP not found</p>
          <Button asChild className="mt-4">
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Statement of Purpose</h1>
              <p className="text-muted-foreground">
                {sop.targetProgram} at {sop.targetUniversity}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">
                  Created: {new Date(sop.createdAt).toLocaleDateString()}
                </Badge>
                {sop.updatedAt !== sop.createdAt && (
                  <Badge variant="outline">
                    Updated: {new Date(sop.updatedAt).toLocaleDateString()}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleRegenerate}
                disabled={isRegenerating}
                className="flex items-center gap-2"
              >
                {isRegenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                Regenerate
              </Button>
              <Button
                onClick={handleDownload}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </div>

        {/* SOP Content */}
        <Card>
          <CardHeader>
            <CardTitle>Generated Statement of Purpose</CardTitle>
            <CardDescription>
              You can edit the content below before downloading
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={editedSOP}
              onChange={(e) => setEditedSOP(e.target.value)}
              className="min-h-[600px] font-mono text-sm"
              placeholder="Your Statement of Purpose will appear here..."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 