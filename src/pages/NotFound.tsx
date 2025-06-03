
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-16 px-4 text-center">
        <FileQuestion className="h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved to another URL.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="bg-gradient-to-r from-ippurple to-ipblue hover:opacity-90 transition-opacity">
            <Link to="/">
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/register">
              Register IP
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
