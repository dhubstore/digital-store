// ============================
// CATEGORY CLICK
// ============================

document.querySelectorAll(".category-card").forEach(card=>{

card.addEventListener("click",()=>{

const category=card.dataset.category;

console.log("Selected:",category);

// Products filtering will be connected later.

});

});
