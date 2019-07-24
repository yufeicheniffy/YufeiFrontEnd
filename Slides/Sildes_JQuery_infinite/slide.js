{
    let slideAnimation={
        currentState:"currentSlide",
        waitingState:"waitingSlide",
        leaveState:"leaveSlide",
    }
    let animation=slideAnimation;
    initState();
    let imgIndex = 0;
    let imgSize= $(".slideWindow>img").length;
    setInterval(() => {
        playSlide(imgIndex+1);
        imgIndex=(imgIndex+1)%imgSize;
    }, 1000)

    function initState() {
        $(".slideWindow>img:first-child").addClass(animation.currentState);
        $(".slideWindow>img").addClass(animation.waitingState);
        $(".slideWindow>img:first-child").removeClass(animation.waitingState);
    }

    function playSlide(nth) {//make nth image as the current slide
        $(`.slideWindow>img:nth-child(${nth})`).removeClass(animation.waitingState).addClass(animation.currentState);
        let $preNode = $(`.slideWindow>img:nth-child(${nth===1?imgSize:nth - 1})`);
        $preNode.removeClass(animation.currentState).addClass(animation.leaveState)
            .one('transitionend', () => {
                $preNode.removeClass(animation.leaveState).addClass(animation.waitingState);
            });
    }
}