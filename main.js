// ====== ВОПРОСЫ ДЛЯ 9 КЛАССА (НОВЫЕ) ======
const questionsData = [
  { q: "Какой орган отвечает за фильтрацию крови?", options: ["Печень", "Почки", "Сердце"], answer: "Почки" },
  { q: "Основной элемент клеточной мембраны?", options: ["Белки", "Жиры", "Углеводы"], answer: "Жиры" },
  { q: "Какой орган участвует в пищеварении?", options: ["Селезенка", "Желудок", "Лёгкие"], answer: "Желудок" },
  { q: "Процесс деления клетки называется?", options: ["Митоз", "Фотосинтез", "Дифузия"], answer: "Митоз" },
  { q: "Какая ткань отвечает за сокращение?", options: ["Соединительная", "Мышечная", "Эпителиальная"], answer: "Мышечная" },
  { q: "Основной источник энергии для клетки?", options: ["Глюкоза", "Белок", "Вода"], answer: "Глюкоза" },
  { q: "Орган дыхания человека?", options: ["Лёгкие", "Почки", "Сердце"], answer: "Лёгкие" },
  { q: "Какие клетки крови переносят кислород?", options: ["Лейкоциты", "Эритроциты", "Тромбоциты"], answer: "Эритроциты" },
  { q: "Процесс превращения света в энергию?", options: ["Фотосинтез", "Дыхание", "Испарение"], answer: "Фотосинтез" },
  { q: "Что защищает мозг человека?", options: ["Череп", "Позвоночник", "Рёбра"], answer: "Череп" },
  { q: "Самая длинная кость в теле человека?", options: ["Плечевая", "Бедренная", "Бугорок"], answer: "Бедренная" },
  { q: "Чем дышат растения?", options: ["Углекислым газом", "Кислородом", "Азотом"], answer: "Углекислым газом" },
  { q: "Орган, отвечающий за слух?", options: ["Ухо", "Глаз", "Нос"], answer: "Ухо" },
  { q: "Что является основной частью крови?", options: ["Плазма", "Слюна", "Слеза"], answer: "Плазма" },
  { q: "Как называется обмен веществ в клетке?", options: ["Метаболизм", "Фотосинтез", "Митоз"], answer: "Метаболизм" },
  { q: "Какая часть глаза регулирует количество света?", options: ["Радужка", "Хрусталик", "Сетчатка"], answer: "Радужка" },
  { q: "Где формируются гормоны?", options: ["Железы", "Кости", "Мышцы"], answer: "Железы" },
  { q: "Какой орган выводит мочу?", options: ["Почки", "Печень", "Кишечник"], answer: "Почки" },
  { q: "Какая система отвечает за защиту организма?", options: ["Иммунная", "Нервная", "Сердечно-сосудистая"], answer: "Иммунная" },
  { q: "Основная функция костей?", options: ["Поддержка тела", "Дыхание", "Переваривание"], answer: "Поддержка тела" }
];

let shuffledQuestions = [];
let score = 0;
let currentIndex = 0;
let studentResults = [];
let currentStudent = null;
let testCompleted = false;

const teachers = [
    { username: "Севинч.Руслановна", password: "биология" },
    { username: "Петров А.В.", password: "химия123" },
    { username: "Сидорова Е.Н.", password: "физика456" }
];

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

