{
    let timerIndex=0; //increase while time increase, in order to get which picture should be shown.
    let imageSize=$('.slider>img').length;
    let timer=setTimer();

    // move the slide
    let $buttons=$('.buttons>button')
    $buttons.on('click',(button)=>{
        let $slider=$('.slider');
        let picIndex=$(button.currentTarget).index();
        $slider[0].setAttribute('style','transform: translateX(-'+picIndex*860+'px)');
        $buttons.removeClass('onclick').eq(picIndex).addClass('onclick');
        timerIndex=picIndex;
    })

    // next/last page
    let $nextPage=$('.nextPageButton');
    $nextPage.on('click',()=>{
        $buttons[(timerIndex+1)%imageSize].click();
    });
    let $lastPage=$('.lastPageButton');
    $lastPage.on('click',()=>{
        $buttons[(timerIndex-1+imageSize)%imageSize].click();
    });
    pauseTimer($nextPage);
    pauseTimer($lastPage);


    //auto-move
    let $slideWindow=$('.slideWindow');
    pauseTimer($slideWindow);

    function setTimer(){
        return setInterval(()=>{
            $buttons[(timerIndex+1)%imageSize].click();
        },1000);
    }

    function pauseTimer($element){
        $element.on('mouseenter',()=>{
            window.clearInterval(timer);
        })
        $element.on('mouseleave',()=>{
            timer=setTimer();
        })
    }
}