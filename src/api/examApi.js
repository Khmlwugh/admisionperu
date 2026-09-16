const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getQuizQuestions({ collegeId, subjectId, examPeriod, count } = {}) {
  const params = new URLSearchParams();
  if (collegeId) params.append('collegeId', collegeId);
  if (subjectId) params.append('subjectId', subjectId);
  if (examPeriod) params.append('examPeriod', examPeriod);
  if (count) params.append('count', count);

  const response = await fetch(`${BASE_URL}/api/questions/quiz?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch quiz questions: ${response.status}`);
  }

  return response.json();
}

export async function checkAnswer(questionId, choiceId) {
  const response = await fetch(`${BASE_URL}/api/questions/${questionId}/check-answer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ choiceId }),
  });

  if (!response.ok) {
    throw new Error(`Failed to check answer: ${response.status}`);
  }

  return response.json();
}

export async function getColleges() {
  const response = await fetch(`${BASE_URL}/api/colleges`);
  if (!response.ok) throw new Error(`Failed to fetch colleges: ${response.status}`);
  return response.json();
}

export async function getSubjects() {
  const response = await fetch(`${BASE_URL}/api/subjects`);
  if (!response.ok) throw new Error(`Failed to fetch subjects: ${response.status}`);
  return response.json();
}

export async function getExamPeriods() {
  const response = await fetch(`${BASE_URL}/api/questions/exam-periods`);
  if (!response.ok) throw new Error(`Failed to fetch exam periods: ${response.status}`);
  return response.json();
}