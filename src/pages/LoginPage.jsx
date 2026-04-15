import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Spinner from "../components/ui/Spinner";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Login failed. Please try again.");
    }
    setIsLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
            <span className="text-white text-2xl font-bold">CRB</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            CRB Dashboard
          </h1>
          <p className="text-gray-600">Trap management system</p>
        </div>

        {/* Login Form Card */}
        <Card variant="elevated" padding="lg" className="w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Login</h2>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Email Input */}
            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={setEmail}
              disabled={isLoading}
              required
            />

            {/* Password Input */}
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={setPassword}
              disabled={isLoading}
              required
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              disabled={isLoading}
              loading={isLoading}
              className="bg-primary-600 hover:bg-primary-700 py-3 text-base"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm">
              Demo credentials available from your administrator
            </p>
          </div>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>
            For support:{" "}
            <a
              href="mailto:support@example.com"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Contact Admin
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