document.addEventListener("DOMContentLoaded", () => {
    shuffledQuestions = shuffleArray([...questionsData]);

    // Показываем приглашение войти
    showWelcomeScreen();

    // Модальные окна
    const studentModal = document.getElementById("studentModal");
    const teacherModal = document.getElementById("teacherModal");

    // Открытие модальных окон
    document.getElementById("studentLoginBtn").onclick = () => {
        if (!testCompleted) {
            studentModal.style.display = "block";
        } else {
            alert("Вы уже прошли тест. Тест можно пройти только один раз!");
        }
    };

    document.getElementById("teacherLoginBtn").onclick = () => {
        teacherModal.style.display = "block";
    };

    // Закрытие модальных окон
    document.getElementById("closeStudentModal").onclick = () => {
        studentModal.style.display = "none";
        clearStudentInputs();
    };

    document.getElementById("closeTeacherModal").onclick = () => {
        teacherModal.style.display = "none";
        clearTeacherInputs();
    };

    // Закрытие по клику вне окна
    window.onclick = (event) => {
        if (event.target == studentModal) {
            studentModal.style.display = "none";
            clearStudentInputs();
        }
        if (event.target == teacherModal) {
            teacherModal.style.display = "none";
            clearTeacherInputs();
        }
    };

    // Автозаполнение для учителей
    document.querySelectorAll('.teacher-card').forEach(card => {
        card.addEventListener('click', () => {
            document.getElementById('teacherUser').value = card.dataset.username;
            document.getElementById('teacherPass').value = card.dataset.password;
        });
    });

    // Вход ученика
    document.getElementById("studentLogin").onclick = () => {
        const name = document.getElementById("studentName").value.trim();
        const studentClass = document.getElementById("studentClass").value.trim();

        if (!name || !studentClass) {
            document.getElementById("studentError").innerHTML = "Заполните все поля!";
            return;
        }

        // Проверяем, не проходил ли уже этот ученик тест
        const existingStudent = studentResults.find(s => s.student === name && s.class === studentClass);
        if (existingStudent) {
            document.getElementById("studentError").innerHTML = "Вы уже проходили тест! Тест можно пройти только один раз.";
            return;
        }

        currentStudent = { name, class: studentClass };
        studentModal.style.display = "none";
        clearStudentInputs();

        // Начинаем тест
        startTest();
    };

    // Вход учителя
    document.getElementById("teacherLogin").onclick = () => {
        const username = document.getElementById("teacherUser").value.trim();
        const password = document.getElementById("teacherPass").value.trim();

        const teacher = teachers.find(t => t.username === username && t.password === password);

        if (!teacher) {
            document.getElementById("teacherError").innerHTML = "Неверные данные!";
            return;
        }

        document.getElementById("teacherPanel").style.display = "block";
        document.getElementById("currentTeacher").innerHTML = `<i class="fas fa-user-check"></i> ${teacher.username}`;

        // Показываем результаты
        showTeacherResults();
    };

    // Экспорт в CSV
    document.getElementById("exportCSV").onclick = () => {
        if (studentResults.length === 0) {
            alert("Нет данных для экспорта");
            return;
        }

        let csv = "Ученик,Класс,Вопрос,Ответ ученика,Правильный ответ,Результат,Время\n";
        studentResults.forEach(r => {
            csv += `"${r.student}","${r.class}","${r.question}","${r.selected}","${r.correct}","${r.isCorrect ? 'Правильно' : 'Неправильно'}","${r.timestamp}"\n`;
        });

        const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `results_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
    };
});

function showWelcomeScreen() {
    document.getElementById("quizWrapper").innerHTML = `
        <div class="welcome-screen" style="text-align: center; padding: 40px;">
            <i class="fas fa-graduation-cap" style="font-size: 80px; color: #667eea; margin-bottom: 20px;"></i>
            <h2 style="color: #2d3748; margin-bottom: 15px;">Добро пожаловать!</h2>
            <p style="color: #718096; margin-bottom: 30px;">Для начала тестирования войдите как ученик</p>
            <button onclick="document.getElementById('studentLoginBtn').click()" class="next-btn" style="margin: 0 auto;">
                <i class="fas fa-sign-in-alt"></i> Войти как ученик
            </button>
        </div>
    `;
}

function clearStudentInputs() {
    document.getElementById("studentName").value = "";
    document.getElementById("studentClass").value = "";
    document.getElementById("studentError").innerHTML = "";
}

function clearTeacherInputs() {
    document.getElementById("teacherUser").value = "";
    document.getElementById("teacherPass").value = "";
    document.getElementById("teacherError").innerHTML = "";
}

function startTest() {
    currentIndex = 0;
    score = 0;
    renderQuestion();
}

function renderQuestion() {
    if (!currentStudent) return;

    const quizWrapper = document.getElementById("quizWrapper");
    const q = shuffledQuestions[currentIndex];

    let html = `
        <div class="student-badge">
            <i class="fas fa-user-graduate"></i> ${currentStudent.name} (${currentStudent.class})
        </div>
        <div class="question-number">
            <i class="fas fa-question-circle"></i> Вопрос ${currentIndex + 1}/20
        </div>
        <p>${q.q}</p>
    `;

    const shuffledOptions = shuffleArray([...q.options]);
    shuffledOptions.forEach(option => {
        html += `
            <label class="label">
                <input type="radio" name="answer" value="${option}"> ${option}
            </label>
        `;
    });

    html += `
        <button class="next-btn" onclick="nextQuestion()">
            <i class="fas fa-paper-plane"></i> Ответить
        </button>
        <div class="error" id="error"></div>
    `;

    quizWrapper.innerHTML = html;
    document.getElementById("progress").innerHTML = `<i class="fas fa-tasks"></i> Сделано: ${currentIndex} / 20`;
}

window.nextQuestion = function () {
    const selected = document.querySelector('input[name="answer"]:checked');

    if (!selected) {
        document.getElementById("error").innerHTML = "Выберите ответ!";
        return;
    }

    const q = shuffledQuestions[currentIndex];
    const isCorrect = selected.value === q.answer;

    studentResults.push({
        student: currentStudent.name,
        class: currentStudent.class,
        question: q.q,
        selected: selected.value,
        correct: q.answer,
        isCorrect: isCorrect,
        timestamp: new Date().toLocaleString()
    });

    if (isCorrect) score++;

    currentIndex++;

    if (currentIndex < shuffledQuestions.length) {
        renderQuestion();
    } else {
        showResult();
        testCompleted = true;
    }
}

function showResult() {
    const percentage = Math.round((score / 20) * 100);

    document.getElementById("quizWrapper").innerHTML = `
        <div class="result-card">
            <div class="student-badge">
                <i class="fas fa-user-graduate"></i> ${currentStudent.name} (${currentStudent.class})
            </div>
            <div class="result-icon">
                <i class="fas fa-trophy"></i>
            </div>
            <h2 style="color: #2d3748; margin-bottom: 10px;">Тест завершён!</h2>
            <p style="color: #718096; margin-bottom: 20px;">Спасибо за прохождение теста</p>
            <div class="score-box">
                <p>${score} / 20</p>
                <p>${percentage}%</p>
            </div>
            <div style="background: #f7fafc; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <h3 style="color: #2d3748; margin-bottom: 10px;">Детали:</h3>
                <p><i class="fas fa-check-circle" style="color: #48bb78;"></i> Правильных ответов: ${score}</p>
                <p><i class="fas fa-times-circle" style="color: #e53e3e;"></i> Неправильных ответов: ${20 - score}</p>
            </div>
            <div style="color: #718096; font-size: 14px;">
                <i class="fas fa-info-circle"></i> Тест пройден. Вы не можете пройти его снова.
            </div>
        </div>
    `;

    document.getElementById("progress").innerHTML = `<i class="fas fa-check-circle"></i> Завершено: 20 / 20`;
}

function showTeacherResults() {
    const tbody = document.getElementById("resultsBody");

    if (studentResults.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 30px;">Нет результатов</td></tr>`;
        document.getElementById("statsSummary").innerHTML = "Нет данных для отображения";
        return;
    }

    // Группируем по ученикам
    const studentStats = {};
    studentResults.forEach(r => {
        const key = `${r.student}_${r.class}`;
        if (!studentStats[key]) {
            studentStats[key] = {
                student: r.student,
                class: r.class,
                total: 0,
                correct: 0,
                time: r.timestamp
            };
        }
        studentStats[key].total++;
        if (r.isCorrect) studentStats[key].correct++;
    });

    let html = "";
    Object.values(studentStats).forEach(stat => {
        const percentage = Math.round((stat.correct / stat.total) * 100);
        html += `
            <tr>
                <td><i class="fas fa-user-graduate" style="color: #667eea;"></i> ${stat.student}</td>
                <td>${stat.class}</td>
                <td style="color: ${percentage >= 70 ? '#48bb78' : percentage >= 40 ? '#ecc94b' : '#e53e3e'}; font-weight: 600;">
                    ${stat.correct}/${stat.total}
                </td>
                <td>
                    <div style="display: flex; align-items: center; gap: 5px;">
                        <span>${percentage}%</span>
                        <div style="width: 50px; height: 6px; background: #edf2f7; border-radius: 3px;">
                            <div style="width: ${percentage}%; height: 100%; background: ${percentage >= 70 ? '#48bb78' : percentage >= 40 ? '#ecc94b' : '#e53e3e'}; border-radius: 3px;"></div>
                        </div>
                    </div>
                </td>
                <td>${stat.time}</td>
            </tr>
        `;
    });

    tbody.innerHTML = html;

    // Общая статистика
    const totalStudents = Object.keys(studentStats).length;
    const totalCorrect = studentResults.filter(r => r.isCorrect).length;
    const totalQuestions = studentResults.length;
    const averageScore = totalStudents > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    document.getElementById("statsSummary").innerHTML = `
        <i class="fas fa-chart-line"></i> 
        <strong>Всего учеников:</strong> ${totalStudents} | 
        <strong>Всего ответов:</strong> ${totalQuestions} | 
        <strong>Средний результат:</strong> ${averageScore}%
    `;
}
// Сохранение в Google Sheets через Form Submit
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';

async function saveToGoogleSheets(result) {
    const formData = new FormData();
    formData.append('entry.123456789', result.studentName); // Замените на свои ID полей
    formData.append('entry.987654321', result.studentClass);
    formData.append('entry.456789123', result.question);
    formData.append('entry.789123456', result.selectedAnswer);
    formData.append('entry.321654987', result.correctAnswer);
    formData.append('entry.654987321', result.isCorrect ? 'Правильно' : 'Неправильно');
    formData.append('entry.147258369', new Date().toLocaleString());

    try {
        await fetch(GOOGLE_FORM_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        });
    } catch (error) {
        console.error('Ошибка сохранения в Google Sheets:', error);
    }
}
// АНТИ-СПИСЫВАНИЕ ДЛЯ ПК И МОБИЛЬНЫХ

