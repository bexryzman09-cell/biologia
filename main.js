// 1. ДАННЫЕ ВОПРОСОВ (ФИЗИКА 5-7 КЛАСС)
const questionsData = [
    {
        q: "Как называется всё то, что существует во Вселенной независимо от нашего сознания?",
        options: ["Материя", "Скорость", "Вакуум"],
        answer: "Материя"
    },
    {
        q: "Из каких мельчайших частиц состоят все вещества?",
        options: ["Молекулы и атомы", "Клетки", "Граммы"],
        answer: "Молекулы и атомы"
    },
    {
        q: "Как называется физическое явление, при котором молекулы одного вещества проникают между молекулами другого?",
        options: ["Диффузия", "Испарение", "Нагревание"],
        answer: "Диффузия"
    },
    {
        q: "В каких единицах измеряется масса тела в системе СИ?",
        options: ["Килограммы (кг)", "Литры (л)", "Ньютоны (Н)"],
        answer: "Килограммы (кг)"
    },
    {
        q: "Какой прибор используется для измерения температуры?",
        options: ["Термометр", "Барометр", "Динамометр"],
        answer: "Термометр"
    },
    {
        q: "В каком состоянии вещество сохраняет и форму, и объем?",
        options: ["Твердое", "Жидкое", "Газообразное"],
        answer: "Твердое"
    },
    {
        q: "Как называется линия, по которой движется тело?",
        options: ["Траектория", "Путь", "Длина"],
        answer: "Траектория"
    },
    {
        q: "Какая сила заставляет предметы падать на Землю?",
        options: ["Сила тяжести", "Сила трения", "Сила упругости"],
        answer: "Сила тяжести"
    },
    {
        q: "Кто из великих ученых открыл закон всемирного тяготения?",
        options: ["Исаак Ньютон", "Галилео Галилей", "Альберт Эйнштейн"],
        answer: "Исаак Ньютон"
    },
    {
        q: "Что такое инерция?",
        options: ["Явление сохранения скорости", "Вид энергии", "Изменение формы тела"],
        answer: "Явление сохранения скорости"
    },
    {
        q: "Как называется прибор для измерения силы?",
        options: ["Динамометр", "Весы", "Спидометр"],
        answer: "Динамометр"
    },
    {
        q: "В чем измеряется давление в системе СИ?",
        options: ["Паскали (Па)", "Джоули (Дж)", "Ватты (Вт)"],
        answer: "Паскали (Па)"
    },
    {
        q: "Какая сила мешает движению одного тела по поверхности другого?",
        options: ["Сила трения", "Сила тяжести", "Сила Архимеда"],
        answer: "Сила трения"
    },
    {
        q: "Как называется физическая величина, равная отношению пути ко времени?",
        options: ["Скорость", "Плотность", "Мощность"],
        answer: "Скорость"
    },
    {
        q: "Кто открыл выталкивающую силу, действующую на тело в жидкости или газе?",
        options: ["Архимед", "Паскаль", "Ломоносов"],
        answer: "Архимед"
    },
    {
        q: "Как называется переход вещества из твердого состояния в жидкое?",
        options: ["Плавление", "Кристаллизация", "Конденсация"],
        answer: "Плавление"
    },
    {
        q: "Что измеряется в Джоулях?",
        options: ["Работа и энергия", "Давление", "Сила тока"],
        answer: "Работа и энергия"
    },
    {
        q: "Какое явление объясняет, почему мы чувствуем запах духов в другом конце комнаты?",
        options: ["Диффузия", "Конвекция", "Инерция"],
        answer: "Диффузия"
    },
    {
        q: "Как называется воздушная оболочка Земли?",
        options: ["Атмосфера", "Гидросфера", "Литосфера"],
        answer: "Атмосфера"
    },
    {
        q: "Какое вещество в природе может находиться сразу в трех состояниях?",
        options: ["Вода", "Железо", "Кислород"],
        answer: "Вода"
    }
];
let shuffledQuestions = [];
let score = 0;
let currentIndex = 0;
let studentAnswersData = [];
let currentStudent = null;
let testCompleted = false;

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Запуск при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    shuffledQuestions = shuffleArray([...questionsData]);

    // Показываем приветствие
    document.getElementById("quizWrapper").innerHTML = `
        <div style="text-align:center; padding: 20px;">
            <h2>Unione</h2>
            <button class="next-btn" id="startBtn">Начать тестирование</button>
        </div>
    `;

    // Кнопка "Начать" открывает вход
    document.getElementById("startBtn").onclick = () => {
        document.getElementById("studentModal").style.display = "block";
    };

    // Вход ученика
    document.getElementById("studentLogin").onclick = () => {
        const name = document.getElementById("studentName").value.trim();
        const sClass = document.getElementById("studentClass").value.trim();

        if (name && sClass) {
            currentStudent = { name, sClass };
            document.getElementById("studentModal").style.display = "none";
            startQuiz();
        } else {
            alert("Пожалуйста, заполни имя и класс!");
        }
    };
});

