function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function ResultsSummary({ answers, totalSeconds, onBackToFilters }) {
  const correctCount = answers.filter(a => a.correct).length;
  const accuracy = Math.round((correctCount / answers.length) * 100);

  return (
    <div className="max-w-2xl mx-auto px-8 pt-14 flex flex-col items-center">
      <h2 className="font-serif font-bold text-[28px] mb-7">¡Quiz Completado!</h2>

      <div className="flex gap-4 mb-9">
        {[
          { label: 'Puntaje', value: `${correctCount}/${answers.length}`, color: 'text-accent' },
          { label: 'Tiempo', value: formatTime(totalSeconds), color: 'text-ink' },
          { label: 'Precisión', value: `${accuracy}%`, color: 'text-ink' },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-border rounded-2xl px-8 py-5 text-center min-w-[130px]">
            <div className="text-[13px] font-semibold uppercase tracking-wide text-muted mb-1.5">{stat.label}</div>
            <div className={`font-serif font-bold text-[28px] ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      <ul className="w-full flex flex-col gap-2.5 mb-8">
        {answers.map((a, i) => (
          <li
            key={a.questionId}
            className={`flex items-center justify-between px-5 py-4 rounded-xl border ${
              a.correct ? 'border-success bg-success-bg' : 'border-error bg-error-bg'
            }`}
          >
            <div>
              <p className="font-semibold text-[15px] mb-0.5">Pregunta {i + 1}</p>
              <p className="text-[13px] text-subtle">{a.collegeName} · {a.subjectName} · {a.examPeriod}</p>
            </div>
            <span className={`flex items-center gap-1.5 font-semibold text-sm ${a.correct ? 'text-success' : 'text-error'}`}>
              {a.correct ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  Correcta
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                  Incorrecta
                </>
              )}
            </span>
          </li>
        ))}
      </ul>

      <button onClick={onBackToFilters} className="bg-accent hover:bg-accent-hover text-white rounded-lg px-10 py-3.5 text-base font-semibold transition-colors">
        Volver a los Filtros
      </button>
    </div>
  );
}

export default ResultsSummary;