// 1. ДАННЫЕ ВОПРОСОВ
const questionsData = [
    { q: "Кто был основателем государства Шейбанидов в Мавераннахре?", options: ["Шейбани-хан", "Абдулла-хан II", "Убайдулла-хан"], answer: "Шейбани-хан" },
    { q: "В каком году Шейбани-хан окончательно захватил Самарканд?", options: ["1501 год", "1499 год", "1510 год"], answer: "1501 год" },
    { q: "Какая династия правила в Бухаре после Шейбанидов с 1601 года?", options: ["Аштарханиды", "Мангыты", "Тимуриды"], answer: "Аштарханиды" },
    { q: "Кто был самым могущественным правителем из династии Шейбанидов во второй половине XVI века?", options: ["Абдулла-хан II", "Бабур", "Кучкунджи-хан"], answer: "Абдулла-хан II" },
    { q: "Какое медресе на площади Регистан было построено по приказу Ялангтуша Бахадура?", options: ["Шир-Дор", "Медресе Улугбека", "Мири Араб"], answer: "Шир-Дор" },
    { q: "В каком году в Коканде к власти пришла династия Минг (образование ханства)?", options: ["1709 год", "1740 год", "1800 год"], answer: "1709 год" },
    { q: "Кто был автором исторического труда «Шаджарат-и турк» (Родословная тюрков)?", options: ["Абулгази-хан", "Навои", "Мунис Хорезми"], answer: "Абулгази-хан" },
    { q: "Какая династия правила в Бухарском эмирате с середины XVIII века до 1920 года?", options: ["Мангыты", "Кунграты", "Аштарханиды"], answer: "Мангыты" },
    { q: "Как назывался верховный совет при правителе в ханствах?", options: ["Диван", "Кенгаш", "Шура"], answer: "Диван" },
    { q: "Какой город был столицей Хивинского ханства?", options: ["Хива", "Ургенч", "Куня-Ургенч"], answer: "Хива" },
    { q: "Кто был первым правителем Бухары, принявшим титул «эмир»?", options: ["Амир Шахмурад", "Мухаммад Рахим-хан", "Даниял-бий"], answer: "Амир Шахмурад" },
    { q: "В каком веке было образовано Кокандское ханство?", options: ["XVIII век", "XVII век", "XIX век"], answer: "XVIII век" },
    { q: "Какой титул носил правитель Кокандского ханства?", options: ["Хан", "Эмир", "Шах"], answer: "Хан" },
    { q: "Как называлась должность главы духовенства в ханствах?", options: ["Шейх-уль-ислам", "Кушбеги", "Диванбеги"], answer: "Шейх-уль-ислам" },
    { q: "Кто возглавлял борьбу против иранских войск Надир-шаха в XVIII века?", options: ["Мухаммад Рахим-бий", "Абулфейз-хан", "Алим-хан"], answer: "Мухаммад Рахим-бий" },
    { q: "В какой период велось строительство ансамбля Ляби-Хауз в Бухаре?", options: ["XVI—XVII века", "XIV—XV века", "XVIII век"], answer: "XVI—XVII века" },
    { q: "Как назывался поземельный налог, составлявший 1/5 или 1/10 часть урожая?", options: ["Харадж", "Закят", "Танап"], answer: "Харадж" },
    { q: "При каком кокандском правителе территория ханства достигла наибольших размеров?", options: ["Алим-хан", "Мадали-хан", "Шерали-хан"], answer: "Мадали-хан" },
    { q: "Какой город в XIX веке называли «Куполом ислама» в регионе?", options: ["Бухара", "Самарканд", "Хива"], answer: "Бухара" },
    { q: "Какое племя основало правящую династию в Хивинском ханстве в XVIII веке?", options: ["Кунграт", "Минг", "Мангыт"], answer: "Кунграт" }
];

// 2. ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
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

