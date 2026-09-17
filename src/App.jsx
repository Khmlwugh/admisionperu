import { useState, useEffect } from 'react';
import FilterForm from './components/FilterForm';
import QuestionCard from './components/QuestionCard';
import QuizProgress from './components/QuizProgress';
import ResultsSummary from './components/ResultsSummary';
import { getQuizQuestions } from './api/examApi';

function App() {
  const [view, setView] = useState('filter'); // 'filter' | 'quiz' | 'summary'
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [startTime, setStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Ticks the timer once per second, only while actively taking the quiz
  useEffect(() => {
    if (view !== 'quiz') return;
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [view, startTime]);

  async function handleFilterSubmit(filters) {
    setLoading(true);
    setError(null);
    try {
      const data = await getQuizQuestions(filters);
      setQuestions(data);
      setCurrentIndex(0);
      setAnswers([]);
      setStartTime(Date.now());
      setElapsedSeconds(0);
      setView('quiz');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleAnswered(correct) {
    const question = questions[currentIndex];
    setAnswers(prev => [
      ...prev,
      {
        questionId: question.id,
        collegeName: question.collegeName,
        subjectName: question.subjectName,
        examPeriod: question.examPeriod,
        correct,
      },
    ]);
  }

  function handleNext() {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(i => i + 1);
    } else {
      setView('summary');
    }
  }

  function handleBackToFilters() {
    setView('filter');
    setQuestions([]);
    setAnswers([]);
    setCurrentIndex(0);
  }

  const correctSoFar = answers.filter(a => a.correct).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {view === 'filter' && <FilterForm onSubmit={handleFilterSubmit} />}
      {loading && <p className="text-center mt-8">Loading questions...</p>}
      {error && <p className="text-center mt-8 text-red-600">Error: {error}</p>}

      {view === 'quiz' && questions.length > 0 && (
        <>
          <QuizProgress
            current={currentIndex + 1}
            total={questions.length}
            correct={correctSoFar}
            answered={answers.length}
            elapsedSeconds={elapsedSeconds}
          />
          <QuestionCard
            key={questions[currentIndex].id}
            question={questions[currentIndex]}
            onAnswered={handleAnswered}
          />
          {answers.length === currentIndex + 1 && (
            <div className="text-center mt-4">
              <button onClick={handleNext} className="bg-gray-600 text-white rounded px-4 py-2">
                {currentIndex + 1 < questions.length ? 'Next Question' : 'Finish Quiz'}
              </button>
            </div>
          )}
        </>
      )}

      {view === 'summary' && (
        <ResultsSummary
          answers={answers}
          totalSeconds={elapsedSeconds}
          onBackToFilters={handleBackToFilters}
        />
      )}
    </div>
  );
}

export default App;