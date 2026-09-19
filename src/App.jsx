import { useState, useEffect } from 'react';
import FilterForm from './components/FilterForm';
import QuestionCard from './components/QuestionCard';
import QuizProgress from './components/QuizProgress';
import ResultsSummary from './components/ResultsSummary';
import { getQuizQuestions } from './api/examApi';
import Footer from './components/Footer';

function App() {
  const [view, setView] = useState('filter');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [startTime, setStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

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
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        {view === 'filter' && <FilterForm onSubmit={handleFilterSubmit} />}
        {loading && <p className="text-center mt-8">Cargando preguntas...</p>}
        {error && <p className="text-center mt-8 text-error">Error: {error}</p>}

        {view === 'quiz' && questions.length > 0 && (
          <>
            <QuizProgress
              current={currentIndex + 1} total={questions.length}
              correct={correctSoFar} answered={answers.length}
              elapsedSeconds={elapsedSeconds}
            />
            <QuestionCard key={questions[currentIndex].id} question={questions[currentIndex]} onAnswered={handleAnswered} />
            {answers.length === currentIndex + 1 && (
              <div className="text-center mt-7">
                <button onClick={handleNext} className="bg-ink hover:bg-ink/90 text-white rounded-lg px-8 py-3.5 font-semibold transition-colors">
                  {currentIndex + 1 < questions.length ? 'Siguiente Pregunta' : 'Finalizar Quiz'}
                </button>
              </div>
            )}
          </>
        )}

        {view === 'summary' && (
          <ResultsSummary answers={answers} totalSeconds={elapsedSeconds} onBackToFilters={handleBackToFilters} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;