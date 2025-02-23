document.addEventListener("DOMContentLoaded", function () {
    const scrollArrow = document.getElementById('scroll-arrow');
    scrollArrow.addEventListener('click', function () {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });

    const workItemsContainer = document.querySelector('.work__items');

    const workImages = {
        "work-1": ["1.webp", "2.webp", "3.webp"],
        "work-2": ["1.webp", "2.webp", "3.webp"],
        "work-3": ["1.webp", "2.webp", "3.webp"],
        "work-4": ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"],
        "work-5": ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"],
        "work-6": ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp"],
        "work-7": ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp", "10.webp", "11.webp"],
        "work-8": ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp"],
        "work-9": ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"],
        "work-10": ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp"]
    };

    Object.entries(workImages).forEach(([folder, images]) => {
        const workItem = document.createElement('div');
        workItem.classList.add('work__item');

        const workPreview = document.createElement('div');
        workPreview.classList.add('work__preview');

        images.forEach((image, index) => {
            const img = document.createElement('img');
            img.classList.add('work__item-img');
            const imagePath = `./images/${folder}/${image}`;
            img.setAttribute('src', imagePath);
            img.alt = 'project photo';

            if (index === 0) {
                img.classList.add('work__preview-photo');
            }

            workPreview.appendChild(img);
        });

        workItem.appendChild(workPreview);
        workItemsContainer.appendChild(workItem);
    });

    const traineeItemsContainer = document.querySelector('.trainee__items');

    const traineeImages = {
        "trainee-1": ["1.webp"],
        "trainee-2": ["1.webp", "2.webp"],
        "trainee-3": ["1.webp"],
        "trainee-4": ["1.webp", "2.webp", "3.webp"],
        "trainee-5": ["1.webp", "2.webp"],
        "trainee-6": ["1.webp"],
        "trainee-7": ["1.webp", "2.webp"],
        "trainee-8": ["1.webp", "2.webp"],
        "trainee-9": ["1.webp"],
        "trainee-10": ["1.webp"]
    };

    Object.entries(traineeImages).forEach(([folder, images]) => {
        const traineeItem = document.createElement('div');
        traineeItem.classList.add('trainee__item');

        const traineePreview = document.createElement('div');
        traineePreview.classList.add('trainee__preview');

        images.forEach((image, index) => {
            const img = document.createElement('img');
            img.classList.add('trainee__item-img');
            const imagePath = `./images/${folder}/${image}`;
            img.setAttribute('src', imagePath);
            img.alt = 'project photo';

            if (index === 0) {
                img.classList.add('trainee__preview-photo');
            }

            traineePreview.appendChild(img);
        });

        traineeItem.appendChild(traineePreview);
        traineeItemsContainer.appendChild(traineeItem);
    });

    
    const modal = document.querySelector('.modal');
    const swiperWrapper = modal.querySelector('.swiper-wrapper');
    const modalSliderMiniatures = modal.querySelector('.swiper-wrapper.modal__slider-miniatures');

    
    workItemsContainer.addEventListener('click', (event) => {
        const item = event.target.closest('.work__item');
        if (!item) return;

        swiperWrapper.innerHTML = '';
        modalSliderMiniatures.innerHTML = '';

        const images = item.querySelectorAll('.work__preview img');
        images.forEach(img => {
            const swiperSlide = document.createElement('div');
            swiperSlide.classList.add('swiper-slide');
            swiperSlide.innerHTML = `<img src="${img.src}" />`;
            swiperWrapper.appendChild(swiperSlide);

            const swiperSlideThumbnail = document.createElement('div');
            swiperSlideThumbnail.classList.add('swiper-slide');
            swiperSlideThumbnail.innerHTML = `<img src="${img.src}" />`;
            modalSliderMiniatures.appendChild(swiperSlideThumbnail);
        });

        
        if (typeof swiper !== 'undefined') swiper.destroy(true, true);
        if (typeof swiper2 !== 'undefined') swiper2.destroy(true, true);

        swiper = new Swiper(".mySwiper", {
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
        });

        swiper2 = new Swiper(".mySwiper2", {
            spaceBetween: 10,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            thumbs: {
                swiper: swiper,
            },
        });

        let scrollPerformed = false;

        item.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        const checkScroll = () => {
            const rect = item.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                if (!scrollPerformed) {
                    modal.classList.add('open');
                    document.body.classList.add('hidden');
                } else {
                    setTimeout(() => {
                        modal.classList.add('open');
                        document.body.classList.add('hidden');
                    }, 200);
                }
                window.removeEventListener('scroll', checkScroll);
            }
        };

        const rect = item.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            modal.classList.add('open');
            document.body.classList.add('hidden');
        } else {
            scrollPerformed = true;
            window.addEventListener('scroll', checkScroll);
        }
    });

    
    traineeItemsContainer.addEventListener('click', (event) => {
        const item = event.target.closest('.trainee__item');
        if (!item) return;

        swiperWrapper.innerHTML = '';
        modalSliderMiniatures.innerHTML = '';

        const images = item.querySelectorAll('.trainee__preview img');
        images.forEach(img => {
            const swiperSlide = document.createElement('div');
            swiperSlide.classList.add('swiper-slide');
            swiperSlide.innerHTML = `<img src="${img.src}" />`;
            swiperWrapper.appendChild(swiperSlide);

            const swiperSlideThumbnail = document.createElement('div');
            swiperSlideThumbnail.classList.add('swiper-slide');
            swiperSlideThumbnail.innerHTML = `<img src="${img.src}" />`;
            modalSliderMiniatures.appendChild(swiperSlideThumbnail);
        });

        
        if (typeof swiper !== 'undefined') swiper.destroy(true, true);
        if (typeof swiper2 !== 'undefined') swiper2.destroy(true, true);

        swiper = new Swiper(".mySwiper", {
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
        });

        swiper2 = new Swiper(".mySwiper2", {
            spaceBetween: 10,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            thumbs: {
                swiper: swiper,
            },
        });

        let scrollPerformed = false;

        item.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        const checkScroll = () => {
            const rect = item.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                if (!scrollPerformed) {
                    modal.classList.add('open');
                    document.body.classList.add('hidden');
                } else {
                    setTimeout(() => {
                        modal.classList.add('open');
                        document.body.classList.add('hidden');
                    }, 200);
                }
                window.removeEventListener('scroll', checkScroll);
            }
        };

        const rect = item.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            modal.classList.add('open');
            document.body.classList.add('hidden');
        } else {
            scrollPerformed = true;
            window.addEventListener('scroll', checkScroll);
        }
    });

    modal.addEventListener('click', (e) => {
        if (!e.target.closest('.modal__inner')) {
            modal.classList.remove('open');
            document.body.classList.remove('hidden');
            zoomActive = false;
            zoomButton.classList.remove('active');
        }
    });

    var animation = lottie.loadAnimation({
        container: document.getElementById('scroll-arrow'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: './../portfolio/images/icons/scroll-arrow.json'
    });

    var animation2 = lottie.loadAnimation({
        container: document.getElementById('telegram'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: './../portfolio/images/icons/telegram.json'
    });

    var animation3 = lottie.loadAnimation({
        container: document.getElementById('instagram'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: './../portfolio/images/icons/instagram.json'
    });

    var animation4 = lottie.loadAnimation({
        container: document.getElementById('behance'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: './../portfolio/images/icons/behance.json'
    });

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'telegram') {
                    animation2.play();
                } else if (entry.target.id === 'instagram') {
                    animation3.play();
                } else if (entry.target.id === 'behance') {
                    animation4.play();
                }
                observer.unobserve(entry.target); 
            }
        });
    }

    const zoomButton = document.querySelector(".modal__zoom");

    let zoomActive = false;

    if (zoomButton) {

        zoomButton.addEventListener("click", () => {
            zoomActive = !zoomActive;

            if (zoomActive) {
                zoomButton.classList.add('active');
            } else {
                zoomButton.classList.remove('active');
            }

            document.querySelectorAll(".mySwiper2 .swiper-slide img").forEach(img => {
                img.style.transform = "scale(1)";
                img.style.transformOrigin = "center";
            });
        });

        modal.addEventListener("mouseover", () => {
            document.querySelectorAll(".mySwiper2 .swiper-slide img").forEach(img => {
                img.addEventListener("mousemove", (e) => {
                    if (zoomActive) {
                        const rect = img.getBoundingClientRect();
                        const x = ((e.clientX - rect.left) / rect.width) * 100;
                        const y = ((e.clientY - rect.top) / rect.height) * 100;
                        img.style.transform = "scale(2)";
                        img.style.transformOrigin = `${x}% ${y}%`;
                    }
                });
            });
        });
    }


    const options = {
        root: null, 
        rootMargin: '-10px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    observer.observe(document.getElementById('telegram'));
    observer.observe(document.getElementById('instagram'));
    observer.observe(document.getElementById('behance'));
});
