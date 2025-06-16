
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Film } from 'lucide-react';
import Layout from "@/components/Layout";
import StepItem from "@/components/home/StepItem";
import { useWallet } from "@/contexts/WalletContext";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useToast } from "@/components/ui/use-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export const HomePage = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const { userAddress, connectUserWallet } = useWallet();
    const [termsChecked, setTermsChecked] = useState(false);
    const [solicitationChecked, setSolicitationChecked] = useState(false);
    const { toast } = useToast();
    const [isBindingDialogOpen, setIsBindingDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.user_metadata?.wallet_address) {
                navigate('/dashboard');
                return;
            }
            setUser(user);
            if (user) {
                setUserId(user.id);
            }
        };

        getUser();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                const currentUser = session?.user;
                if (_event === 'SIGNED_IN' && currentUser?.user_metadata?.wallet_address) {
                    navigate('/dashboard');
                    return;
                }
                setUser(currentUser ?? null);
                setUserId(currentUser?.id ?? null);
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [navigate]);

    const isSignedIn = !!userId;
    const isWalletConnected = !!userAddress;

    const isStep1Complete = isSignedIn;
    const isStep2Complete = false; // KYC not implemented
    const isStep3Complete = isWalletConnected;
    const isStep4Complete = !!user?.user_metadata?.wallet_address;

    const allStepsCompleteForMinting = isStep1Complete && isStep3Complete && isStep4Complete;
    const allAgreementsChecked = termsChecked && solicitationChecked;
    const canMint = allStepsCompleteForMinting && allAgreementsChecked;

    const handleBindWallet = async () => {
        if (!user) {
            toast({
                title: "Error",
                description: "You must be signed in to bind a wallet.",
                variant: "destructive",
            });
            return;
        }
        setIsBindingDialogOpen(true);
    };

    const confirmBindWallet = async () => {
        if (!user || !userAddress) return;

        const { data, error } = await supabase.auth.updateUser({
            data: { wallet_address: userAddress }
        });

        if (error) {
            toast({
                title: "Binding Failed",
                description: error.message,
                variant: "destructive",
            });
        } else if (data.user) {
            toast({
                title: "Success!",
                description: "Your wallet has been bound to your account.",
            });
            setUser(data.user);
            setIsBindingDialogOpen(false);
        }
    };

    return (
        <Layout>
            <div className="w-full flex flex-col items-center">
                <div className="w-full max-w-4xl">
                    <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 flex items-center mb-6">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                    <Card className="w-full shadow-lg">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="bg-primary text-primary-foreground rounded-lg p-3">
                                    <Film className="h-8 w-8" />
                                </div>
                                <div>
                                    <CardTitle className="text-3xl font-bold">Movie Asset Minting</CardTitle>
                                    <p className="text-muted-foreground">Follow the steps to mint your movie asset.</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-2">
                            <div className="space-y-4">
                                <StepItem number={1} text="Sign in to your account" buttonText="Sign in" to="/login" disabled={isStep1Complete} />
                                <StepItem number={2} text="Complete L2 Verification (KYC)" buttonText="Verify" disabled={true} />
                                <StepItem number={3} text="Connect your Web3 wallet" buttonText="Connect" disabled={!isStep1Complete || isStep3Complete} onClick={connectUserWallet} />
                                <StepItem number={4} text="Bind the wallet to your account" buttonText="Bind" disabled={!isStep1Complete || !isStep3Complete || isStep4Complete} onClick={handleBindWallet} />
                            </div>

                            <div className="space-y-3 pt-4 border-t mt-6">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms" checked={termsChecked} onCheckedChange={(checked: CheckedState) => setTermsChecked(!!checked)} />
                                    <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        I have read and agree to token terms and conditions
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="non-solicitation" checked={solicitationChecked} onCheckedChange={(checked: CheckedState) => setSolicitationChecked(!!checked)} />
                                    <label htmlFor="non-solicitation" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        I have read and agree to Non-Solicitation Declarations
                                    </label>
                                </div>
                            </div>

                            <Button size="lg" className="w-full mt-4" disabled={!canMint} onClick={() => navigate('/dashboard')}>
                                Start to mint
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <AlertDialog open={isBindingDialogOpen} onOpenChange={setIsBindingDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Wallet Binding</AlertDialogTitle>
                        <AlertDialogDescription>
                            Please confirm that you want to bind the following wallet address to your account. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="space-y-2 py-4 text-sm">
                        <p><span className="font-semibold text-gray-600">Email:</span> {user?.email}</p>
                        <p><span className="font-semibold text-gray-600">Wallet Address:</span> <span className="break-all">{userAddress}</span></p>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmBindWallet}>Confirm & Bind</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Layout>
    );
};
