function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function ResultsSummary({ answers, totalSeconds, onBackToFilters }) {
  const correctCount = answers.filter(a => a.correct).length;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-2">Quiz Complete</h2>
      <p className="text-lg text-gray-600 mb-6">
        Score: <span className="font-semibold">{correctCount}/{answers.length}</span>
        {' · '}
        Time: <span className="font-semibold font-mono">{formatTime(totalSeconds)}</span>
      </p>

      <ul className="flex flex-col gap-3 mb-8">
        {answers.map((a, i) => (
          <li
            key={a.questionId}
            className={`p-4 rounded-lg border-2 flex justify-between items-center ${
              a.correct ? 'border-green-600 bg-green-50' : 'border-red-600 bg-red-50'
            }`}
          >
            <div>
              <p className="font-semibold text-lg">Question {i + 1}</p>
              <p className="text-gray-600">
                {a.collegeName} · {a.subjectName} · {a.examPeriod}
              </p>
            </div>
            <span className={`font-bold text-lg ${a.correct ? 'text-green-700' : 'text-red-700'}`}>
              {a.correct ? '✓ Correct' : '✗ Incorrect'}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={onBackToFilters}
        className="bg-blue-600 text-white rounded-lg px-6 py-3 text-lg font-medium hover:bg-blue-700"
      >
        Back to Filters
      </button>
    </div>
  );
}

export default ResultsSummary;