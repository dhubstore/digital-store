const slides=document.querySelectorAll(".hero-slide");

const dots=document.querySelectorAll(".dot");

const next=document.querySelector(".hero-next");

const prev=document.querySelector(".hero-prev");

let current=0;

function showSlide(index){

slides.forEach(slide=>slide.classList.remove("active"));

dots.forEach(dot=>dot.classList.remove("active"));

slides[index].classList.add("active");

dots[index].classList.add("active");

current=index;

}

next.onclick=()=>{

current++;

if(current>=slides.length){

current=0;

}

showSlide(current);

};

prev.onclick=()=>{

current--;

if(current<0){

current=slides.length-1;

}

showSlide(current);

};

dots.forEach((dot,index)=>{

dot.onclick=()=>{

showSlide(index);

};

});

setInterval(()=>{

current++;

if(current>=slides.length){

current=0;

}

showSlide(current);

},5000);