function startQuiz() {
    currentIndex = 0;
    score = 0;
    studentAnswersData = [];
    testCompleted = false;
    renderQuestion();
}

function renderQuestion() {
    const q = shuffledQuestions[currentIndex];
    const quizWrapper = document.getElementById("quizWrapper");
    const options = shuffleArray([...q.options]);

    quizWrapper.innerHTML = `
        <div class="student-badge"><i class="fas fa-user"></i> ${currentStudent.name}</div>
        <div class="question-number">Вопрос ${currentIndex + 1} из 20</div>
        <p class="question-text"><strong>${q.q}</strong></p>
        <div class="options-container">
            ${options.map(opt => `
                <label class="label">
                    <input type="radio" name="quiz_opt" value="${opt}"> <span>${opt}</span>
                </label>
            `).join('')}
        </div>
        <button class="next-btn" id="submitBtn">Ответить</button>
        <div id="errorMsg" style="color:red; margin-top:10px; font-weight:bold;"></div>
    `;

    document.getElementById("progress").innerText = `Прогресс: ${currentIndex + 1}/20`;

    // Вешаем событие на кнопку ответа
    document.getElementById("submitBtn").onclick = handleAnswerSubmit;
}

function handleAnswerSubmit() {
    const selected = document.querySelector('input[name="quiz_opt"]:checked');
    if (!selected) {
        document.getElementById("errorMsg").innerText = "Выберите один из вариантов!";
        return;
    }

    const q = shuffledQuestions[currentIndex];
    const isCorrect = selected.value === q.answer;

    // Сохраняем историю для финала
    studentAnswersData.push({
        q: q.q,
        yours: selected.value,
        correct: q.answer,
        isCorrect: isCorrect
    });

    if (isCorrect) score++;
    currentIndex++;

    if (currentIndex < 20) {
        renderQuestion();
    } else {
        showFinalResults();
    }
}

function showFinalResults() {
    testCompleted = true;
    const percent = Math.round((score / 20) * 100);

    let tableRows = studentAnswersData.map(item => `
        <tr style="background: ${item.isCorrect ? '#d4edda' : '#f8d7da'};">
            <td style="border:1px solid #ccc; padding:8px;">${item.q}</td>
            <td style="border:1px solid #ccc; padding:8px;">${item.yours}</td>
            <td style="border:1px solid #ccc; padding:8px;">${item.correct}</td>
        </tr>
    `).join('');

    document.getElementById("quizWrapper").innerHTML = `
        <div class="result-card">
            <h2>Результат: ${score} из 20 (${percent}%)</h2>
            <p>Ниже показаны правильные ответы:</p>
            <div style="max-height: 400px; overflow-y: auto; border: 1px solid #eee;">
                <table style="width:100%; border-collapse: collapse; font-size:13px;">
                    <thead style="position: sticky; top: 0; background: #eee;">
                        <tr>
                            <th style="border:1px solid #ccc; padding:8px;">Вопрос</th>
                            <th style="border:1px solid #ccc; padding:8px;">Твой ответ</th>
                            <th style="border:1px solid #ccc; padding:8px;">Правильный</th>
                        </tr>
                    </thead>
                    <tbody>${tableRows}</tbody>
                </table>
            </div>
            <button class="next-btn" style="margin-top:20px;" onclick="location.reload()">Вернуться в начало</button>
        </div>
    `;
    document.getElementById("progress").innerText = "Тест завершен";
}

// Защита от сворачивания
window.onvisibilitychange = () => {
    if (document.visibilityState === 'hidden' && currentStudent && !testCompleted) {
        testCompleted = true;
        document.getElementById("quizWrapper").innerHTML = `
            <div class="result-card" style="border: 2px solid red;">
                <h2 style="color:red;">ТЕСТ ПРЕРВАН</h2>
                <p>Вы покинули страницу теста. Результат аннулирован (0 баллов).</p>
                <button onclick="location.reload()" class="next-btn">Попробовать снова</button>
            </div>
        `;
    }
};