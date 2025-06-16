
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info } from 'lucide-react';

interface StepItemProps {
    number: number;
    text: string;
    buttonText: string;
    to?: string;
    disabled?: boolean;
    onClick?: () => void;
}

const StepItem = ({ number, text, buttonText, to, disabled = false, onClick }: StepItemProps) => {
    const buttonContent = (
        <Button disabled={disabled} onClick={onClick}>
            {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
    );

    return (
        <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                    {number}
                </div>
                <p className="font-medium">{text}</p>
            </div>
            <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-gray-400" />
                {to && !disabled ? <Link to={to}>{buttonContent}</Link> : buttonContent}
            </div>
        </div>
    );
};

export default StepItem;