// ПК: блокировка клавиш
document.addEventListener('keydown', e => {
    if (
        e.key === "F12" || // F12
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) || // Ctrl+Shift+I/J
        (e.ctrlKey && e.key === "U") || // Ctrl+U
        (e.ctrlKey && e.key === "C") || // Ctrl+C
        (e.ctrlKey && e.key === "V") || // Ctrl+V
        (e.ctrlKey && e.key === "X")    // Ctrl+X
    ) {
        e.preventDefault();
        alert("Эти действия запрещены во время теста!");
    }
});

// ПК: запрет правой кнопки мыши
document.addEventListener('contextmenu', e => e.preventDefault());

// ПК: запрет выделения текста
document.addEventListener('selectstart', e => e.preventDefault());

// Мобильные: блокировка долгого нажатия и выделения
document.addEventListener('touchstart', e => {
    if (e.touches.length > 1) e.preventDefault(); // запрет мультитача
});
document.addEventListener('touchmove', e => e.preventDefault()); // запрет перетаскивания для выделения
document.addEventListener('gesturestart', e => e.preventDefault()); // запрет масштабирования
document.addEventListener('touchend', e => e.preventDefault()); // запрет длинного удержания

// // Мобильные и ПК: предупреждение при уходе с вкладки или сворачивании браузера
// window.addEventListener('blur', () => {
//     alert("Не переключайтесь на другие вкладки! Это будет засчитано как нарушение.");
// });
// window.addEventListener('visibilitychange', () => {
//     if (document.visibilityState !== 'visible') {
//         alert("Вы ушли с вкладки! Это нарушение правил теста.");
//     }
// });
// АНТИ-СПИСЫВАНИЕ С АВТОМАТИЧЕСКИМ ЗАВЕРШЕНИЕМ ТЕСТА
let cheatingDetected = false;

