'use client';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
    // In a real scenario, fetch this from your NestJS backend
    const [metrics, setMetrics] = useState({
        totalProducts: 0,
        inventoryValue: 0,
        lowStockProducts: 0,
        salesTotal: 0
    });

    return (
        <div className="min-h-screen bg-brand-champagne p-8"> {/*[cite: 2] */}
            <header className="mb-8 border-b-2 border-brand-emerald pb-4"> {/*[cite: 2] */}
                <h1 className="text-4xl font-bold text-brand-emerald">StockWise Analytics</h1> {/*[cite: 2] */}
                <p className="text-brand-emerald/80 mt-2 font-medium">Real-time inventory overview.</p> {/*[cite: 2] */}
            </header>

            {/* KPI Metrics Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard title="Total Products" value={metrics.totalProducts} />
                <MetricCard title="Inventory Value" value={`$${metrics.inventoryValue.toFixed(2)}`} />
                <MetricCard title="Low Stock Alerts" value={metrics.lowStockProducts} alert={true} />
                <MetricCard title="Total Sales" value={`$${metrics.salesTotal.toFixed(2)}`} />
            </div>

            {/* Chart Placeholders */}
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl bg-white p-6 shadow-sm border border-brand-emerald/20"> {/*[cite: 2] */}
                    <h3 className="text-xl font-bold text-brand-emerald mb-4">Sales Over Time</h3> {/*[cite: 2] */}
                    <div className="h-64 flex items-center justify-center bg-brand-champagne/30 rounded-lg text-brand-emerald/50"> {/*[cite: 2] */}
                        Chart Area (e.g., Recharts LineChart)
                    </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-sm border border-brand-emerald/20"> {/*[cite: 2] */}
                    <h3 className="text-xl font-bold text-brand-emerald mb-4">Inventory Movement</h3> {/*[cite: 2] */}
                    <div className="h-64 flex items-center justify-center bg-brand-champagne/30 rounded-lg text-brand-emerald/50"> {/*[cite: 2] */}
                        Chart Area (e.g., Recharts BarChart)
                    </div>
                </div>
            </div>
        </div>
    );
}

// Reusable Card Component
function MetricCard({ title, value, alert = false }: { title: string, value: string | number, alert?: boolean }) {
    return (
        <div className={`rounded-xl p-6 shadow-md ${alert ? 'bg-red-50 border border-red-200' : 'bg-brand-emerald'} transition-transform hover:scale-105`}> {/*[cite: 2] */}
            <p className={`text-sm font-semibold uppercase tracking-wider ${alert ? 'text-red-800' : 'text-brand-champagne'}`}> {/*[cite: 2] */}
                {title}
            </p>
            <p className={`text-3xl font-bold mt-2 ${alert ? 'text-red-600' : 'text-white'}`}>
                {value}
            </p>
        </div>
    );
}