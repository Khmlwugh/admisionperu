import { useState } from 'react';
import FilterForm from './components/FilterForm';
import { getQuizQuestions } from './api/examApi';

function App() {
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleFilterSubmit(filters) {
    setLoading(true);
    setError(null);
    try {
      const data = await getQuizQuestions(filters);
      setQuestions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!questions && <FilterForm onSubmit={handleFilterSubmit} />}
      {loading && <p className="text-center mt-8">Loading questions...</p>}
      {error && <p className="text-center mt-8 text-red-600">Error: {error}</p>}
      {questions && (
        <pre className="p-6 text-sm overflow-auto">
          {JSON.stringify(questions, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;