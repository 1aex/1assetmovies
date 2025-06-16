import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Account, Address } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import detectEthereumProvider from '@metamask/detect-provider';

// Add type for MetaMask provider
type MetaMaskProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  removeListener: (event: string, callback: (...args: unknown[]) => void) => void;
  isMetaMask?: boolean;
};

type MetaMaskError = {
  code: number;
  message: string;
};

interface WalletContextType {
  // Common wallet (from .env)
  commonWallet: Account | null;
  commonAddress: Address | null;
  commonBalance: string | null;
  isCommonWallet: boolean;
  
  // User wallet (MetaMask)
  userWallet: MetaMaskProvider | null;
  userAddress: Address | null;
  userBalance: string | null;
  isUserWallet: boolean;
  
  // Wallet operations
  connectCommonWallet: () => Promise<void>;
  connectUserWallet: () => Promise<void>;
  disconnectCommonWallet: () => void;
  disconnectUserWallet: () => void;
  switchToCommonWallet: () => Promise<void>;
  switchToUserWallet: () => Promise<void>;
  
  // Active wallet info
  activeWallet: {
    type: 'common' | 'user' | null;
    address: Address | null;
    balance: string | null;
  };
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  
  // Common wallet state
  const [commonWallet, setCommonWallet] = useState<Account | null>(null);
  const [commonAddress, setCommonAddress] = useState<Address | null>(null);
  const [commonBalance, setCommonBalance] = useState<string | null>(null);
  const [isCommonWallet, setIsCommonWallet] = useState(false);
  
  // User wallet state
  const [userWallet, setUserWallet] = useState<MetaMaskProvider | null>(null);
  const [userAddress, setUserAddress] = useState<Address | null>(null);
  const [userBalance, setUserBalance] = useState<string | null>(null);
  const [isUserWallet, setIsUserWallet] = useState(false);

  useEffect(() => {
    // Check for a previously connected wallet address in localStorage
    const storedAddress = localStorage.getItem('walletAddress');
    if (storedAddress) {
        setUserAddress(storedAddress as Address);
        setIsUserWallet(true);
        // You might want to update balance here as well
    }
  }, []);

  useEffect(() => {
    if (userAddress) {
      localStorage.setItem('walletAddress', userAddress);
    } else {
      localStorage.removeItem('walletAddress');
    }
  }, [userAddress]);
  
  const handleAccountsChanged = useCallback(async (...args: unknown[]) => {
    const accounts = args[0] as string[];
    if (accounts.length === 0) {
      disconnectUserWallet();
    } else {
      setUserAddress(accounts[0] as Address);
      await updateUserBalance(accounts[0]);
    }
  }, []);

  const handleChainChanged = useCallback(() => {
    window.location.reload();
  }, []);

  const handleDisconnect = useCallback(() => {
    disconnectUserWallet();
  }, []);

  // Initialize common wallet from .env
  useEffect(() => {
    try {
      const privateKey = import.meta.env.VITE_WALLET_PRIVATE_KEY;
      if (privateKey) {
        const account = privateKeyToAccount(`0x${privateKey}` as Address);
        setCommonWallet(account);
        setCommonAddress(account.address);
        // You might want to fetch the balance here
      }
    } catch (error) {
      console.error("Error initializing common wallet:", error);
    }
  }, []);

  // Initialize MetaMask provider
  useEffect(() => {
    const initProvider = async () => {
      const provider = await detectEthereumProvider() as MetaMaskProvider;
      if (provider && provider.isMetaMask) {
        setUserWallet(provider);
        // Add event listeners
        provider.on('accountsChanged', handleAccountsChanged);
        provider.on('chainChanged', handleChainChanged);
        provider.on('disconnect', handleDisconnect);
      }
    };
    initProvider();
    return () => {
      if (userWallet) {
        userWallet.removeListener('accountsChanged', handleAccountsChanged);
        userWallet.removeListener('chainChanged', handleChainChanged);
        userWallet.removeListener('disconnect', handleDisconnect);
      }
    };
  }, [handleAccountsChanged, handleChainChanged, handleDisconnect, userWallet]);

