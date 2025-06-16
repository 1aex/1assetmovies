
import AuthForm from '@/components/auth/AuthForm';

const Login = () => {
    return (
        <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
            {/* Left side */}
            <div className="hidden lg:flex bg-gray-100 p-12 flex-col justify-between" style={{ background: "linear-gradient(145deg, #2c5282, #3b82f6)" }}>
                <div>
                    <h1 className="text-white text-2xl font-bold">1AssetMovies</h1>
                </div>
                <div className="my-auto">
                    <h2 className="text-white text-5xl font-bold leading-tight">Your Movies.<br /> On-Chain.</h2>
                    <p className="text-white/80 mt-4 max-w-md">
                        1AssetMovies pioneers a new era of film where creative IP is seamlessly tokenized, licensed, and monetized in a unified ecosystem.
                    </p>
                </div>
                <div className="text-white/50 text-xs">
                    <p>ALL RIGHTS RESERVED © 2024 1AssetMovies</p>
                    <p>Terms of Use | Privacy Policy</p>
                </div>
            </div>
            {/* Right side */}
            <div className="flex items-center justify-center p-6 lg:p-12 bg-white">
                <AuthForm />
            </div>
        </div>
    )
}

export default Login;
