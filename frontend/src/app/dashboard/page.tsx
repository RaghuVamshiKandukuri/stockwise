export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Welcome to your StockWise overview.</p>
            </header>
            <div className="grid gap-6 md:grid-cols-3">
                {/* Widget placeholders */}
                <div className="rounded-lg bg-white p-6 shadow-sm">Total Products</div>
                <div className="rounded-lg bg-white p-6 shadow-sm">Low Stock Alerts</div>
                <div className="rounded-lg bg-white p-6 shadow-sm">Recent Activity</div>
            </div>
        </div>
    );
}