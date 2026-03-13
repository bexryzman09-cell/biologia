document.addEventListener("DOMContentLoaded", () => {
    const questions = document.querySelectorAll(".question");
    let score = 0;
    const results = [];

    questions.forEach((q, index) => {
        const btn = q.querySelector(".next-btn");

        btn.addEventListener("click", () => {
            const radios = q.querySelectorAll('input[type="radio"]');
            const error = q.querySelector(".error");
            let answered = false;
            let isCorrect = false;
            let selectedAnswer = "";

            radios.forEach(radio => {
                if (radio.checked) {
                    answered = true;
                    selectedAnswer = radio.parentElement.textContent.trim();
                    if (radio.value === "correct") {
                        score++;
                        isCorrect = true;
                    }
                }
            });

            if (!answered) {
                error.textContent = "Выберите ответ!";
                return;
            }

            error.textContent = "";

            results.push({
                question: q.querySelector("p").textContent,
                selected: selectedAnswer,
                correct: Array.from(radios).find(r => r.value === "correct").parentElement.textContent.trim(),
                isCorrect: isCorrect
            });

            q.classList.remove("active");

            if (questions[index + 1]) {
                questions[index + 1].classList.add("active");
            } else {
                showFinalResults();
            }
        });
    });

    function showFinalResults() {
        const container = document.querySelector(".survey__wrapper");
        container.innerHTML = `<h2>Тест завершён! Ваш результат: ${score}/${questions.length}</h2>`;

        results.forEach((res, i) => {
            const qDiv = document.createElement("div");
            qDiv.classList.add("result");
            qDiv.innerHTML = `
        <p><strong>Вопрос ${i + 1}:</strong> ${res.question}</p>
        <p>Ваш ответ: <span style="color:${res.isCorrect ? "green" : "red"}">${res.selected}</span></p>
        <p>Правильный ответ: <strong>${res.correct}</strong></p>
        <hr>
      `;
            container.appendChild(qDiv);
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const surveyForm = document.querySelector("#surveyForm");

    function blockCheats() {
        // Запретить контекстное меню и выделение
        document.addEventListener("contextmenu", e => e.preventDefault());
        document.addEventListener("selectstart", e => e.preventDefault());
        document.addEventListener("copy", e => e.preventDefault());
        document.addEventListener("dragstart", e => e.preventDefault());
        document.addEventListener("keydown", e => {
            if (["F12"].includes(e.key) ||
                (e.ctrlKey && e.shiftKey && ["i", "j"].includes(e.key.toLowerCase())) ||
                (e.ctrlKey && e.key.toLowerCase() === "u") ||
                (e.metaKey && e.altKey && e.key.toLowerCase() === "i")
            ) {
                e.preventDefault();
                alert("Доступ запрещен!");
            }
        });
    }

    blockCheats();

    // Отправка ответов на сервер
    surveyForm.addEventListener("submit", async e => {
        e.preventDefault();
        const formData = new FormData(surveyForm);
        const answers = {};
        formData.forEach((value, key) => answers[key] = value);

        try {
            const res = await fetch("/submit-test", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(answers)
            });
            const result = await res.json();
            alert(`Тест завершен! Ваш результат: ${result.score}/${result.total}`);
        } catch (err) {
            alert("Ошибка сервера, попробуйте позже.");
        }
    });
});

const express = require("express");
const app = express();
app.use(express.json());

// Правильные ответы (только на сервере!)
const correctAnswers = {
    q1: "a",
    q2: "b",
    q3: "c"
};

app.post("/submit-test", (req, res) => {
    const userAnswers = req.body;
    let score = 0;
    const total = Object.keys(correctAnswers).length;

    for (let q in correctAnswers) {
        if (userAnswers[q] === correctAnswers[q]) score++;
    }

    res.json({ score, total });
});

app.listen(3000, () => console.log("Server running on port 3000"));


let score = 0;
const questions = document.querySelectorAll(".question");

function nextQuestion(index) {

    const current = questions[index];
    const selected = current.querySelector("input[type='radio']:checked");
    const error = current.querySelector(".error");

    if (!selected) {
        error.textContent = "Выберите ответ!";
        return;
    }

    if (selected.value === "correct") {
        score++;
    }

    current.classList.remove("active");

    if (index + 1 < questions.length) {
        questions[index + 1].classList.add("active");
    } else {
        showResult();
    }
}

function showResult() {

    let place = "";

    if (score >= 30) {
        place = "🥇 1 место";
    }
    else if (score >= 20) {
        place = "🥈 2 место";
    }
    else {
        place = "🥉 3 место";
    }

    document.querySelector(".survey__wrapper").innerHTML =
        `<h2>Ваш результат</h2>
        <p>Правильных ответов: ${score} / 35</p>
        <h3>${place}</h3>`;
}