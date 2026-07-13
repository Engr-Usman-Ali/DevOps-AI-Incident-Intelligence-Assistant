const questions = [
  "Analyze Kubernetes Log",
  "Explain Docker Error",
  "Find Root Cause",
  "Suggest Fix",
  "Why service crashed?",
  "Prevent this issue",
];

export default function SuggestedQuestions() {
  return (

    <div className="mb-8">

      <h2 className="text-lg font-semibold mb-5">Suggested Questions</h2>


      <div className="flex flex-wrap gap-3">

        {questions.map((q, index) => (

          <button

            key={index}
            
            className="rounded-full bg-slate-800 px-5 py-3 transition hover:bg-blue-600"
          >
            {q}

          </button>

        ))}

      </div>

    </div>
  );
}
