function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function QuizProgress({ current, total, correct, answered, elapsedSeconds }) {
  const percent = (current / total) * 100;

  return (
    <div className="lg:max-w-2xl lg:mx-auto pt-5 px-5 lg:pt-7 lg:px-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-3.5 lg:gap-7 text-[13px] lg:text-[15px] font-semibold text-ink">
          <span>Pregunta {current}/{total}</span>
          <span>Correctas: {correct}/{answered}</span>
        </div>
        <div className="bg-ink text-white font-mono font-bold text-base lg:text-xl px-3 lg:px-4.5 py-1.5 lg:py-2 rounded-lg flex items-center gap-1.5 lg:gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
          </svg>
          {formatTime(elapsedSeconds)}
        </div>
      </div>

      <div className="mt-3 lg:mt-4 h-1 lg:h-1.5 bg-border rounded-full overflow-hidden">
        <div className="h-full bg-accent rounded-full transition-all duration-300" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default QuizProgress;