"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Bot, Rocket, CheckCircle, Star, Users, ArrowRight, Sparkles, GraduationCap } from "lucide-react";

export default function Home() {
  const { data: session } = useSession();

  const features = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: "AI-Powered Generation",
      description: "Advanced AI technology creates personalized, compelling SOPs tailored to your unique background and goals.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Professional Templates",
      description: "Access industry-standard templates and formats used by top universities worldwide.",
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Quick & Easy",
      description: "Generate your complete Statement of Purpose in minutes, not hours or days.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Quality Assurance",
      description: "Built-in quality checks ensure your SOP meets university standards and requirements.",
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Personalized Content",
      description: "Every SOP is uniquely crafted based on your academic background, experience, and aspirations.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Expert Guidance",
      description: "Follow proven strategies and tips from successful university applicants and admissions experts.",
    },
  ];

  const stats = [
    { number: "10,000+", label: "SOPs Generated" },
    { number: "500+", label: "Universities" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "AI Support" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30" />
        
        {/* Minimal Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-muted/50 rounded-full blur-3xl" />
        </div>

        <div className="relative px-4 py-24 sm:py-32">
          <div className="mx-auto max-w-5xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              AI-Powered SOP Generation
            </div>

            {/* Main Heading */}
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
              Your{" "}
              <span className="text-primary">
                Statement of Purpose
              </span>{" "}
              Hero
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mb-12 max-w-3xl text-xl text-muted-foreground leading-relaxed">
              Create compelling, personalized Statements of Purpose for university applications with SopHero's AI-powered platform. 
              Stand out from the crowd and get accepted to your dream university.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mb-16">
              {session ? (
                <>
                  <Button asChild size="lg" className="text-lg px-8 py-6">
                    <Link href="/questionnaire" className="flex items-center gap-2">
                      Create New SOP
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg" className="text-lg px-8 py-6">
                    <Link href="/questionnaire" className="flex items-center gap-2">
                      Start Creating Your SOP
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                    <Link href="/auth/signup">Sign Up to Save Your SOPs</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-20">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
              Why Choose SopHero?
            </Badge>
            <h2 className="text-4xl font-bold mb-6">
              Everything you need to create the perfect{" "}
              <span className="text-primary">
                Statement of Purpose
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              SopHero combines cutting-edge AI technology with proven academic writing strategies to help you create 
              the perfect Statement of Purpose for your university application.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="group border shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">How SopHero Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to create your winning Statement of Purpose
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Answer Questions</h3>
              <p className="text-muted-foreground">
                Fill out our comprehensive questionnaire about your background, goals, and aspirations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Generation</h3>
              <p className="text-muted-foreground">
                Our advanced AI creates a personalized, compelling Statement of Purpose just for you.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Download & Submit</h3>
              <p className="text-muted-foreground">
                Review, edit if needed, and download your professional SOP ready for submission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mb-8">
            <GraduationCap className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">
              Ready to Create Your{" "}
              <span className="text-primary">
                Winning SOP
              </span>
              ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join thousands of successful applicants who used SopHero to get into their dream universities. 
              Your future starts with the perfect Statement of Purpose.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/questionnaire" className="flex items-center gap-2">
                Get Started with SopHero
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="/auth/signup">Create Free Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