  const updateUserBalance = async (address: string) => {
    if (!userWallet) return;
    try {
      const rawBalance = await userWallet.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      }) as string;
      const ethBalance = Number((BigInt(rawBalance) / 10n ** 14n)) / 10000;
      setUserBalance(ethBalance.toFixed(4));
    } catch (error) {
      console.error("Error fetching user balance:", error);
    }
  };

  const connectCommonWallet = async () => {
    if (isUserWallet) {
      const confirmed = window.confirm(
        "You are currently connected to your personal wallet. Connecting to the common wallet will disconnect your personal wallet. Do you want to continue?"
      );
      if (!confirmed) return;
      disconnectUserWallet();
    }
    
    setIsCommonWallet(true);
    setIsUserWallet(false);
    toast({
      title: "Common Wallet Connected",
      description: "You are now using the common wallet.",
    });
  };

  const connectUserWallet = async () => {
    if (!userWallet) {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask to connect your wallet.",
      });
      return;
    }

    if (isCommonWallet) {
      const confirmed = window.confirm(
        "You are currently connected to the common wallet. Connecting to your personal wallet will disconnect the common wallet. Do you want to continue?"
      );
      if (!confirmed) return;
      disconnectCommonWallet();
    }

    try {
      const chainId = "0x" + parseInt("1315", 10).toString(16);
      const accounts = await userWallet.request({ method: "eth_requestAccounts" }) as string[];
      
      if (accounts && accounts.length > 0) {
        const currentChainId = await userWallet.request({ method: "eth_chainId" }) as string;
        if (currentChainId !== chainId) {
          try {
            await userWallet.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId }],
            });
          } catch (switchError: unknown) {
            const error = switchError as MetaMaskError;
            if (error.code === 4902) {
              try {
                await userWallet.request({
                  method: "wallet_addEthereumChain",
                  params: [{
                    chainId,
                    chainName: "IP Vault Network",
                    nativeCurrency: {
                      name: "IP",
                      symbol: "IP",
                      decimals: 18
                    },
                    rpcUrls: ["https://rpc.ipvault.network"],
                    blockExplorerUrls: ["https://explorer.ipvault.network"]
                  }],
                });
              } catch (addError) {
                console.error("Error adding chain:", addError);
                toast({
                  title: "Network Error",
                  description: "Failed to add IP Vault Network to MetaMask.",
                });
                return;
              }
            } else {
              console.error("Error switching chain:", error);
              toast({
                title: "Network Error",
                description: "Failed to switch to IP Vault Network.",
              });
              return;
            }
          }
        }

        setUserAddress(accounts[0] as Address);
        await updateUserBalance(accounts[0]);
        setIsUserWallet(true);
        setIsCommonWallet(false);
        toast({
          title: "Personal Wallet Connected",
          description: "You are now using your personal wallet.",
        });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to connect wallet.";
      toast({
        title: "Connection Error",
        description: errorMessage,
      });
    }
  };

  const disconnectCommonWallet = () => {
    setIsCommonWallet(false);
    setCommonBalance(null);
    toast({
      title: "Common Wallet Disconnected",
      description: "You have disconnected the common wallet.",
    });
  };

  const disconnectUserWallet = () => {
    setIsUserWallet(false);
    setUserAddress(null);
    setUserBalance(null);
    toast({
      title: "Personal Wallet Disconnected",
      description: "You have disconnected your personal wallet.",
    });
  };

  const switchToCommonWallet = async () => {
    if (isUserWallet) {
      const confirmed = window.confirm(
        "You are currently connected to your personal wallet. Switching to the common wallet will disconnect your personal wallet. Do you want to continue?"
      );
      if (!confirmed) return;
      disconnectUserWallet();
    }
    await connectCommonWallet();
  };

  const switchToUserWallet = async () => {
    if (isCommonWallet) {
      const confirmed = window.confirm(
        "You are currently connected to the common wallet. Switching to your personal wallet will disconnect the common wallet. Do you want to continue?"
      );
      if (!confirmed) return;
      disconnectCommonWallet();
    }
    await connectUserWallet();
  };

  const value: WalletContextType = {
    commonWallet,
    commonAddress,
    commonBalance,
    isCommonWallet,
    userWallet,
    userAddress,
    userBalance,
    isUserWallet,
    connectCommonWallet,
    connectUserWallet,
    disconnectCommonWallet,
    disconnectUserWallet,
    switchToCommonWallet,
    switchToUserWallet,
    activeWallet: {
      type: isCommonWallet ? 'common' : isUserWallet ? 'user' : null,
      address: isCommonWallet ? commonAddress : isUserWallet ? userAddress : null,
      balance: isCommonWallet ? commonBalance : isUserWallet ? userBalance : null,
    },
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

export { useWallet, WalletProvider };
