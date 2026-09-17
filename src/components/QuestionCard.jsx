import { useState } from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { checkAnswer } from '../api/examApi';

// Splits text on $...$ delimiters and renders math segments with KaTeX,
// leaving everything else as plain text.
function renderWithMath(text) {
  const parts = text.split(/(\$[^$]+\$)/g);
  return parts.map((part, i) => {
    if (part.startsWith('$') && part.endsWith('$')) {
      return <InlineMath key={i} math={part.slice(1, -1)} />;
    }
    return <span key={i}>{part}</span>;
  });
}

function QuestionCard({ question, onAnswered }) {
  const [selectedChoiceId, setSelectedChoiceId] = useState(null);
  const [result, setResult] = useState(null); // { correct, correctChoiceId }

  async function handleChoiceClick(choiceId) {
    if (result) return; // already answered, ignore further clicks

    setSelectedChoiceId(choiceId);
    const response = await checkAnswer(question.id, choiceId);
    setResult(response);
    onAnswered(response.correct);
  }

  function choiceClasses(choice) {
    const base = 'w-full text-left p-3 rounded border transition-colors';

    if (!result) {
      return `${base} border-gray-300 hover:bg-gray-100 cursor-pointer`;
    }
    if (choice.id === result.correctChoiceId) {
      return `${base} border-green-600 bg-green-100`;
    }
    if (choice.id === selectedChoiceId && !result.correct) {
      return `${base} border-red-600 bg-red-100`;
    }
    return `${base} border-gray-300 opacity-60`;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <p className="text-sm text-gray-500 mb-2">
        {question.collegeName} · {question.subjectName} · {question.examPeriod}
      </p>

      {question.textBlockContent && (
        <div className="bg-gray-100 p-4 rounded mb-4 whitespace-pre-line">
          {renderWithMath(question.textBlockContent)}
        </div>
      )}

      <p className="text-lg mb-4 whitespace-pre-line">
        {renderWithMath(question.questionText)}
      </p>

      <div className="flex flex-col gap-2">
        {question.choices.map(choice => (
          <button
            key={choice.id}
            onClick={() => handleChoiceClick(choice.id)}
            className={choiceClasses(choice)}
          >
            {renderWithMath(choice.choiceText)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;