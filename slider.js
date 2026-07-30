document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelector(".slides");
    const slideItems = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    if (!slides || slideItems.length === 0) return;

    let current = 0;

    function showSlide(index){

        slides.style.transform = `translateX(-${index * 100}%)`;

        dots.forEach(dot => dot.classList.remove("active"));

        dots[index].classList.add("active");

    }

    function nextSlide(){

        current++;

        if(current >= slideItems.length){
            current = 0;
        }

        showSlide(current);

    }

    setInterval(nextSlide,4000);

    dots.forEach((dot,index)=>{

        dot.addEventListener("click",()=>{

            current=index;

            showSlide(current);

        });

    });

    let startX=0;

    slides.addEventListener("touchstart",(e)=>{

        startX=e.touches[0].clientX;

    });

    slides.addEventListener("touchend",(e)=>{

        const endX=e.changedTouches[0].clientX;

        if(startX-endX>50){

            nextSlide();

        }

        if(endX-startX>50){

            current--;

            if(current<0){

                current=slideItems.length-1;

            }

            showSlide(current);

        }

    });

    showSlide(0);

});
