// "use strict"

// add event on multiple element 

const addEventOnElements = function (elements,eventType,callback){
    for(const elem of elements) elem.addEventListener(eventType,callback);
}

// toggle search box in mob device 

const searchBox = document.querySelector(".search-box");
const searchTogglers = document.querySelectorAll(".search-toggler");

addEventOnElements(searchTogglers,"click",function(){
    searchBox.classList.toggle("active");
})


const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".sidebar");

menuBtn.addEventListener("click", function () {
  sidebar.classList.toggle("active");
  menuBtn.classList.toggle("active");
});
