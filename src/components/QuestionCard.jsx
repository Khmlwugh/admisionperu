import { useState } from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { checkAnswer } from '../api/examApi';

function renderWithMath(text) {
  const parts = text.split(/(\$[^$]+\$)/g);
  return parts.map((part, i) => {
    if (part.startsWith('$') && part.endsWith('$')) {
      return <InlineMath key={i} math={part.slice(1, -1)} />;
    }
    return <span key={i}>{part}</span>;
  });
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function QuestionCard({ question, onAnswered }) {
  const [selectedChoiceId, setSelectedChoiceId] = useState(null);
  const [result, setResult] = useState(null);

  async function handleChoiceClick(choiceId) {
    if (result) return;
    setSelectedChoiceId(choiceId);
    const response = await checkAnswer(question.id, choiceId);
    setResult(response);
    onAnswered(response.correct);
  }

  function choiceClasses(choice) {
    const base = "text-left px-4.5 py-4 rounded-xl border-2 text-[15px] flex items-center justify-between transition-colors";

    if (!result) {
      return `${base} border-border-input bg-white hover:bg-accent/5 hover:border-accent cursor-pointer`;
    }
    if (choice.id === result.correctChoiceId) {
      return `${base} border-success bg-success-bg text-ink`;
    }
    if (choice.id === selectedChoiceId && !result.correct) {
      return `${base} border-error bg-error-bg text-ink`;
    }
    return `${base} border-border-input bg-white text-muted opacity-70`;
  }

  return (
    <div className="max-w-2xl mx-auto px-8 pt-8">
      <p className="text-[13px] font-semibold uppercase tracking-wide text-accent mb-3.5">
        {question.collegeName} · {question.subjectName} · {question.examPeriod}
      </p>

      {question.textBlockContent && (
        <div className="bg-white border border-border rounded-xl p-5 mb-5 whitespace-pre-line text-[15px]">
          {renderWithMath(question.textBlockContent)}
        </div>
      )}

      <p className="text-[19px] leading-relaxed mb-7 whitespace-pre-line">
        {renderWithMath(question.questionText)}
      </p>

      <div className="flex flex-col gap-3">
        {question.choices.map(choice => (
          <button key={choice.id} onClick={() => handleChoiceClick(choice.id)} className={choiceClasses(choice)}>
            <span>{renderWithMath(choice.choiceText)}</span>
            {result && choice.id === result.correctChoiceId && <CheckIcon />}
            {result && choice.id === selectedChoiceId && !result.correct && <XIcon />}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;