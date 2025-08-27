"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, FileText, Calendar, Download, Eye } from "lucide-react";

interface SOP {
  _id: string;
  fullName: string;
  targetUniversity: string;
  targetProgram: string;
  createdAt: string;
  generatedSOP: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sops, setSops] = useState<SOP[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (status === "authenticated") {
      console.log("Session authenticated:", session);
      fetchSOPs();
    }
  }, [status, router, session]);

  const fetchSOPs = async () => {
    try {
      console.log("Fetching SOPs...");
      const response = await fetch("/api/sop");
      console.log("Response status:", response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log("SOPs fetched:", data);
        setSops(data);
      } else {
        const errorData = await response.text();
        console.error("Failed to fetch SOPs:", response.status, errorData);
      }
    } catch (error) {
      console.error("Error fetching SOPs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (sop: SOP) => {
    const blob = new Blob([sop.generatedSOP], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SOP_${sop.fullName}_${sop.targetUniversity}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your SopHero dashboard...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {session?.user?.name}!</h1>
              <p className="text-muted-foreground">
                Manage your Statements of Purpose and create new ones with SopHero
              </p>
            </div>
            <Button asChild className="flex items-center gap-2">
              <Link href="/questionnaire">
                <Plus className="h-4 w-4" />
                Create New SOP
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{sops.length}</p>
                  <p className="text-sm text-muted-foreground">Total SOPs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">
                    {sops.length > 0 ? new Date(sops[0].createdAt).toLocaleDateString() : "N/A"}
                  </p>
                  <p className="text-sm text-muted-foreground">Latest SOP</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="h-5 w-5 bg-primary rounded-full"></div>
                <div>
                  <p className="text-2xl font-bold">Active</p>
                  <p className="text-sm text-muted-foreground">Account Status</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SOPs List */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Statements of Purpose</h2>
          
          {sops.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No SOPs yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Create your first Statement of Purpose with SopHero
                  </p>
                  <Button asChild>
                    <Link href="/questionnaire">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First SOP
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {sops.map((sop) => (
                <Card key={sop._id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{sop.fullName}</CardTitle>
                        <CardDescription className="mt-1">
                          {sop.targetProgram} at {sop.targetUniversity}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="ml-4">
                        {new Date(sop.createdAt).toLocaleDateString()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(sop)}
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex items-center gap-2"
                      >
                        <Link href={`/view-sop/${sop._id}`}>
                          <Eye className="h-4 w-4" />
                          View
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Get started with SopHero quickly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-start">
                <Link href="/questionnaire">
                  <Plus className="h-6 w-6 mb-2" />
                  <span className="font-semibold">Create New SOP</span>
                  <span className="text-sm text-muted-foreground">Start a new Statement of Purpose</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-start">
                <Link href="/">
                  <FileText className="h-6 w-6 mb-2" />
                  <span className="font-semibold">Learn More</span>
                  <span className="text-sm text-muted-foreground">Discover SopHero features</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 