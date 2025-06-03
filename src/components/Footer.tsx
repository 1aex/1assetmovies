
import { Link } from "react-router-dom";
import { BookOpen, Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-ippurple to-ipblue rounded-md p-1">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">1AEX IP Vault</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Register, tokenize, license, and monetize your creative IP on-chain with Story Protocol.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link to="/register" className="text-muted-foreground hover:text-foreground transition-colors">Register IP</Link></li>
                <li><Link to="/group" className="text-muted-foreground hover:text-foreground transition-colors">Group IP</Link></li>
                <li><Link to="/license" className="text-muted-foreground hover:text-foreground transition-colors">Licensing Portal</Link></li>
                <li><Link to="/marketplace" className="text-muted-foreground hover:text-foreground transition-colors">Marketplace</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">API Reference</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Story Protocol</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} 1AEX IP Vault. All rights registered on-chain.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Powered by <a href="https://storyprotocol.xyz" className="underline hover:text-foreground transition-colors">Story Protocol</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
