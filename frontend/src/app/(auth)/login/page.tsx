import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#F8E7C9] font-sans flex flex-col">
            {/* Minimal Top Navigation */}
            <nav className="bg-[#064E3B] px-6 py-4 shadow-md">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-[#F8E7C9] tracking-tight hover:opacity-90 transition-opacity">
                        StockWise
                    </Link>
                    <Link
                        href="/register"
                        className="rounded-md px-4 py-2 text-sm font-semibold text-[#F8E7C9] hover:bg-[#F8E7C9] hover:text-[#064E3B] transition-colors"
                    >
                        Register
                    </Link>
                </div>
            </nav>

            {/* Login Form Container */}
            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#064E3B]/10">

                    <div className="bg-[#064E3B] px-8 py-6 text-center">
                        <h2 className="text-2xl font-bold text-[#F8E7C9]">Welcome Back</h2>
                        <p className="text-[#F8E7C9]/80 text-sm mt-2">
                            Log in to manage your inventory.
                        </p>
                    </div>

                    <div className="p-8">
                        <form className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-[#064E3B] mb-1" htmlFor="email">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#064E3B] focus:border-transparent text-gray-900 bg-gray-50 focus:bg-white transition-colors"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <label className="block text-sm font-semibold text-[#064E3B]" htmlFor="password">
                                        Password
                                    </label>
                                    <Link href="/forgot-password" className="text-sm font-medium text-[#064E3B] hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#064E3B] focus:border-transparent text-gray-900 bg-gray-50 focus:bg-white transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-[#064E3B] py-3 text-base font-bold text-[#F8E7C9] hover:bg-[#053a2c] transition-colors mt-2 shadow-md hover:shadow-lg active:scale-[0.98]"
                            >
                                Log In
                            </button>
                        </form>

                        <p className="text-center text-sm text-gray-600 mt-6">
                            Don't have an account?{' '}
                            <Link href="/register" className="font-semibold text-[#064E3B] hover:underline">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}