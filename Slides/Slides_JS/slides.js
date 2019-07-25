const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

$(".slideFooter>.dots").addEventListener("click", info => {
    if (info.target.tagName !== "SPAN") return;
    makeDotActive(info.target);
    let index = Array.from($$(".slideFooter>.dots>span")).indexOf($(".dots>span.active"));
    makeCurrentSlide(index);
})

$(".slideFooter>.nextButton").addEventListener("click", info => {
    let index = Array.from($$(".slideWindow>img")).indexOf($(".slideWindow>img.currentSlide"));
    makeCurrentSlide((index + 1) % $$(".slideWindow>img").length);
})
$(".slideFooter>.preButton").addEventListener("click", info => {
    let index = Array.from($$(".slideWindow>img")).indexOf($(".slideWindow>img.currentSlide"));
    makeCurrentSlide((index - 1 + $$(".slideWindow>img").length) % $$(".slideWindow>img").length);
})

function makeCurrentSlide(index) {
    $(".slideWindow>.currentSlide").classList.remove("currentSlide");
    $$(".slideWindow>img")[index].classList.add("currentSlide");
    makeDotActive(index);
}

function makeDotActive(dot) {
    console.log(typeof dot)
    if (typeof dot === 'number') {
        $("span.active").classList.remove("active");
        $$(".dots>span")[dot].classList.add("active");
        return;
    }
    $("span.active").classList.remove("active");
    dot.classList.add("active");
}
