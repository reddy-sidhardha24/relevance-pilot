import { useState } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Download, 
  Eye, 
  Filter,
  Star,
  MapPin,
  Calendar,
  FileText,
  User,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Clock
} from "lucide-react";

interface CandidateResult {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  location: string;
  submittedAt: string;
  relevanceScore: number;
  verdict: "High" | "Medium" | "Low";
  missingSkills: string[];
  strengths: string[];
  experience: string;
  education: string;
  resumeUrl: string;
}

const mockResults: CandidateResult[] = [
  {
    id: "1",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    jobTitle: "Senior Full Stack Developer",
    location: "Hyderabad",
    submittedAt: "2024-01-20T10:30:00Z",
    relevanceScore: 92,
    verdict: "High",
    missingSkills: ["GraphQL"],
    strengths: ["React", "Node.js", "AWS", "Docker", "5+ years experience"],
    experience: "5 years",
    education: "B.Tech Computer Science",
    resumeUrl: "/resumes/priya-sharma.pdf"
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    jobTitle: "Data Scientist",
    location: "Bangalore",
    submittedAt: "2024-01-20T09:15:00Z",
    relevanceScore: 78,
    verdict: "Medium",
    missingSkills: ["Deep Learning", "MLOps"],
    strengths: ["Python", "Machine Learning", "SQL", "Statistics"],
    experience: "3 years",
    education: "M.Tech Data Science",
    resumeUrl: "/resumes/rajesh-kumar.pdf"
  },
  {
    id: "3",
    name: "Anjali Patel",
    email: "anjali.patel@email.com",
    jobTitle: "UI/UX Designer",
    location: "Pune",
    submittedAt: "2024-01-20T08:45:00Z",
    relevanceScore: 85,
    verdict: "High",
    missingSkills: ["Prototyping Tools"],
    strengths: ["Figma", "User Research", "Design Systems", "4 years experience"],
    experience: "4 years",
    education: "B.Des Visual Communication",
    resumeUrl: "/resumes/anjali-patel.pdf"
  },
  {
    id: "4",
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    jobTitle: "DevOps Engineer",
    location: "Delhi NCR",
    submittedAt: "2024-01-20T07:20:00Z",
    relevanceScore: 65,
    verdict: "Medium",
    missingSkills: ["Kubernetes", "Terraform", "Monitoring"],
    strengths: ["AWS", "Docker", "CI/CD", "Linux"],
    experience: "2 years",
    education: "B.Tech Information Technology",
    resumeUrl: "/resumes/vikram-singh.pdf"
  },
  {
    id: "5",
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    jobTitle: "Machine Learning Engineer",
    location: "Hyderabad",
    submittedAt: "2024-01-19T16:30:00Z",
    relevanceScore: 88,
    verdict: "High",
    missingSkills: ["Production ML"],
    strengths: ["TensorFlow", "PyTorch", "Python", "Computer Vision"],
    experience: "4 years",
    education: "M.S. Computer Science",
    resumeUrl: "/resumes/sneha-reddy.pdf"
  }
];

