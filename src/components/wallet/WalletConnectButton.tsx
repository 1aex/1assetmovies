
import { Button, ButtonProps } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WalletConnectButtonProps extends ButtonProps {
  showIcon?: boolean;
  fullWidth?: boolean;
}

export const WalletConnectButton = ({ 
  showIcon = true, 
  fullWidth = false,
  className,
  children,
  ...props 
}: WalletConnectButtonProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  
  const handleConnectWallet = () => {
    toast({
      title: "Wallet Connected",
      description: "Your wallet has been connected successfully (demo).",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`gap-2 ${fullWidth ? 'w-full' : ''} ${className}`}
          {...props}
        >
          {showIcon && <Wallet className="h-4 w-4" />}
          {children || <span>Connect Wallet</span>}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Connect your wallet to interact with the IP Vault platform. This feature will be fully implemented in Phase II.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="walletAddress" className="text-right">
              Address
            </Label>
            <Input
              id="walletAddress"
              defaultValue="0x1234...5678"
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <Button className="w-full flex justify-between items-center py-6" onClick={handleConnectWallet}>
              <span>Metamask</span>
              <img src="https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg" className="h-6 w-6" alt="Metamask" />
            </Button>
            <Button variant="outline" className="w-full flex justify-between items-center py-6" onClick={handleConnectWallet}>
              <span>WalletConnect</span>
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.58818 11.8556C13.1598 8.39744 18.8402 8.39744 22.4118 11.8556L22.8733 12.3028C23.0683 12.4921 23.0683 12.8029 22.8733 12.9921L21.0703 14.7486C20.9727 14.8432 20.8153 14.8432 20.7178 14.7486L20.0783 14.1335C17.7497 11.8765 14.2503 11.8765 11.9217 14.1335L11.2378 14.7936C11.1402 14.8883 10.9828 14.8883 10.8853 14.7936L9.08226 13.0372C8.88728 12.8479 8.88728 12.5371 9.08226 12.3479L9.58818 11.8556ZM26.3072 15.6189L27.9074 17.1735C28.1023 17.3628 28.1023 17.6736 27.9074 17.8629L21.0703 24.4856C20.8753 24.6749 20.5604 24.6749 20.3655 24.4856C20.3655 24.4856 20.3655 24.4856 20.3655 24.4856L15.6845 19.9595C15.6357 19.9121 15.5566 19.9121 15.5078 19.9595C15.5078 19.9595 15.5078 19.9595 15.5078 19.9595L10.8269 24.4856C10.6319 24.6749 10.317 24.6749 10.1221 24.4856C10.1221 24.4856 10.122 24.4856 10.122 24.4856L3.28487 17.8629C3.08989 17.6736 3.08989 17.3628 3.28487 17.1735L4.88508 15.6189C5.08006 15.4296 5.39492 15.4296 5.58991 15.6189L10.2709 20.1451C10.3196 20.1925 10.3987 20.1925 10.4475 20.1451C10.4475 20.1451 10.4475 20.145 10.4475 20.145L15.1284 15.6189C15.3234 15.4296 15.6383 15.4296 15.8332 15.6189C15.8332 15.6189 15.8332 15.6189 15.8332 15.6189L20.5141 20.145C20.5629 20.1925 20.642 20.1925 20.6908 20.145L25.3717 15.6189C25.5667 15.4296 25.8816 15.4296 26.0765 15.6189L26.3072 15.6189Z" fill="#3B99FC"/>
              </svg>
            </Button>
            <Button variant="outline" className="w-full flex justify-between items-center py-6" onClick={handleConnectWallet}>
              <span>Coinbase Wallet</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#0052FF"/>
                <path d="M12.0001 4.80005C8.00008 4.80005 4.80008 8.00005 4.80008 12C4.80008 16 8.00008 19.2 12.0001 19.2C16.0001 19.2 19.2001 16 19.2001 12C19.2001 8.00005 16.0001 4.80005 12.0001 4.80005ZM9.60008 14.4001C8.80008 14.4001 8.00008 13.6 8.00008 12.8C8.00008 12 8.80008 11.2001 9.60008 11.2001C10.4001 11.2001 11.2001 12 11.2001 12.8C11.2001 13.6 10.4001 14.4001 9.60008 14.4001ZM14.4001 14.4001C13.6001 14.4001 12.8 13.6 12.8 12.8C12.8 12 13.6001 11.2001 14.4001 11.2001C15.2001 11.2001 16.0001 12 16.0001 12.8C16.0001 13.6 15.2001 14.4001 14.4001 14.4001Z" fill="white"/>
              </svg>
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
