import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { WalletProvider } from "@/contexts/WalletContext";
import HomePage from "@/pages/Index";
import RegisterPage from "@/pages/Register";
import LicensePage from "@/pages/License";
import MarketplacePage from "@/pages/Marketplace";
import DashboardPage from "@/pages/Dashboard";
import { Toaster as Sonner } from "@/components/ui/sonner";
import NotFound from "@/pages/NotFound";
import Login from "./pages/Login";
import ExplorerPage from "./pages/Explorer";
import MintPage from "./pages/Mint"; // <-- Import the new Mint page
import LicenseList from "./pages/LicenseList";
import LicenseByAsset from "./pages/LicenseByAsset";


const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WalletProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <main className="container py-6">
                <Routes>
                  <Route path="/" element={<Login />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/license/" element={<LicenseList />} />
                    <Route path="/license/:id" element={<LicensePage />} />
                    <Route path="/licensebyasset/:id" element={<LicenseByAsset />} />
                    <Route path="/marketplace" element={<MarketplacePage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/explorer/:id" element={<ExplorerPage />} />
                    <Route path="/mint/:id" element={<MintPage />} /> {/* <-- Update this line */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
            <Toaster />
            <Sonner />
          </Router>
        </WalletProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;