function endTestForCheating() {
    if (!currentStudent || testCompleted) return;
    cheatingDetected = true;
    testCompleted = true;

    // Сохраняем результат как 0 баллов
    studentResults.push({
        student: currentStudent.name,
        class: currentStudent.class,
        question: "Нарушение правил",
        selected: "—",
        correct: "—",
        isCorrect: false,
        timestamp: new Date().toLocaleString()
    });

    // Показываем сообщение
    document.getElementById("quizWrapper").innerHTML = `
        <div class="result-card">
            <div class="student-badge">
                <i class="fas fa-user-graduate"></i> ${currentStudent.name} (${currentStudent.class})
            </div>
            <div class="result-icon">
                <i class="fas fa-exclamation-triangle" style="color: #e53e3e;"></i>
            </div>
            <h2 style="color: #e53e3e; margin-bottom: 10px;">Тест завершён!</h2>
            <p style="color: #718096; margin-bottom: 20px;">Вы покинули вкладку или свернули браузер. Баллы засчитаны как 0. Повторно пройти тест невозможно.</p>
        </div>
    `;

    document.getElementById("progress").innerHTML = `<i class="fas fa-times-circle"></i> Завершено: 0 / 20`;
}

// Отслеживание ухода с вкладки или сворачивания браузера (ПК + мобильные)
window.addEventListener('blur', () => endTestForCheating());
window.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible') {
        endTestForCheating();
    }
});
// Сохраняем каждый результат
localStorage.setItem('studentResults', JSON.stringify(studentResults));


async function sendResult(result) {
    try {
        const resp = await fetch("/.netlify/functions/pushResults", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result)
        });

        const data = await resp.json();
        console.log("Результат отправлен:", data);
    } catch (e) {
        console.error("Ошибка отправки результата:", e);
    }
}

// Пример использования после завершения теста
const result = {
    studentName: currentStudent.name,
    studentClass: currentStudent.class,
    score: score,
    percentage: Math.round((score / 20) * 100),
    timestamp: new Date().toISOString()
};

sendResult(result);

