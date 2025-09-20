import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  BarChart3, 
  FileText, 
  Users, 
  Settings,
  LogOut
} from "lucide-react";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Resume Check</h1>
            <p className="text-xs text-muted-foreground">Innomatics Labs</p>
          </div>
        </div>

        <nav className="flex items-center space-x-6 ml-8">
          <Link to="/">
            <Button 
              variant={isActive("/") ? "default" : "ghost"} 
              size="sm"
              className="flex items-center space-x-2"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Button>
          </Link>
          
          <Link to="/jobs">
            <Button 
              variant={isActive("/jobs") ? "default" : "ghost"} 
              size="sm"
              className="flex items-center space-x-2"
            >
              <FileText className="h-4 w-4" />
              <span>Jobs</span>
            </Button>
          </Link>
          
          <Link to="/results">
            <Button 
              variant={isActive("/results") ? "default" : "ghost"} 
              size="sm"
              className="flex items-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>Results</span>
            </Button>
          </Link>
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          <Badge variant="secondary" className="font-medium">
            Placement Team
          </Badge>
          
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="sm">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;