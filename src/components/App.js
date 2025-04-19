// src/components/App.js
import React, { useEffect, useState } from "react";
import QuestionForm from "./QuestionForm";
import QuestionItem from "./QuestionItem";

function App() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState("List");

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then(setQuestions);
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
    setPage("List");
  }

  function handleDeleteQuestion(id) {
    setQuestions(questions.filter((q) => q.id !== id));
  }

  function handleUpdateQuestion(id, newCorrectIndex) {
    const updatedQuestions = questions.map((q) =>
      q.id === id ? { ...q, correctIndex: newCorrectIndex } : q
    );
    setQuestions(updatedQuestions);
  }

  return (
    <main>
      <section>
        <button onClick={() => setPage("Form")}>New Question</button>
        <button onClick={() => setPage("List")}>View Questions</button>
      </section>
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <section>
          <h1>Quiz Questions</h1>
          <ul>
            {questions.map((q) => (
              <QuestionItem
                key={q.id}
                question={q}
                onDelete={handleDeleteQuestion}
                onUpdate={handleUpdateQuestion}
              />
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default App;
