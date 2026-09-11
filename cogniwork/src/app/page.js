import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Top Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-cyan-400">
          🚀 CogniWork
        </h1>

        <Link
          href="/dashboard"
          className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg font-semibold"
        >
          Start Simulation
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-24">

        <h1 className="text-6xl font-bold mb-6">
          Future Career
          <span className="text-cyan-400"> Simulation</span>
        </h1>

        <p className="text-xl text-gray-300 max-w-3xl">
          Experience a real workplace before entering one.
          Analyze messy customer data, collaborate with an AI senior,
          handle unexpected incidents, and receive a professional skill assessment.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/dashboard"
            className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl font-semibold"
          >
            Launch Workspace
          </Link>

          <Link
            href="#about"
            className="border border-gray-600 px-8 py-3 rounded-xl hover:bg-slate-800"
          >
            Learn More
          </Link>
        </div>

      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 px-10 pb-20">

        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-3">
            📊 Data Analysis
          </h2>

          <p className="text-gray-400">
            Work with messy customer datasets just like a real analyst.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-3">
            🤖 AI Senior Mentor
          </h2>

          <p className="text-gray-400">
            Discuss your decisions with an AI workplace mentor.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-3">
            🚨 Crisis Simulation
          </h2>

          <p className="text-gray-400">
            Handle sudden workplace incidents and changing requirements.
          </p>
        </div>

      </div>

      {/* About Section */}
      <div
        id="about"
        className="px-10 py-20 bg-slate-900 border-t border-slate-800"
      >
        <h2 className="text-4xl font-bold text-cyan-400 mb-8 text-center">
          About CogniWork
        </h2>

        <div className="max-w-5xl mx-auto text-gray-300 space-y-6 text-lg">

          <p>
            <strong>CogniWork</strong> is an AI-powered workplace simulation
            platform that helps students experience real industry workflows
            before entering the workforce.
          </p>

          <p>
            Students work with realistic datasets, communicate with AI mentors,
            solve business problems, and receive professional skill assessments.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-10">

            <div className="bg-slate-800 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">
                📊 Data Analysis
              </h3>
              <p>
                Analyze messy customer data and generate insights.
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">
                🤖 AI Mentor
              </h3>
              <p>
                Receive guidance from an AI senior colleague.
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">
                🚨 Crisis Simulation
              </h3>
              <p>
                Handle unexpected workplace incidents and changing requirements.
              </p>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}