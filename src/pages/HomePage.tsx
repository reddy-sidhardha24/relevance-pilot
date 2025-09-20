import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Zap, 
  Target, 
  Clock, 
  BarChart3,
  CheckCircle,
  Users,
  Building2,
  Sparkles
} from "lucide-react";

const HomePage = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "AI-Powered Analysis",
      description: "Advanced LLM models evaluate resumes against job requirements with semantic understanding."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Relevance Scoring",
      description: "Get precise 0-100 scores based on skills match, experience, and cultural fit."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Instant Processing",
      description: "Process thousands of resumes in seconds, not hours. Average 2.3s per resume."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Detailed Analytics",
      description: "Comprehensive dashboards with insights across all locations and job postings."
    }
  ];

  const stats = [
    { value: "18-20", label: "Weekly Job Postings", sublabel: "Across all locations" },
    { value: "1000+", label: "Resumes Processed", sublabel: "Per job posting" },
    { value: "4", label: "Office Locations", sublabel: "Hyderabad, Bangalore, Pune, Delhi NCR" },
    { value: "75%", label: "Time Saved", sublabel: "On manual screening" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Resume Check System</h1>
              <p className="text-xs text-muted-foreground">Innomatics Research Labs</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button>
                Access Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered Recruitment Solution
          </Badge>
          
          <h1 className="text-5xl font-bold mb-6">
            Automated Resume <br />
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Relevance Check System
            </span>
          </h1>
          
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Transform your hiring process with AI-powered resume evaluation. 
            Get consistent, fast, and accurate candidate screening across all locations.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link to="/dashboard">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-xl"
              >
                Start Evaluating
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="font-medium mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our System?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built specifically for Innomatics Research Labs to handle high-volume 
              recruitment with precision and speed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg animate-smooth">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <div className="text-primary">{feature.icon}</div>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Simple workflow for efficient resume evaluation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Upload Job Description</h3>
              <p className="text-muted-foreground">
                Placement team uploads job requirements with role details, skills, and qualifications.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Analysis</h3>
              <p className="text-muted-foreground">
                Advanced AI models parse resumes and perform semantic matching against job requirements.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Results</h3>
              <p className="text-muted-foreground">
                Receive relevance scores, verdicts, and detailed feedback for each candidate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-primary text-primary-foreground shadow-primary">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Hiring Process?
              </h2>
              <p className="text-xl mb-8 text-primary-foreground/90">
                Join the placement team dashboard and start automating your resume evaluations today.
              </p>
              <div className="flex justify-center space-x-4">
                <Link to="/dashboard">
                  <Button 
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    <Users className="h-5 w-5 mr-2" />
                    Access Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex items-center justify-between">
          <p className="text-muted-foreground">
            © 2024 Innomatics Research Labs. All rights reserved.
          </p>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-success" />
            <span className="text-sm text-muted-foreground">System Status: Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;