// Функция перемешивания
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// 3. ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
document.addEventListener("DOMContentLoaded", () => {
    shuffledQuestions = shuffleArray([...questionsData]);
    showWelcomeScreen();

    // Кнопки входа
    const studentLoginBtn = document.getElementById("studentLoginBtn");
    if (studentLoginBtn) {
        studentLoginBtn.onclick = () => {
            if (testCompleted) return alert("Тест уже завершен.");
            document.getElementById("studentModal").style.display = "block";
        };
    }

    const teacherLoginBtn = document.getElementById("teacherLoginBtn");
    if (teacherLoginBtn) {
        teacherLoginBtn.onclick = () => {
            document.getElementById("teacherModal").style.display = "block";
        };
    }

    // Закрытие модалок
    document.querySelectorAll(".close").forEach(closeBtn => {
        closeBtn.onclick = () => {
            document.getElementById("studentModal").style.display = "none";
            document.getElementById("teacherModal").style.display = "none";
        };
    });

    // Вход ученика
    document.getElementById("studentLogin").onclick = () => {
        const name = document.getElementById("studentName").value.trim();
        const studentClass = document.getElementById("studentClass").value.trim();
        if (!name || !studentClass) return alert("Заполните поля!");

        currentStudent = { name, class: studentClass };
        document.getElementById("studentModal").style.display = "none";
        startTest();
    };

    // Вход учителя
    document.getElementById("teacherLogin").onclick = () => {
        const user = document.getElementById("teacherUser").value;
        const pass = document.getElementById("teacherPass").value;
        const teacher = teachers.find(t => t.username === user && t.password === pass);

        if (teacher) {
            document.getElementById("teacherPanel").style.display = "block";
            document.getElementById("teacherModal").style.display = "none";
            showTeacherResults();
        } else {
            alert("Ошибка входа!");
        }
    };
});

// 4. ЛОГИКА ТЕСТА
function showWelcomeScreen() {
    document.getElementById("quizWrapper").innerHTML = `
        <div style="text-align:center; padding:20px;">
            <h2>Готовы начать?</h2>
            <button class="next-btn" onclick="document.getElementById('studentLoginBtn').click()">Войти и начать</button>
        </div>
    `;
}

function startTest() {
    currentIndex = 0;
    score = 0;
    renderQuestion();
}

function renderQuestion() {
    const q = shuffledQuestions[currentIndex];
    const quizWrapper = document.getElementById("quizWrapper");

    let optionsHtml = shuffleArray([...q.options]).map(opt => `
        <label class="label">
            <input type="radio" name="answer" value="${opt}"> ${opt}
        </label>
    `).join('');

    quizWrapper.innerHTML = `
        <div class="student-badge">${currentStudent.name} (${currentStudent.class})</div>
        <div class="question-number">Вопрос ${currentIndex + 1}/20</div>
        <p><strong>${q.q}</strong></p>
        ${optionsHtml}
        <button class="next-btn" onclick="handleAnswer()">Ответить</button>
        <div id="error" class="error"></div>
    `;
    document.getElementById("progress").innerText = `Сделано: ${currentIndex}/20`;
}

window.handleAnswer = function () {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
        document.getElementById("error").innerText = "Выберите ответ!";
        return;
    }

    const q = shuffledQuestions[currentIndex];
    const isCorrect = selected.value === q.answer;
    if (isCorrect) score++;

    studentResults.push({
        student: currentStudent.name,
        class: currentStudent.class,
        question: q.q,
        isCorrect: isCorrect,
        timestamp: new Date().toLocaleTimeString()
    });

    currentIndex++;
    if (currentIndex < 20) {
        renderQuestion();
    } else {
        finishTest();
    }
};

function finishTest() {
    testCompleted = true;
    const proc = Math.round((score / 20) * 100);
    document.getElementById("quizWrapper").innerHTML = `
        <div class="result-card">
            <h2>Результат: ${score}/20</h2>
            <p>Выполнено на ${proc}%</p>
            <p>Тест завершен. Закройте вкладку.</p>
        </div>
    `;
    document.getElementById("progress").innerText = "Тест окончен";
}

// 5. ЗАЩИТА (АНТИ-СПИСЫВАНИЕ)
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('selectstart', e => e.preventDefault());

window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && currentStudent && !testCompleted) {
        testCompleted = true;
        document.getElementById("quizWrapper").innerHTML = `
            <div class="result-card" style="border-top:5px solid red;">
                <h2 style="color:red;">ТЕСТ АННУЛИРОВАН</h2>
                <p>Вы покинули вкладку. Результат: 0 баллов.</p>
            </div>
        `;
    }
});

function showTeacherResults() {
    const tbody = document.getElementById("resultsBody");
    tbody.innerHTML = studentResults.map(r => `
        <tr>
            <td>${r.student}</td>
            <td>${r.class}</td>
            <td>${r.isCorrect ? "1" : "0"}</td>
            <td>${r.timestamp}</td>
        </tr>
    `).join('');
}