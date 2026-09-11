export default function Analysis() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-4xl font-bold text-cyan-400 mb-6">
        📋 Analysis Summary
      </h1>

      <div className="bg-slate-900 p-6 rounded-2xl mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Findings
        </h2>

        <ul className="space-y-3">
          <li>✅ Missing values found</li>
          <li>✅ Negative order count detected</li>
          <li>✅ Inconsistent customer types</li>
          <li>✅ Enterprise customers show higher churn</li>
        </ul>
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Recommended Actions
        </h2>

        <ul className="space-y-3">
          <li>1. Clean missing values</li>
          <li>2. Standardize customer types</li>
          <li>3. Remove invalid order counts</li>
          <li>4. Recalculate churn analysis</li>
        </ul>
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-3">
          Confidence Score
        </h2>

        <h1 className="text-5xl font-bold text-green-400">
          84%
        </h1>
      </div>

    </div>
  );
}