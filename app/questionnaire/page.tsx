"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { demoFormData } from "@/lib/demo-data";
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

export default function Questionnaire() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    targetUniversity: "",
    targetProgram: "",
    currentEducation: "",
    gpa: "",
    workExperience: "",
    researchExperience: "",
    extracurricularActivities: "",
    achievements: "",
    skills: "",
    careerGoals: "",
    whyThisProgram: "",
    whyThisUniversity: "",
    futurePlans: "",
  });
  const { data: session } = useSession();
  const router = useRouter();

  const totalSteps = 4;

  useEffect(() => {
    // Load saved data from localStorage if not authenticated
    if (!session) {
      const savedData = localStorage.getItem("sopFormData");
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
    }
  }, [session]);

  const saveToLocalStorage = (data: FormData) => {
    if (!session) {
      localStorage.setItem("sopFormData", JSON.stringify(data));
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    saveToLocalStorage(newData);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDemo = () => {
    setFormData(demoFormData);
    saveToLocalStorage(demoFormData);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Generate SOP using the API route
      const response = await fetch("/api/generate-sop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate SOP");
      }

      const result = await response.json();
      const generatedSOP = result.sop;
      
      if (session) {
        // Save to database for authenticated users
        const saveResponse = await fetch("/api/sop", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            generatedSOP,
          }),
        });

        if (saveResponse.ok) {
          router.push("/dashboard");
        } else {
          const errorData = await saveResponse.text();
          console.error("Failed to save SOP:", saveResponse.status, errorData);
        }
      } else {
        // Save to localStorage and redirect to generate page for guests
        localStorage.setItem("sopFormData", JSON.stringify(formData));
        router.push("/generate-sop");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const Step1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            placeholder="Your full name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Your email address"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="targetUniversity">Target University *</Label>
          <Input
            id="targetUniversity"
            value={formData.targetUniversity}
            onChange={(e) => handleInputChange("targetUniversity", e.target.value)}
            placeholder="e.g., Stanford University, MIT, etc."
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="targetProgram">Target Program *</Label>
          <Input
            id="targetProgram"
            value={formData.targetProgram}
            onChange={(e) => handleInputChange("targetProgram", e.target.value)}
            placeholder="e.g., Master of Computer Science, MBA, etc."
            required
          />
        </div>
      </div>
    </div>
  );

  const Step2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="currentEducation">Current Education Level *</Label>
          <Select value={formData.currentEducation} onValueChange={(value) => handleInputChange("currentEducation", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your education level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="High School">High School</SelectItem>
              <SelectItem value="Bachelor's Degree">Bachelor's Degree</SelectItem>
              <SelectItem value="Master's Degree">Master's Degree</SelectItem>
              <SelectItem value="PhD">PhD</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="gpa">GPA (if applicable)</Label>
          <Input
            id="gpa"
            value={formData.gpa}
            onChange={(e) => handleInputChange("gpa", e.target.value)}
            placeholder="e.g., 3.8/4.0, 85%, etc."
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="workExperience">Work Experience</Label>
        <Textarea
          id="workExperience"
          value={formData.workExperience}
          onChange={(e) => handleInputChange("workExperience", e.target.value)}
          placeholder="Share your work experience, internships, or any professional background. Don't worry about perfect formatting - just describe what you've done and what you learned."
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="researchExperience">Research Experience</Label>
        <Textarea
          id="researchExperience"
          value={formData.researchExperience}
          onChange={(e) => handleInputChange("researchExperience", e.target.value)}
          placeholder="Describe any research projects, publications, or academic research you've been involved in. Include rough ideas about what you worked on and what you discovered."
          rows={4}
        />
      </div>
    </div>
  );

  const Step3 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="extracurricularActivities">Extracurricular Activities</Label>
        <Textarea
          id="extracurricularActivities"
          value={formData.extracurricularActivities}
          onChange={(e) => handleInputChange("extracurricularActivities", e.target.value)}
          placeholder="Tell us about clubs, organizations, volunteer work, or other activities you're involved in. Just list your main activities and what you do in them."
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="achievements">Achievements & Awards</Label>
        <Textarea
          id="achievements"
          value={formData.achievements}
          onChange={(e) => handleInputChange("achievements", e.target.value)}
          placeholder="List any awards, honors, scholarships, or notable achievements. Don't worry about perfect formatting - just mention what you've accomplished."
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="skills">Technical Skills & Competencies</Label>
        <Textarea
          id="skills"
          value={formData.skills}
          onChange={(e) => handleInputChange("skills", e.target.value)}
          placeholder="List your technical skills, programming languages, tools, or other relevant competencies. You can just list them or describe how you use them."
          rows={4}
        />
      </div>
    </div>
  );

  const Step4 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="careerGoals">Career Goals *</Label>
        <Textarea
          id="careerGoals"
          value={formData.careerGoals}
          onChange={(e) => handleInputChange("careerGoals", e.target.value)}
          placeholder="What are your career goals? What do you want to achieve short-term and long-term? How does this program fit into your plans? Share your rough ideas and aspirations."
          rows={4}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="whyThisProgram">Why This Program? *</Label>
        <Textarea
          id="whyThisProgram"
          value={formData.whyThisProgram}
          onChange={(e) => handleInputChange("whyThisProgram", e.target.value)}
          placeholder="Why are you interested in this specific program? What aspects appeal to you? What do you hope to learn? Share your thoughts and interests."
          rows={4}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="whyThisUniversity">Why This University? *</Label>
        <Textarea
          id="whyThisUniversity"
          value={formData.whyThisUniversity}
          onChange={(e) => handleInputChange("whyThisUniversity", e.target.value)}
          placeholder="Why have you chosen this university? What makes it special to you? Is it the location, reputation, faculty, or something else? Share your reasons."
          rows={4}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="futurePlans">Future Plans After Graduation</Label>
        <Textarea
          id="futurePlans"
          value={formData.futurePlans}
          onChange={(e) => handleInputChange("futurePlans", e.target.value)}
          placeholder="What do you plan to do after completing this program? How will this degree help you achieve your goals? Share your rough ideas about the future."
          rows={4}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Your Statement of Purpose</h1>
          <p className="text-muted-foreground">
            Let SopHero guide you through creating a compelling SOP for your university application
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-muted-foreground">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle>
                  {currentStep === 1 && "Personal Information"}
                  {currentStep === 2 && "Academic & Professional Background"}
                  {currentStep === 3 && "Activities & Achievements"}
                  {currentStep === 4 && "Goals & Motivation"}
                </CardTitle>
                <CardDescription>
                  {currentStep === 1 && "Tell us about yourself and your target program"}
                  {currentStep === 2 && "Share your educational and professional experience"}
                  {currentStep === 3 && "Highlight your activities, achievements, and skills"}
                  {currentStep === 4 && "Explain your goals and why you chose this program"}
                </CardDescription>
              </div>
              <Button variant="outline" onClick={handleDemo} className="ml-4">
                Try Demo
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Helpful Note */}
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 <strong>Tip:</strong> Don't worry about perfect formatting or writing! Just share your ideas, experiences, and thoughts. SopHero will help you create a well-structured SOP from your rough notes.
              </p>
            </div>

            {currentStep === 1 && <Step1 />}
            {currentStep === 2 && <Step2 />}
            {currentStep === 3 && <Step3 />}
            {currentStep === 4 && <Step4 />}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1 || isSubmitting}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button onClick={nextStep} className="flex items-center gap-2">
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  {isSubmitting ? "Generating Your SOP..." : "Generate My SOP"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 