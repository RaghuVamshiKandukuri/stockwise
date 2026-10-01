'use client';

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brand-emerald">Products</h1>
          <p className="text-gray-600">Manage your organization's product catalog.</p>
        </div>
        <button className="bg-brand-emerald text-brand-champagne px-4 py-2 rounded-lg font-medium hover:bg-emerald-900 transition-colors">
          + Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-brand-emerald/10 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <input 
            type="text" 
            placeholder="Search products by name, SKU, or barcode..." 
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-emerald/20"
          />
          <button className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
            Filter
          </button>
        </div>
        
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-champagne/30 text-brand-emerald">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">SKU</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Price</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Placeholder Row */}
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="p-4 font-medium text-gray-900">Organic Milk 1L</td>
              <td className="p-4 text-gray-500">MILK-ORG-1L</td>
              <td className="p-4 text-gray-500">Dairy</td>
              <td className="p-4 text-gray-900">$4.99</td>
              <td className="p-4">
                <button className="text-blue-600 hover:underline mr-3">Edit</button>
                <button className="text-red-600 hover:underline">Archive</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}