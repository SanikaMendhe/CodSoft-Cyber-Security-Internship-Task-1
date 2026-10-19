"use strict";

/* ==========================================
   PHISHGUARD - INTERACTIVE JAVASCRIPT
   Educational simulations only
   ========================================== */


/* MOBILE NAVIGATION */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});


/* FOOTER YEAR */

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


/* ==========================================
   PHISHING DETECTION LAB
   All examples are fictional
   ========================================== */

const messages = [
    {
        id: 1,
        title: "Urgent Account Warning",
        category: "Suspicious",
        sender: "Account Security <security@example.invalid>",
        subject: "Immediate action required",
        body:
`Dear Customer,

Your account will be suspended today.
Verify your details immediately to avoid losing access.

This is a fictional training message.
No real link or account is involved.

Regards,
Security Team`,
        signals: [
            "Uses urgency to pressure the recipient.",
            "Uses a generic greeting instead of identifying the customer.",
            "Requests immediate action without independently verified context."
        ],
        verdict: "Suspicious: verify account alerts through the official app or a website you open independently."
    },

    {
        id: 2,
        title: "Unexpected Prize",
        category: "Suspicious",
        sender: "Rewards Desk <rewards@example.invalid>",
        subject: "Congratulations! You won a prize",
        body:
`Congratulations!

You have supposedly won a valuable prize.
Pay a processing fee and provide personal details to claim it.

This is a fictional training message.`,
        signals: [
            "Unexpected prizes can be used as bait.",
            "Requests a fee to claim an unsolicited reward.",
            "Asks for personal information without a trustworthy reason."
        ],
        verdict: "Suspicious: do not pay unexpected fees or provide personal details to claim an unverified prize."
    },

    {
        id: 3,
        title: "Password Verification Request",
        category: "Suspicious",
        sender: "IT Helpdesk <helpdesk@example.invalid>",
        subject: "Verify your password now",
        body:
`Hello,

Please reply to this message with your password
and one-time verification code.

This is required for account maintenance.

This is a fictional training message.`,
        signals: [
            "Requests a password directly.",
            "Requests a one-time verification code.",
            "Legitimate support teams should not ask you to disclose your password."
        ],
        verdict: "Suspicious: never disclose passwords or verification codes in response to a message."
    },

    {
        id: 4,
        title: "Routine Class Announcement",
        category: "Needs Verification",
        sender: "College Administration <office@example.invalid>",
        subject: "Class schedule update",
        body:
`Hello Students,

Please check the usual college notice board
for the updated class timetable.

No password, payment, or sensitive information
is requested in this fictional example.`,
        signals: [
            "The message does not ask for sensitive information.",
            "It directs students to a familiar information channel.",
            "The displayed details alone cannot prove that a sender is genuine."
        ],
        verdict: "No obvious phishing signs are shown, but the sender and announcement should still be verified if unexpected."
    },

    {
        id: 5,
        title: "Unexpected Delivery Fee",
        category: "Suspicious",
        sender: "Delivery Notice <parcel@example.invalid>",
        subject: "Package delivery problem",
        body:
`Your package is supposedly on hold.
Pay a small fee immediately to arrange delivery.

No genuine tracking details are provided.

This is a fictional training message.`,
        signals: [
            "Unexpected delivery-fee requests are a common scam pattern.",
            "Creates pressure to make a quick payment.",
            "Does not provide independently verifiable tracking details."
        ],
        verdict: "Suspicious: check shipment status directly through the delivery company's official website or app."
    }
];


const messageList = document.getElementById("messageList");
const messageDetails = document.getElementById("messageDetails");

let activeMessageId = null;


/* CREATE MESSAGE LIST */

messages.forEach(message => {

    const button = document.createElement("button");

    button.type = "button";
    button.className = "message-option";

    button.innerHTML = `
        <span class="message-label ${
            message.category === "Suspicious"
                ? "label-suspicious"
                : "label-legitimate"
        }">${message.category}</span>

        <strong>${message.title}</strong>

        <small>${message.subject}</small>
    `;

    button.addEventListener("click", () => {
        showMessage(message.id);
    });

    messageList.appendChild(button);
});


