// Track quiz answers
const quizAnswers = {
  q1: "correct",
  q2: "correct",
  q3: "correct",
  q4: "correct",
  q5: "correct",
  q6: "correct",
  q7: "correct",
  q8: "correct",
  q9: "correct",
  q10: "correct",
}

// Update progress based on completed sections
const sectionsCompleted = [true, false, false, false, false] // Home is default

function updateProgress() {
  const completed = sectionsCompleted.filter((s) => s).length
  const percentage = Math.round((completed / 5) * 100)
  document.getElementById("progressFill").style.width = percentage + "%"
  document.getElementById("progressText").textContent = percentage
}

function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active")
  })

  // Show selected section
  document.getElementById(sectionId).classList.add("active")

  // Update nav buttons
  document.querySelectorAll(".module-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  document.querySelector(`[data-section="${sectionId}"]`).classList.add("active")

  // Mark section as completed
  const sectionIndex = {
    home: 0,
    learn: 1,
    resources: 2,
    activities: 3,
    quiz: 4,
  }
  sectionsCompleted[sectionIndex[sectionId]] = true
  updateProgress()

  // Scroll to top
  window.scrollTo(0, 0)
}

function checkChoice(button, isCorrect, message) {
  // Disable all buttons in this scenario
  const buttonContainer = button.closest(".choice-buttons")
  const allButtons = buttonContainer.querySelectorAll(".choice-btn")
  allButtons.forEach((btn) => (btn.disabled = true))

  // Show feedback
  if (isCorrect) {
    button.classList.add("correct-answer")
    showFeedback(message, true)
  } else {
    button.classList.add("wrong-answer")
    showFeedback(message, false)
  }
}

function showFeedback(message, isCorrect) {
  // Create feedback element
  const feedback = document.createElement("div")
  feedback.className = "feedback-message"
  feedback.textContent = message
  feedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${isCorrect ? "#D4EDDA" : "#F8D7DA"};
        color: ${isCorrect ? "#155724" : "#721C24"};
        padding: 30px;
        border-radius: 20px;
        border: 3px solid ${isCorrect ? "#28A745" : "#DC3545"};
        font-size: 1.2em;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        max-width: 80%;
        text-align: center;
        animation: popIn 0.4s ease;
    `
  document.body.appendChild(feedback)

  setTimeout(() => {
    feedback.style.animation = "fadeOut 0.4s ease"
    setTimeout(() => feedback.remove(), 400)
  }, 2000)
}

function submitQuiz(event) {
  event.preventDefault()

  // Check answers
  const answers = {
    q1: document.querySelector('input[name="q1"]:checked')?.value || "",
    q2: document.querySelector('input[name="q2"]:checked')?.value || "",
    q3: document.querySelector('input[name="q3"]:checked')?.value || "",
    q4: document.querySelector('input[name="q4"]:checked')?.value || "",
    q5: document.querySelector('input[name="q5"]:checked')?.value || "",
    q6: document.querySelector('input[name="q6"]:checked')?.value || "",
    q7: document.querySelector('input[name="q7"]:checked')?.value || "",
    q8: document.querySelector('input[name="q8"]:checked')?.value || "",
    q9: document.querySelector('input[name="q9"]:checked')?.value || "",
    q10: document.querySelector('input[name="q10"]:checked')?.value || "",
  }

  // Count correct
  let score = 0
  for (const key in answers) {
    if (answers[key] === "correct") score++
  }

  // Display results
  showQuizResults(score)
}

function showQuizResults(score) {
  // Hide form, show results
  document.getElementById("quizForm").style.display = "none"
  document.getElementById("quizResults").style.display = "block"
  document.getElementById("scoreValue").textContent = score

  // Show appropriate message
  let message = ""
  if (score === 10) {
    message = "🌟🎉🏆 PERFECT! You're a Digital Citizenship Superstar! You got everything right!"
  } else if (score >= 9) {
    message = "👏😊 Outstanding! You're a Digital Citizenship Superstar!"
  } else if (score >= 7) {
    message = "🌟 Great job! You're well on your way to being an excellent digital citizen!"
  } else if (score >= 5) {
    message = "👍 Good effort! Review the materials and try again to improve your score!"
  } else {
    message = "📚 Keep learning! Review the video and resources, then try the quiz again!"
  }

  document.getElementById("resultMessage").textContent = message
}

function retakeQuiz() {
  // Reset form
  document.getElementById("quizForm").reset()
  document.getElementById("quizForm").style.display = "block"
  document.getElementById("quizResults").style.display = "none"
}

// Add fadeOut animation
const style = document.createElement("style")
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`
document.head.appendChild(style)

// Initialize
updateProgress()
