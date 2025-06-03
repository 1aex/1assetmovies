import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Database, FileCheck, ShoppingBag, Shield, ChevronRight, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-gradient mb-4 md:mb-6 font-bold leading-tight">
              Your Story. Your Rights. On-Chain.
            </h1>
            <p className="text-xl md:text-2xl mb-8 md:mb-10 text-muted-foreground">
              Register, tokenize, license, and monetize your creative IP with the power of Story Protocol
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="bg-gradient-to-r from-ippurple to-ipblue hover:opacity-90 transition-opacity">
                <Link to="/register">
                  Register New IP
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-ippurple text-ippurple hover:bg-ippurple/10 transition-colors">
                <Link to="/dashboard">
                  My Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">Transform Your Creative Work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="ip-card ip-gradient-border">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-ippurple/10 flex items-center justify-center mb-2">
                  <Database className="h-5 w-5 text-ippurple" />
                </div>
                <CardTitle>Register IP</CardTitle>
                <CardDescription>
                  Register your creative works on-chain for provable ownership
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-ipblue" />
                    <span className="text-sm">Immutable proof of creation</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-ipblue" />
                    <span className="text-sm">Tokenize your IP assets</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-ipblue" />
                    <span className="text-sm">Supports multiple asset types</span>
                  </li>
                </ul>
                <Link to="/register" className="text-sm font-medium text-ippurple flex items-center group">
                  Register now
                  <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="ip-card ip-gradient-border">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-ippurple/10 flex items-center justify-center mb-2">
                  <FileCheck className="h-5 w-5 text-ippurple" />
                </div>
                <CardTitle>License Assets</CardTitle>
                <CardDescription>
                  Create and manage custom licenses for your IP
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-ipblue" />
                    <span className="text-sm">Predefined license templates</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-ipblue" />
                    <span className="text-sm">Custom terms and royalties</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-ipblue" />
                    <span className="text-sm">On-chain license verification</span>
                  </li>
                </ul>
                <Link to="/license" className="text-sm font-medium text-ippurple flex items-center group">
                  Explore licenses
                  <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="ip-card ip-gradient-border">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-ippurple/10 flex items-center justify-center mb-2">
                  <ShoppingBag className="h-5 w-5 text-ippurple" />
                </div>
                <CardTitle>IP Marketplace</CardTitle>
                <CardDescription>
                  Buy and sell IP licenses in a decentralized marketplace
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-ipblue" />
                    <span className="text-sm">Discover creative assets</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-ipblue" />
                    <span className="text-sm">Transparent royalty distribution</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-ipblue" />
                    <span className="text-sm">Mint license tokens instantly</span>
                  </li>
                </ul>
                <Link to="/marketplace" className="text-sm font-medium text-ippurple flex items-center group">
                  Visit marketplace
                  <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-12">How It Works</h2>
            
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-ippurple/10 flex items-center justify-center text-2xl font-bold text-ippurple">
                  1
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">Register Your IP</h3>
                  <p className="text-muted-foreground">
                    Upload your creative works and register them on-chain with Story Protocol. 
                    Get immutable proof of creation and ownership that lives forever on the blockchain.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-ippurple/10 flex items-center justify-center text-2xl font-bold text-ippurple">
                  2
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">Create License Terms</h3>
                  <p className="text-muted-foreground">
                    Define how others can use your IP with customizable license templates. 
                    Set royalty percentages, usage rights, and time periods for different use cases.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-ippurple/10 flex items-center justify-center text-2xl font-bold text-ippurple">
                  3
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">Monetize Your Creations</h3>
                  <p className="text-muted-foreground">
                    List your licenses on the marketplace or grant them directly to collaborators.
                    Track usage and collect royalties automatically through smart contracts.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <Button asChild size="lg" className="bg-gradient-to-r from-ippurple to-ipblue hover:opacity-90 transition-opacity">
                <Link to="/register">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-ippurple to-ipblue text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-6">Ready to Protect Your Creative Work?</h2>
            <p className="text-xl mb-8 text-white/80">
              Join thousands of creators who are securing their intellectual property on-chain with Story Protocol.
            </p>
            <Button size="lg" variant="secondary" asChild className="bg-white text-ippurple hover:bg-white/90">
              <Link to="/register">
                Register Your IP Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