/* DISPLAY SELECTED MESSAGE */

function showMessage(id) {

    activeMessageId = id;

    const message = messages.find(item => item.id === id);

    if (!message) return;

    document.querySelectorAll(".message-option").forEach(button => {
        button.classList.remove("active");
    });

    const selectedButton = [...messageList.children].find(button =>
        button.querySelector("strong")?.textContent === message.title
    );

    if (selectedButton) {
        selectedButton.classList.add("active");
    }

    messageDetails.replaceChildren();

    const meta = document.createElement("div");
    meta.className = "email-meta";

    const senderLine = document.createElement("p");
    const senderLabel = document.createElement("strong");
    senderLabel.textContent = "From: ";
    senderLine.append(senderLabel, document.createTextNode(message.sender));

    const subjectLine = document.createElement("p");
    const subjectLabel = document.createElement("strong");
    subjectLabel.textContent = "Subject: ";
    subjectLine.append(subjectLabel, document.createTextNode(message.subject));

    meta.append(senderLine, subjectLine);

    const body = document.createElement("div");
    body.className = "email-body";
    body.textContent = message.body;

    const heading = document.createElement("h3");
    heading.className = "analysis-heading";
    heading.textContent = "Analysis & warning signs";

    const list = document.createElement("ul");
    list.className = "signal-list";

    message.signals.forEach(signal => {
        const item = document.createElement("li");
        item.textContent = signal;
        list.appendChild(item);
    });

    const verdict = document.createElement("div");

    verdict.className = "verdict " +
        (message.category === "Suspicious"
            ? "suspicious"
            : "legitimate");

    verdict.textContent = message.verdict;

    messageDetails.append(meta, body, heading, list, verdict);
}


/* ==========================================
   INTERACTIVE CYBERSECURITY QUIZ
   ========================================== */

const questions = [
    {
        question:
            "You receive an unexpected email asking you to verify your password. What should you do?",

        options: [
            "Reply with your password",
            "Open the message link immediately",
            "Verify through the official website or app",
            "Forward your password to a friend"
        ],

        answer: 2,

        explanation:
            "Never disclose your password in response to a message. Open the official service independently to verify the request."
    },

    {
        question:
            "Which is a common warning sign of phishing?",

        options: [
            "An unexpected urgent request for sensitive information",
            "A familiar website opened independently",
            "A routine offline classroom discussion",
            "A saved document on your computer"
        ],

        answer: 0,

        explanation:
            "Urgency combined with requests for sensitive information is a common phishing warning sign."
    },

    {
        question:
            "What should you do before opening an unexpected link?",

        options: [
            "Click it quickly",
            "Check the destination and verify the message independently",
            "Send it to everyone",
            "Enter your login details first"
        ],

        answer: 1,

        explanation:
            "Inspect the destination carefully and independently verify unexpected requests. If uncertain, do not open the link."
    },

    {
        question:
            "What does multi-factor authentication provide?",

        options: [
            "A way to share passwords",
            "A guarantee that every attack will fail",
            "An additional layer of account protection",
            "A replacement for all security practices"
        ],

        answer: 2,

        explanation:
            "Multi-factor authentication adds another layer of protection, but it does not eliminate every security risk."
    },

    {
        question:
            "You suspect that a message is phishing. What is the safest response?",

        options: [
            "Reply and challenge the sender",
            "Download its attachment to investigate",
            "Provide fake personal information",
            "Avoid interacting and report it through a trusted channel"
        ],

        answer: 3,

        explanation:
            "Avoid interacting with suspicious content and report it through your email provider or organization's security team."
    }
];


const quizContent = document.getElementById("quizContent");
const questionCounter = document.getElementById("questionCounter");
const scorePreview = document.getElementById("scorePreview");
const progressFill = document.getElementById("progressFill");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestion = document.getElementById("nextQuestion");
const quizResult = document.getElementById("quizResult");
const restartQuiz = document.getElementById("restartQuiz");

