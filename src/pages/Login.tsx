import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BoxGeometry(5, 3, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
    const card = new THREE.Mesh(geometry, material);
    scene.add(card);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      card.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (canvasRef.current) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8 && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password);
  };

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters with 1 number and 1 special character');
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    navigate("/home");
  };

  const handleGoogleSignIn = () => {
    setError(null);
    console.log('Google Sign-In clicked. Implement backend authentication for production.');
    setIsLoggedIn(true);
    navigate('/home'); // Redirect to index.tsx page ("/")
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setError(null);
  };

  return (
    <div className="relative bg-gray-100 flex items-center justify-center h-screen">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition-transform duration-500 hover:scale-105">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        {isLoggedIn ? (
          <div className="text-center">
            <p className="text-lg text-green-600">Welcome, User!</p>
            <button
              onClick={handleSignOut}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <form onSubmit={handleEmailSignIn} className="w-full mb-4">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Sign in with Email
              </button>
            </form>
            <div className="w-full">
              <button
                onClick={handleGoogleSignIn}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                  <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.28-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                Sign in with Google
              </button>
            </div>
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
