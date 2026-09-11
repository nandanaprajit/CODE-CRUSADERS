export default function Report() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-cyan-400 mb-6">
        🎉 Analysis Submitted
      </h1>

      <p className="text-xl text-gray-300 mb-8">
        Your data analysis has been successfully evaluated.
      </p>

      <div className="bg-slate-900 p-8 rounded-2xl text-center">
        <h2 className="text-2xl font-bold mb-4">
          Skill Assessment
        </h2>

        <p className="text-green-400 text-4xl font-bold">
          87%
        </p>

        <p className="mt-4 text-gray-400">
          Strong analytical thinking and problem-solving skills.
        </p>
      </div>
    </div>
  );
}