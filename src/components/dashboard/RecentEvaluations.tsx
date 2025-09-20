import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, Clock } from "lucide-react";

interface Evaluation {
  id: string;
  candidateName: string;
  jobTitle: string;
  score: number;
  verdict: "High" | "Medium" | "Low";
  submittedAt: string;
  location: string;
}

const mockEvaluations: Evaluation[] = [
  {
    id: "1",
    candidateName: "Priya Sharma",
    jobTitle: "Full Stack Developer",
    score: 92,
    verdict: "High",
    submittedAt: "2 hours ago",
    location: "Hyderabad"
  },
  {
    id: "2",
    candidateName: "Rajesh Kumar",
    jobTitle: "Data Scientist",
    score: 78,
    verdict: "Medium",
    submittedAt: "4 hours ago",
    location: "Bangalore"
  },
  {
    id: "3",
    candidateName: "Anjali Patel",
    jobTitle: "UI/UX Designer",
    score: 85,
    verdict: "High",
    submittedAt: "6 hours ago",
    location: "Pune"
  },
  {
    id: "4",
    candidateName: "Vikram Singh",
    jobTitle: "DevOps Engineer",
    score: 65,
    verdict: "Medium",
    submittedAt: "8 hours ago",
    location: "Delhi NCR"
  },
  {
    id: "5",
    candidateName: "Sneha Reddy",
    jobTitle: "Machine Learning Engineer",
    score: 88,
    verdict: "High",
    submittedAt: "1 day ago",
    location: "Hyderabad"
  }
];

const RecentEvaluations = () => {
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
    if (score >= 80) return "text-success font-semibold";
    if (score >= 60) return "text-warning font-semibold";
    return "text-destructive font-semibold";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Recent Evaluations</span>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockEvaluations.map((evaluation) => (
            <div 
              key={evaluation.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/30 animate-smooth"
            >
              <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                  <h4 className="font-medium">{evaluation.candidateName}</h4>
                  <p className="text-sm text-muted-foreground">
                    {evaluation.jobTitle} • {evaluation.location}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className={`text-lg font-semibold ${getScoreColor(evaluation.score)}`}>
                    {evaluation.score}%
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{evaluation.submittedAt}</span>
                  </div>
                </div>
                
                <Badge className={getVerdictColor(evaluation.verdict)}>
                  {evaluation.verdict}
                </Badge>
                
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentEvaluations;