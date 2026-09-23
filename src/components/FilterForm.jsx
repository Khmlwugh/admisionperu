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

  const selectClasses = "w-full box-border px-3.5 py-3.5 lg:py-3 border border-border-input rounded-lg text-base lg:text-[15px] font-sans text-ink bg-white";
  const labelClasses = "block text-[13px] lg:text-sm font-semibold mb-1.5 lg:mb-2 text-ink";

  return (
    <div className="flex flex-col items-center pt-12 px-5 lg:pt-16 lg:px-8">
      <div className="font-serif font-bold text-xl lg:text-2xl tracking-tight text-ink">CollegeQuiz</div>
      <div className="text-sm lg:text-base text-subtle text-center mt-1 lg:mt-1.5 mb-7 lg:mb-10">Practica preguntas reales de admisión</div>

      <form onSubmit={handleSubmit} className="w-full lg:max-w-md bg-white border border-border rounded-2xl p-6 lg:p-9 shadow-sm">
        <div className="mb-4.5 lg:mb-5">
          <label className={labelClasses}>Universidad</label>
          <select value={collegeId} onChange={e => setCollegeId(e.target.value)} className={selectClasses}>
            <option value="">Cualquiera</option>
            {colleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div className="mb-4.5 lg:mb-5">
          <label className={labelClasses}>Materia</label>
          <select value={subjectId} onChange={e => setSubjectId(e.target.value)} className={selectClasses}>
            <option value="">Cualquiera</option>
            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>

        <div className="mb-4.5 lg:mb-5">
          <label className={labelClasses}>Periodo de Examen</label>
          <select value={examPeriod} onChange={e => setExamPeriod(e.target.value)} className={selectClasses}>
            <option value="">Cualquiera</option>
            {examPeriods.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div className="mb-6 lg:mb-7">
          <label className={labelClasses}>Número de Preguntas (máx. 10)</label>
          <input
            type="number" min="1" max="10" value={count}
            onChange={e => setCount(Number(e.target.value))}
            className={selectClasses}
          />
        </div>

        <button type="submit" className="w-full bg-accent hover:bg-accent-hover text-white rounded-lg py-4 lg:py-3.5 text-base font-semibold transition-colors min-h-11">
          Comenzar Quiz
        </button>
      </form>
    </div>
  );
}

export default FilterForm;