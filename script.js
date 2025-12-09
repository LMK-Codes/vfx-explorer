
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

