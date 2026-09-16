import { useState, useEffect } from 'react';
import { getColleges, getSubjects, getExamPeriods } from '../api/examApi';

function FilterForm({ onSubmit }) {
  const [colleges, setColleges] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [examPeriods, setExamPeriods] = useState([]);

  const [collegeId, setCollegeId] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [examPeriod, setExamPeriod] = useState('');
  const [count, setCount] = useState(4);

  useEffect(() => {
    Promise.all([getColleges(), getSubjects(), getExamPeriods()])
      .then(([collegeData, subjectData, periodData]) => {
        setColleges(collegeData);
        setSubjects(subjectData);
        setExamPeriods(periodData);
      })
      .catch(err => console.error('Failed to load filter options:', err));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      collegeId: collegeId || undefined,
      subjectId: subjectId || undefined,
      examPeriod: examPeriod || undefined,
      count,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto p-6">
      <div>
        <label className="block mb-1 font-medium">College</label>
        <select value={collegeId} onChange={e => setCollegeId(e.target.value)} className="w-full border rounded p-2">
          <option value="">Any</option>
          {colleges.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Subject</label>
        <select value={subjectId} onChange={e => setSubjectId(e.target.value)} className="w-full border rounded p-2">
          <option value="">Any</option>
          {subjects.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Exam Period</label>
        <select value={examPeriod} onChange={e => setExamPeriod(e.target.value)} className="w-full border rounded p-2">
          <option value="">Any</option>
          {examPeriods.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Number of Questions</label>
        <input
          type="number"
          min="1"
          max="20"
          value={count}
          onChange={e => setCount(Number(e.target.value))}
          className="w-full border rounded p-2"
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white rounded p-2 font-medium hover:bg-blue-700">
        Start Quiz
      </button>
    </form>
  );
}

export default FilterForm;