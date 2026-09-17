function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function QuizProgress({ current, total, correct, answered, elapsedSeconds }) {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-6 pb-4 mb-6 border-b flex justify-between items-center">
      <div className="flex gap-8 text-lg font-semibold text-gray-700">
        <span>Question {current}/{total}</span>
        <span>Correct: {correct}/{answered}</span>
      </div>
      <div className="bg-gray-800 text-white font-mono text-2xl font-bold px-5 py-2 rounded-lg">
        {formatTime(elapsedSeconds)}
      </div>
    </div>
  );
}

export default QuizProgress;