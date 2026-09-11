import Link from "next/link";
export default function Dashboard() {
  const customers = [
    {
      id: "C001",
      age: 21,
      orders: 4,
      amount: "₹500",
      type: "Enterprise",
      churn: "No",
    },
    {
      id: "C002",
      age: 34,
      orders: -2,
      amount: "₹800",
      type: "enterprise",
      churn: "Yes",
    },
    {
      id: "C003",
      age: "—",
      orders: 7,
      amount: "₹1200",
      type: "ENT",
      churn: "No",
    },
    {
      id: "C004",
      age: 29,
      orders: 2,
      amount: "₹300",
      type: "Enterprise",
      churn: "Yes",
    },
    {
      id: "C005",
      age: 42,
      orders: 12,
      amount: "₹4500",
      type: "Corporate",
      churn: "No",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center px-8 py-5 border-b border-slate-800 bg-slate-900">

        <div>
          <h1 className="text-3xl font-bold text-cyan-400">
            🏢 ShopPulse Operations
          </h1>
          <p className="text-gray-400">
            Data Analyst Simulation Workspace
          </p>
        </div>

        <div className="flex gap-4 items-center">
          <div className="bg-slate-800 px-5 py-2 rounded-xl">
            ⏱️ 09:43
          </div>

         <Link
  href="/report"
  className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-xl font-semibold"
>
  Submit Analysis
</Link>
        </div>

      </div>

      <div className="p-8">

        {/* KPI CARDS */}
        <div className="grid md:grid-cols-4 gap-5 mb-8">

          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
            <p className="text-gray-400">👥 Customers</p>
            <h2 className="text-4xl font-bold mt-2">2,431</h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
            <p className="text-gray-400">💰 Revenue</p>
            <h2 className="text-4xl font-bold text-green-400 mt-2">
              ₹8.4L
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
            <p className="text-gray-400">📉 Churn Rate</p>
            <h2 className="text-4xl font-bold text-red-400 mt-2">
              12%
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
            <p className="text-gray-400">⚠️ Risk Customers</p>
            <h2 className="text-4xl font-bold text-yellow-400 mt-2">
              186
            </h2>
          </div>

        </div>

        {/* CONTROLS */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">

          <input
            type="text"
            placeholder="🔍 Search customer..."
            className="bg-slate-900 border border-slate-700 p-3 rounded-xl"
          />

          <select className="bg-slate-900 border border-slate-700 p-3 rounded-xl">
            <option>All Customer Types</option>
            <option>Enterprise</option>
            <option>Corporate</option>
            <option>Churn Risk</option>
          </select>

          <input
            type="text"
            placeholder="Enter SQL / Formula..."
            className="bg-slate-900 border border-slate-700 p-3 rounded-xl"
          />

        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* DATASET */}
          <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              📊 Customer Dataset
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left p-3">Customer</th>
                    <th className="text-left p-3">Age</th>
                    <th className="text-left p-3">Orders</th>
                    <th className="text-left p-3">Amount</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Churn</th>
                  </tr>
                </thead>

                <tbody>
                  {customers.map((c, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-800 hover:bg-slate-800"
                    >
                      <td className="p-3">{c.id}</td>
                      <td className="p-3">{c.age}</td>
                      <td className="p-3">{c.orders}</td>
                      <td className="p-3">{c.amount}</td>
                      <td className="p-3">{c.type}</td>
                      <td className="p-3">{c.churn}</td>
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>

          </div>

          {/* RIGHT PANEL */}
          <div className="space-y-6">

            <div className="bg-slate-900 p-6 rounded-2xl">
              <h2 className="text-xl font-bold mb-4">
                🤖 AI Insights
              </h2>

              <ul className="space-y-3 text-gray-300">
                <li>• Missing age values detected</li>
                <li>• Negative order count found</li>
                <li>• Inconsistent customer types</li>
                <li>• Enterprise users show high churn</li>
              </ul>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl">
              <h2 className="text-xl font-bold mb-4">
                📈 Churn Trend
              </h2>

              <div className="h-48 flex items-end gap-3">
                <div className="w-10 h-20 bg-cyan-500 rounded"></div>
                <div className="w-10 h-28 bg-cyan-500 rounded"></div>
                <div className="w-10 h-36 bg-cyan-500 rounded"></div>
                <div className="w-10 h-24 bg-cyan-500 rounded"></div>
                <div className="w-10 h-40 bg-cyan-500 rounded"></div>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl">
              <h2 className="text-xl font-bold mb-2">
                🎯 Data Quality Score
              </h2>

              <h1 className="text-5xl font-bold text-cyan-400">
                78%
              </h1>

              <p className="text-gray-400 mt-2">
                Dataset contains missing values and inconsistent labels.
              </p>
            </div>

          </div>

        </div>

        {/* INCIDENT */}
        <div className="mt-8 bg-red-950 border border-red-500 rounded-2xl p-6">

          <h2 className="text-2xl font-bold text-red-400 mb-2">
            🚨 URGENT INCIDENT
          </h2>

          <p className="text-gray-200">
            Marketing has changed the customer classification system.
            Previous customer_type labels are now deprecated.
            Recalculate your analysis before submitting.
          </p>

        </div>

      </div>

    </div>
  );
}