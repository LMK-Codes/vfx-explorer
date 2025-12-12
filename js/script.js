
//hero carousel 
{
    //array containing images 
    const heroImages = [
    "images/vfx-infinity_war.jpg",
    "images/vfx-fx_particles.png",
    "images/vfx-planet_apes.jpg"
    ];

    let heroIndex = 0; // index for images

    //calling the image
    function showImage() {
      document.getElementById("hero-img").src = heroImages[heroIndex];
    }

    //calling next image (next button)
    function nextImage() {
      heroIndex = (heroIndex + 1) % heroImages.length;
      showImage();
    }

    //calling prev image (next button)
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
  // quiz elements (recieved from the page)
  const quizForm = document.getElementById('quiz-form');          // wrapper that holds all questions
  const questionBlocks = quizForm.querySelectorAll('.quiz-question'); // each individual question
  const nextBtn = document.getElementById('quiz-next');           // next button

  const resultSection = document.getElementById('quiz-result');   // hidden result box
  const resultTitle = document.getElementById('quiz-result-title'); // result heading text
  const resultBody = document.getElementById('quiz-result-body');   // result description paragraph

  const totalQuestions = questionBlocks.length;  // how many questions in the quiz (could be updated)
  let currentIndex = 0;                          // start at first question (index 0)

  // stores how many times each type (1–4) was picked for the result
  const scores = { 1: 0, 2: 0, 3: 0, 4: 0 };

  // text for each personality type
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

  // shows one question at a time
  function showQuestion(index) {
    questionBlocks.forEach((block, i) => {
      block.style.display = (i === index) ? 'block' : 'none';
    });

    // change button text on last question
    if (index === totalQuestions - 1) {
      nextBtn.textContent = 'See Your Result';
    } else {
      nextBtn.textContent = 'Next';
    }
  }

  // calculate final result and show it
  function showResult() {
    // find which type has the highest score
    let bestType = 1;
    let bestScore = scores[1];

    for (let type = 2; type <= 4; type++) {
      if (scores[type] > bestScore) {
        bestScore = scores[type];
        bestType = type;
      }
    }

    // calculates result + displays it
    const result = quizResults[bestType];
    resultTitle.textContent = result.title;
    resultBody.textContent = result.body;

    // connect each type to career and link to careers page
    const linkMap = {
      1: [
        { name: "Concept Artist",    url: "careers.html#concept-artist" },
        { name: "Storyboard Artist", url: "careers.html#storyboard-artist" }
      ],
      2: [
        { name: "3D Modeler",   url: "careers.html#modeler" },
        { name: "Texture Artist", url: "careers.html#texture-artist" }
      ],
      3: [
        { name: "Animator",  url: "careers.html#animator" },
        { name: "FX Artist", url: "careers.html#fx-artist" }
      ],
      4: [
        { name: "Compositor", url: "careers.html#compositor" }
      ]
    };

    // builds HTML links for the result section
    const linkContainer = document.getElementById("result-links");
    linkContainer.innerHTML = linkMap[bestType]
      .map(item => `<a href="${item.url}">${item.name}</a>`)
      .join("");

    // show the result box and scroll to it
    resultSection.hidden = false;
    resultSection.scrollIntoView({ behavior: 'smooth' });

    // hide the quiz questions after finishing
    quizForm.style.display = 'none';
  }

  // button click (updates score, moves on to next) 
  nextBtn.addEventListener('click', () => {

    //updates question #
    const questionNumber = currentIndex + 1; 

    // which option was selected for this question
    const selected = quizForm.querySelector(
      'input[name="q' + questionNumber + '"]:checked'
    );
    // if nothing selected, show alert
    if (!selected) {
      alert('Please choose an answer before continuing.');
      return;
      }

    // add 1 point to the chosen type (1–4)
    const type = parseInt(selected.value, 10);
    scores[type] += 1;

    // either go to next question or show final result
    if (currentIndex < totalQuestions - 1) {
      currentIndex += 1;
      showQuestion(currentIndex);
    } else {
      showResult();
    }

  });

  // shows first question
  showQuestion(currentIndex);
}
