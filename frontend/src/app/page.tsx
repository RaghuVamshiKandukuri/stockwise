import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8E7C9] font-sans flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-[#064E3B] px-6 py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#F8E7C9] tracking-tight">
            StockWise
          </h1>
          <div className="flex gap-3">
            <Link
              href="/login"
              className="rounded-md px-4 py-2 text-sm font-semibold text-[#F8E7C9] hover:bg-[#F8E7C9] hover:text-[#064E3B] transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-[#F8E7C9] px-4 py-2 text-sm font-semibold text-[#064E3B] hover:bg-white transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero / Project Description */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-3xl w-full text-center">
          <span className="inline-block mb-4 rounded-full bg-[#064E3B]/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#064E3B]">
            Inventory Management Platform
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#064E3B] mb-6 leading-tight">
            Smarter Inventory. <br />
            Better Business Decisions.
          </h1>

          <p className="text-lg text-[#064E3B]/80 leading-relaxed mb-4">
            <strong>StockWise</strong> is an inventory management platform that helps
            businesses track products, stock, warehouses, suppliers, purchases, sales,
            expiry, and inventory insights — all in one place.
          </p>

          <p className="text-base text-[#064E3B]/70 leading-relaxed mb-10">
            It exists to eliminate stockouts, overstocking, expired products, and manual
            tracking. Every stock movement is recorded, every purchase is informed, and
            every role — from Owner to Viewer — has the right access.
          </p>

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="rounded-full bg-[#064E3B] px-8 py-3 text-base font-semibold text-[#F8E7C9] shadow-lg hover:bg-[#053a2c] hover:scale-[1.02] transition-all"
            >
              Create an Account
            </Link>
            <Link
              href="/login"
              className="rounded-full border-2 border-[#064E3B] px-8 py-3 text-base font-semibold text-[#064E3B] hover:bg-[#064E3B] hover:text-[#F8E7C9] transition-all"
            >
              Log In
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#064E3B] py-6 px-6 text-center">
        <p className="text-[#F8E7C9]/60 text-sm">
          © {new Date().getFullYear()} StockWise — Track. Manage. Grow.
        </p>
      </footer>
    </div>
  );
}