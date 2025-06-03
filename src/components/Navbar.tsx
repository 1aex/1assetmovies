import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/contexts/WalletContext";
import {
  BookOpen,
  Database,
  FileCheck,
  ShoppingBag,
  BarChart2,
  Wallet,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    activeWallet,
    isCommonWallet,
    isUserWallet,
    connectCommonWallet,
    connectUserWallet,
    disconnectCommonWallet,
    disconnectUserWallet,
    switchToCommonWallet,
    switchToUserWallet,
  } = useWallet();

  const handleConnectWallet = async () => {
    if (isCommonWallet || isUserWallet) {
      setDropdownOpen(true);
      return;
    }
    await connectUserWallet();
  };

  const handleDisconnect = () => {
    if (isCommonWallet) {
      disconnectCommonWallet();
    } else if (isUserWallet) {
      disconnectUserWallet();
    }
    setDropdownOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Home", path: "/", icon: BookOpen },
    { name: "Register IP", path: "/register", icon: Database },
    { name: "License", path: "/license", icon: FileCheck },
    { name: "Marketplace", path: "/marketplace", icon: ShoppingBag },
    { name: "Dashboard", path: "/dashboard", icon: BarChart2 },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">IP Vault</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? "text-foreground"
                    : "text-foreground/60"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <div className="relative flex items-center">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleConnectWallet}
              >
                <Wallet className="h-4 w-4" />
                {activeWallet.address ? (
                  <span>{activeWallet.balance} IP</span>
                ) : (
                  <span>Connect Wallet</span>
                )}
              </Button>
              {(isCommonWallet || isUserWallet) && (
                <div className="relative">
                  <button
                    className="ml-1 px-2 py-2 rounded hover:bg-muted transition-colors"
                    onClick={() => setDropdownOpen((open) => !open)}
                    type="button"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                      <div className="p-2 border-b">
                        <div className="text-sm font-medium">Wallet Mode</div>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            size="sm"
                            variant={isCommonWallet ? "default" : "outline"}
                            onClick={switchToCommonWallet}
                          >
                            Common
                          </Button>
                          <Button
                            size="sm"
                            variant={isUserWallet ? "default" : "outline"}
                            onClick={switchToUserWallet}
                          >
                            Personal
                          </Button>
                        </div>
                      </div>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={handleDisconnect}
                      >
                        Disconnect
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => {
                toggleMenu();
                setDropdownOpen(false);
              }}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-muted transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === link.path
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-muted"
              }`}
              onClick={() => {
                setIsOpen(false);
                setDropdownOpen(false);
              }}
            >
              <link.icon className="h-5 w-5" />
              <span>{link.name}</span>
            </Link>
          ))}
          <div className="mt-4 px-3 space-y-2">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={handleConnectWallet}
            >
              <Wallet className="h-4 w-4" />
              {activeWallet.address ? (
                <span>{activeWallet.balance} IP</span>
              ) : (
                <span>Connect Wallet</span>
              )}
            </Button>
            {(isCommonWallet || isUserWallet) && (
              <div className="space-y-2">
                <div className="text-sm font-medium px-2">Wallet Mode</div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant={isCommonWallet ? "default" : "outline"}
                    className="flex-1"
                    onClick={switchToCommonWallet}
                  >
                    Common
                  </Button>
                  <Button
                    size="sm"
                    variant={isUserWallet ? "default" : "outline"}
                    className="flex-1"
                    onClick={switchToUserWallet}
                  >
                    Personal
                  </Button>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleDisconnect}
                >
                  Disconnect
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
