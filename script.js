
//hero carousel 
{
    const heroImages = [
    "images/vfx-infinity_war.jpg",
    "images/vfx-fx_particles.png",
    "images/vfx-planet_apes.jpg"
    ];

    let heroIndex = 0;

    function showImage() {
    document.getElementById("hero-img").src = heroImages[heroIndex];
    }

    function nextImage() {
    heroIndex = (heroIndex + 1) % heroImages.length;
    showImage();
    }

    function prevImage() {
    heroIndex = (heroIndex - 1 + heroImages.length) % heroImages.length;
    showImage();
    }
}


//mobile nav
{
    const navToggle = document.querySelector('.nav-toggle'); //select button
    const nav = document.querySelector('header nav'); //select nav menu

    navToggle.addEventListener('click', () => // if button is toggled, nav menu is opened
        {
            nav.classList.toggle('open'); 
        }
    );


}

//quiz
{
  const quizForm = document.getElementById('quiz-form');
  const questionBlocks = quizForm.querySelectorAll('.quiz-question');
  const nextBtn = document.getElementById('quiz-next');
  const resultSection = document.getElementById('quiz-result');
  const resultTitle = document.getElementById('quiz-result-title');
  const resultBody = document.getElementById('quiz-result-body');

  const totalQuestions = questionBlocks.length; // should be 5
  let currentIndex = 0; // start at first question (index 0)
  const scores = { 1: 0, 2: 0, 3: 0, 4: 0 };

  const quizResults = {
    1: {
      title: 'The Visionary',
      body: 'You love experimenting with ideas, mood, and storytelling. You fit early-stage roles like Concept Artist or Storyboard Artist.'
    },
    2: {
      title: 'The Builder',
      body: 'You enjoy turning ideas into detailed 3D assets. You fit roles like 3D Modeler or Texture Artist, where precision and structure matter.'
    },
    3: {
      title: 'The Motion Specialist',
      body: 'You’re drawn to movement, timing, and energy. You fit roles like Animator or FX Artist, bringing scenes to life.'
    },
    4: {
      title: 'The Finisher',
      body: 'You like polishing shots and making them feel cinematic and complete. You fit the role of Compositor.'
    }
  };

  function showQuestion(index) {
    questionBlocks.forEach((block, i) => {
      block.style.display = (i === index) ? 'block' : 'none';
    });

    if (index === totalQuestions - 1) {
      nextBtn.textContent = 'See Your Result';
    } else {
      nextBtn.textContent = 'Next';
    }
  }

  function showResult() {
    // pick the type with the highest score
    let bestType = 1;
    let bestScore = scores[1];

    for (let type = 2; type <= 4; type++) {
      if (scores[type] > bestScore) {
        bestScore = scores[type];
        bestType = type;
      }
    }

    const result = quizResults[bestType];
    resultTitle.textContent = result.title;
    resultBody.textContent = result.body;

    const linkMap = {
        1: [
            { name: "Concept Artist", url: "careers.html#concept-artist" },
            { name: "Storyboard Artist", url: "careers.html#storyboard-artist" }
        ],
        2: [
            { name: "3D Modeler", url: "careers.html#modeler" },
            { name: "Texture Artist", url: "careers.html#texture-artist" }
        ],
        3: [
            { name: "Animator", url: "careers.html#animator" },
            { name: "FX Artist", url: "careers.html#fx-artist" }
        ],
        4: [
            { name: "Compositor", url: "careers.html#compositor" }
        ]
    };

const linkContainer = document.getElementById("result-links");
linkContainer.innerHTML = linkMap[bestType]
  .map(item => `<a href="${item.url}">${item.name}</a>`)
  .join("");


    resultSection.hidden = false;
    resultSection.scrollIntoView({ behavior: 'smooth' });

    // optional: hide questions + button after completion
    quizForm.style.display = 'none';
  }

  nextBtn.addEventListener('click', () => {
    const questionNumber = currentIndex + 1; // q1, q2, etc.
    const selected = quizForm.querySelector(
      'input[name="q' + questionNumber + '"]:checked'
    );

    if (!selected) {
      alert('Please choose an answer before continuing.');
      return;
    }

    const type = parseInt(selected.value, 10); // 1–4
    scores[type] += 1;

    if (currentIndex < totalQuestions - 1) {
      currentIndex += 1;
      showQuestion(currentIndex);
    } else {
      showResult();
    }
  });

  // initialize: show only the first question
  showQuestion(currentIndex);
}