const Results = () => {
  const [results, setResults] = useState<CandidateResult[]>(mockResults);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobFilter, setJobFilter] = useState("all");
  const [verdictFilter, setVerdictFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateResult | null>(null);

  const filteredResults = results.filter(result => {
    const matchesSearch = result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesJob = jobFilter === "all" || result.jobTitle === jobFilter;
    const matchesVerdict = verdictFilter === "all" || result.verdict === verdictFilter;
    const matchesLocation = locationFilter === "all" || result.location === locationFilter;
    
    return matchesSearch && matchesJob && matchesVerdict && matchesLocation;
  });

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "High":
        return "bg-success text-success-foreground";
      case "Medium":
        return "bg-warning text-warning-foreground";
      case "Low":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Evaluation Results</h1>
            <p className="text-muted-foreground">
              Review and manage candidate evaluations across all job postings
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </Button>
            <Button className="bg-gradient-primary shadow-primary">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-success mb-1">
                {filteredResults.filter(r => r.verdict === "High").length}
              </div>
              <div className="text-sm text-muted-foreground">High Suitability</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-warning mb-1">
                {filteredResults.filter(r => r.verdict === "Medium").length}
              </div>
              <div className="text-sm text-muted-foreground">Medium Suitability</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-muted-foreground mb-1">
                {filteredResults.filter(r => r.verdict === "Low").length}
              </div>
              <div className="text-sm text-muted-foreground">Low Suitability</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {Math.round(filteredResults.reduce((acc, r) => acc + r.relevanceScore, 0) / filteredResults.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search candidates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={jobFilter} onValueChange={setJobFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  <SelectItem value="Senior Full Stack Developer">Full Stack Developer</SelectItem>
                  <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                  <SelectItem value="UI/UX Designer">UI/UX Designer</SelectItem>
                  <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={verdictFilter} onValueChange={setVerdictFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Verdict" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Verdicts</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Pune">Pune</SelectItem>
                  <SelectItem value="Delhi NCR">Delhi NCR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results List */}
        <div className="space-y-4">
          {filteredResults.map((candidate) => (
            <Card key={candidate.id} className="hover:shadow-md animate-smooth">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold">{candidate.name}</h3>
                        <p className="text-sm text-muted-foreground">{candidate.email}</p>
                      </div>
                      
                      <Badge className={getVerdictColor(candidate.verdict)}>
                        {candidate.verdict} Suitability
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <FileText className="h-4 w-4" />
                          <span>{candidate.jobTitle}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{candidate.location}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>{candidate.experience} experience</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(candidate.submittedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Relevance Score</span>
                          <span className={`text-lg font-bold ${getScoreColor(candidate.relevanceScore)}`}>
                            {candidate.relevanceScore}%
                          </span>
                        </div>
                        <Progress 
                          value={candidate.relevanceScore} 
                          className="h-2"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <div className="flex items-center space-x-1">
                        <CheckCircle2 className="h-3 w-3 text-success" />
                        <span className="text-xs text-muted-foreground">Strengths:</span>
                      </div>
                      {candidate.strengths.slice(0, 3).map((strength, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {strength}
                        </Badge>
                      ))}
                      {candidate.strengths.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{candidate.strengths.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    {candidate.missingSkills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        <div className="flex items-center space-x-1">
                          <AlertCircle className="h-3 w-3 text-warning" />
                          <span className="text-xs text-muted-foreground">Missing:</span>
                        </div>
                        {candidate.missingSkills.map((skill, index) => (
                          <Badge key={index} variant="destructive" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-6">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedCandidate(candidate)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Candidate Evaluation Details</DialogTitle>
                        </DialogHeader>
                        {selectedCandidate && (
                          <div className="space-y-6 py-4">
                            {/* Candidate Info */}
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold mb-2">Candidate Information</h4>
                                <div className="space-y-2 text-sm">
                                  <div><strong>Name:</strong> {selectedCandidate.name}</div>
                                  <div><strong>Email:</strong> {selectedCandidate.email}</div>
                                  <div><strong>Experience:</strong> {selectedCandidate.experience}</div>
                                  <div><strong>Education:</strong> {selectedCandidate.education}</div>
                                  <div><strong>Location:</strong> {selectedCandidate.location}</div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold mb-2">Evaluation Summary</h4>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span>Relevance Score</span>
                                    <span className={`text-xl font-bold ${getScoreColor(selectedCandidate.relevanceScore)}`}>
                                      {selectedCandidate.relevanceScore}%
                                    </span>
                                  </div>
                                  <Progress 
                                    value={selectedCandidate.relevanceScore} 
                                    className="h-3"
                                  />
                                  <Badge className={getVerdictColor(selectedCandidate.verdict)}>
                                    {selectedCandidate.verdict} Suitability
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            
                            {/* Strengths & Gaps */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold mb-3 flex items-center space-x-2">
                                  <CheckCircle2 className="h-4 w-4 text-success" />
                                  <span>Strengths</span>
                                </h4>
                                <div className="space-y-2">
                                  {selectedCandidate.strengths.map((strength, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                      <CheckCircle2 className="h-3 w-3 text-success" />
                                      <span className="text-sm">{strength}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold mb-3 flex items-center space-x-2">
                                  <AlertCircle className="h-4 w-4 text-warning" />
                                  <span>Skill Gaps</span>
                                </h4>
                                <div className="space-y-2">
                                  {selectedCandidate.missingSkills.map((skill, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                      <AlertCircle className="h-3 w-3 text-warning" />
                                      <span className="text-sm">{skill}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            {/* Actions */}
                            <div className="flex justify-end space-x-3 pt-4 border-t">
                              <Button variant="outline">
                                <Download className="h-4 w-4 mr-2" />
                                Download Resume
                              </Button>
                              <Button className="bg-gradient-success">
                                <Star className="h-4 w-4 mr-2" />
                                Shortlist Candidate
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResults.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">
                No candidates match your current filters.
              </p>
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setJobFilter("all");
                setVerdictFilter("all");
                setLocationFilter("all");
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Results;