let currentQuestion = 0;
let score = 0;
let answered = false;


/* RENDER QUESTION */

function renderQuestion() {

    answered = false;

    const question = questions[currentQuestion];

    questionCounter.textContent =
        `QUESTION ${currentQuestion + 1} OF ${questions.length}`;

    scorePreview.textContent = `Score: ${score}`;

    progressFill.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    quizFeedback.textContent = "";

    nextQuestion.disabled = true;
    nextQuestion.textContent = "Check Answer →";

    quizResult.hidden = true;
    restartQuiz.hidden = true;

    quizContent.replaceChildren();

    const heading = document.createElement("h3");
    heading.textContent = question.question;

    const optionsContainer = document.createElement("div");
    optionsContainer.className = "quiz-options";

    question.options.forEach((option, index) => {

        const label = document.createElement("label");
        label.className = "quiz-option";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "quizAnswer";
        radio.value = index;

        const text = document.createElement("span");
        text.textContent = option;

        label.append(radio, text);

        radio.addEventListener("change", () => {
            nextQuestion.disabled = false;
        });

        optionsContainer.appendChild(label);
    });

    quizContent.append(heading, optionsContainer);
}


/* CHECK SELECTED ANSWER */

function checkAnswer() {

    if (answered) return;

    const selected = document.querySelector(
        'input[name="quizAnswer"]:checked'
    );

    if (!selected) {
        quizFeedback.textContent = "Please select an answer first.";
        return;
    }

    answered = true;

    const selectedAnswer = Number(selected.value);
    const question = questions[currentQuestion];

    if (selectedAnswer === question.answer) {
        score++;
        quizFeedback.textContent = "Correct! " + question.explanation;
    } else {
        quizFeedback.textContent =
            "Not quite. " + question.explanation;
    }

    document.querySelectorAll(".quiz-option").forEach((label, index) => {

        const input = label.querySelector("input");

        input.disabled = true;

        if (index === question.answer) {
            label.classList.add("correct");
        } else if (index === selectedAnswer) {
            label.classList.add("incorrect");
        }
    });

    scorePreview.textContent = `Score: ${score}`;

    progressFill.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    nextQuestion.textContent =
        currentQuestion === questions.length - 1
            ? "View Results →"
            : "Next Question →";
}


/* NEXT QUESTION OR FINAL RESULT */

function advanceQuiz() {

    if (!answered) {
        checkAnswer();

        if (!answered) return;
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        showQuizResult();
    }
}


/* DISPLAY FINAL SCORE */

function showQuizResult() {

    quizContent.replaceChildren();
    quizFeedback.textContent = "";
    nextQuestion.disabled = true;
    nextQuestion.hidden = true;

    const percentage = Math.round(
        (score / questions.length) * 100
    );

    let message;

    if (percentage === 100) {
        message = "Excellent! You answered every question correctly.";
    } else if (percentage >= 60) {
        message = "Good work! Review the explanations to strengthen your skills.";
    } else {
        message = "Keep learning! Review the safety tips and try again.";
    }

    quizResult.replaceChildren();

    const heading = document.createElement("h3");
    heading.textContent = `${score} / ${questions.length}`;

    const percent = document.createElement("p");
    percent.textContent = `Awareness quiz score: ${percentage}%`;

    const feedback = document.createElement("p");
    feedback.textContent = message;
    feedback.style.marginTop = "10px";

    quizResult.append(heading, percent, feedback);
    quizResult.hidden = false;

    restartQuiz.hidden = false;

    questionCounter.textContent = "QUIZ COMPLETED";
    scorePreview.textContent = `Final Score: ${score}`;
    progressFill.style.width = "100%";
}


/* RESTART QUIZ */

function resetQuiz() {

    currentQuestion = 0;
    score = 0;
    answered = false;

    nextQuestion.hidden = false;

    renderQuestion();
}


/* BUTTON EVENTS */

nextQuestion.addEventListener("click", advanceQuiz);

restartQuiz.addEventListener("click", resetQuiz);


/* START APPLICATION */

renderQuestion();