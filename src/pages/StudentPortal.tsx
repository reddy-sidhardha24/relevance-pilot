import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Upload, 
  FileText, 
  MapPin, 
  Calendar, 
  Star,
  CheckCircle2,
  Clock,
  Building2,
  User,
  Mail,
  Phone
} from "lucide-react";

interface AvailableJob {
  id: string;
  title: string;
  department: string;
  location: string;
  postedDate: string;
  description: string;
  requirements: string[];
  priority: "High" | "Medium" | "Low";
}

const availableJobs: AvailableJob[] = [
  {
    id: "1",
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Hyderabad",
    postedDate: "2024-01-15",
    description: "We are looking for an experienced full stack developer to join our engineering team.",
    requirements: ["React", "Node.js", "AWS", "Docker", "5+ years experience"],
    priority: "High"
  },
  {
    id: "2",
    title: "Data Scientist",
    department: "Analytics",
    location: "Bangalore",
    postedDate: "2024-01-12",
    description: "Join our analytics team to work on cutting-edge machine learning projects.",
    requirements: ["Python", "Machine Learning", "SQL", "Statistics", "3+ years experience"],
    priority: "High"
  },
  {
    id: "3",
    title: "UI/UX Designer",
    department: "Design",
    location: "Pune",
    postedDate: "2024-01-10",
    description: "Create beautiful and intuitive user experiences for our products.",
    requirements: ["Figma", "User Research", "Design Systems", "Prototyping", "3+ years experience"],
    priority: "Medium"
  }
];

const StudentPortal = () => {
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    location: "",
    coverLetter: ""
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-destructive text-destructive-foreground";
      case "Medium":
        return "bg-warning text-warning-foreground";
      case "Low":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Your resume has been submitted for evaluation. You will receive results within 24 hours.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Application ID:</span>
                <span className="font-mono">#APP-2024-001</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Status:</span>
                <Badge variant="secondary">
                  <Clock className="h-3 w-3 mr-1" />
                  Processing
                </Badge>
              </div>
            </div>
            <Button 
              onClick={() => {
                setIsSubmitted(false);
                setSelectedJob("");
                setApplicationData({
                  name: "",
                  email: "",
                  phone: "",
                  experience: "",
                  location: "",
                  coverLetter: ""
                });
                setResumeFile(null);
              }}
              className="w-full mt-6"
            >
              Submit Another Application
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Student Application Portal</h1>
              <p className="text-xs text-muted-foreground">Innomatics Research Labs</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Apply for Open Positions</h1>
            <p className="text-muted-foreground">
              Submit your resume for AI-powered evaluation against our current job openings
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Available Jobs */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Available Positions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {availableJobs.map((job) => (
                    <div
                      key={job.id}
                      className={`p-4 rounded-lg border cursor-pointer animate-smooth ${
                        selectedJob === job.id 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedJob(job.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{job.title}</h4>
                        <Badge className={getPriorityColor(job.priority)} variant="secondary">
                          {job.priority}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center space-x-1">
                          <Building2 className="h-3 w-3" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {job.requirements.slice(0, 3).map((req, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                        {job.requirements.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{job.requirements.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Application Form</CardTitle>
                  {selectedJob && (
                    <p className="text-sm text-muted-foreground">
                      Applying for: {availableJobs.find(j => j.id === selectedJob)?.title}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  {!selectedJob ? (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Select a Position</h3>
                      <p className="text-muted-foreground">
                        Choose a job position from the available list to start your application.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <h4 className="font-semibold flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>Personal Information</span>
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              value={applicationData.name}
                              onChange={(e) => setApplicationData({...applicationData, name: e.target.value})}
                              placeholder="Enter your full name"
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={applicationData.email}
                              onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                              placeholder="your.email@example.com"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              value={applicationData.phone}
                              onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
                              placeholder="+91 9876543210"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="experience">Experience</Label>
                            <Select 
                              value={applicationData.experience}
                              onValueChange={(value) => setApplicationData({...applicationData, experience: value})}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0-1">0-1 years</SelectItem>
                                <SelectItem value="1-3">1-3 years</SelectItem>
                                <SelectItem value="3-5">3-5 years</SelectItem>
                                <SelectItem value="5+">5+ years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="location">Preferred Location</Label>
                            <Select 
                              value={applicationData.location}
                              onValueChange={(value) => setApplicationData({...applicationData, location: value})}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select location" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="hyderabad">Hyderabad</SelectItem>
                                <SelectItem value="bangalore">Bangalore</SelectItem>
                                <SelectItem value="pune">Pune</SelectItem>
                                <SelectItem value="delhi-ncr">Delhi NCR</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Resume Upload */}
                      <div className="space-y-4">
                        <h4 className="font-semibold flex items-center space-x-2">
                          <FileText className="h-4 w-4" />
                          <span>Resume Upload</span>
                        </h4>
                        
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="resume-upload"
                          />
                          <label htmlFor="resume-upload" className="cursor-pointer">
                            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-sm font-medium mb-2">
                              {resumeFile ? resumeFile.name : "Click to upload your resume"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Supports PDF, DOC, DOCX (Max 5MB)
                            </p>
                          </label>
                        </div>
                      </div>

                      {/* Cover Letter */}
                      <div className="space-y-4">
                        <h4 className="font-semibold flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>Cover Letter (Optional)</span>
                        </h4>
                        
                        <Textarea
                          value={applicationData.coverLetter}
                          onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                          placeholder="Tell us why you're interested in this position..."
                          rows={4}
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-6">
                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-primary shadow-primary"
                          disabled={!resumeFile || !applicationData.name || !applicationData.email || isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Clock className="h-4 w-4 mr-2 animate-spin" />
                              Processing Application...
                            </>
                          ) : (
                            <>
                              <Star className="h-4 w-4 mr-2" />
                              Submit Application
                            </>
                          )}
                        </Button>
                        
                        <p className="text-xs text-muted-foreground text-center mt-3">
                          Your resume will be evaluated using AI technology and you'll receive results within 24 hours.
                        </p>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentPortal;