// 1. ДАННЫЕ ВОПРОСОВ
const questionsData = [
    { q: "Кто был основателем огромной империи со столицей в Самарканд в XIV веке?", options: ["Амир Темур", "Мирзо Улугбек", "Бабур"], answer: "Амир Темур" },
    { q: "Как называлось государство, которым правил Амир Темур?", options: ["Туран", "Хорезмшахи", "Золотая Орда"], answer: "Туран" },
    { q: "Кто был последним хорезмшахом, прославившимся борьбой против Чингисхана?", options: ["Джалалиддин Мангуберди", "Мухаммад Хорезмшах", "Темур Малик"], answer: "Джалалиддин Мангуберди" },
    { q: "В какой битве Амир Темур разгромил турецкого султана Баязида Йилдирима?", options: ["Анкарская битва", "Битва на реке Терек", "Битва в грязи"], answer: "Анкарская битва" },
    { q: "Кто возглавлял оборону Худжанда от монголов?", options: ["Темур Малик", "Наджмиддин Кубро", "Махмуд Тараби"], answer: "Темур Малик" },
    { q: "Какое знаменитое изречение было написано на перстне Амира Темура?", options: ["Сила в справедливости", "Победа или смерть", "Знание — это сила"], answer: "Сила в справедливости" },
    { q: "Великий астроном и внук Амира Темура, построивший обсерваторию:", options: ["Мирзо Улугбек", "Шахрух", "Абу Саид"], answer: "Мирзо Улугбек" },
    { q: "В каком году родился Амир Темур?", options: ["1336 год", "1342 год", "1405 год"], answer: "1336 год" },
    { q: "Как назывался свод законов и правил Амира Темура?", options: ["Уложения Темура", "Авеста", "Законы Ясы"], answer: "Уложения Темура" },
    { q: "В каком селе родился Амир Темур?", options: ["Ходжа Илгар", "Шахрисабз", "Пайкенд"], answer: "Ходжа Илгар" },
    { q: "Против кого Джалалиддин сражался в битве при Катване?", options: ["Против монголов", "Против каракитаев", "Против арабов"], answer: "Против монголов" },
    { q: "Кто из ученых погиб, защищая Гургандж от монголов?", options: ["Наджмиддин Кубро", "Аль-Бухари", "Ибн Сино"], answer: "Наджмиддин Кубро" },
    { q: "Как называлась столица государства Хорезмшахов?", options: ["Гургандж", "Самарканд", "Бухара"], answer: "Гургандж" },
    { q: "В каком году монголы под предводительством Чингисхана вторглись в Мавераннахр?", options: ["1219 год", "1221 год", "1370 год"], answer: "1219 год" },
    { q: "Какой город Амир Темур сделал столицей империи?", options: ["Самарканд", "Кеш", "Ташкент"], answer: "Самарканд" },
    { q: "Как звали отца Амира Темура?", options: ["Амир Тарагай", "Амир Казаган", "Амир Хусейн"], answer: "Амир Тарагай" },
    { q: "В каком городе находится мавзолей Гур-Эмир?", options: ["Самарканд", "Шахрисабз", "Туркестан"], answer: "Самарканд" },
    { q: "Кто из полководцев прыгнул в реку Инд на коне, спасаясь от Чингисхана?", options: ["Джалалиддин Мангуберди", "Темур Малик", "Спитамен"], answer: "Джалалиддин Мангуберди" },
    { q: "Какое здание в Самарканде Темур построил в честь своей жены?", options: ["Мечеть Биби-Ханым", "Гур-Эмир", "Шахи-Зинда"], answer: "Мечеть Биби-Ханым" },
    { q: "Сколько лет правил Амир Темур?", options: ["35 лет", "20 лет", "40 лет"], answer: "35 лет" }
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
            <h2>История (5-6 класс)</h2>
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