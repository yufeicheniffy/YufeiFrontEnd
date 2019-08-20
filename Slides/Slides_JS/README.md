#使用范例
1. 将slide.js下载并放入项目
2. 将anime.min.js下载并放入项目
```HTML
HTML:
<section id="slideSection">
    <div class="slideModule">
        <div class="slideWindow">
        <!--加入任意轮播-->
            <img src="img/1.png" alt="">
            <img src="img/2.png" alt="">
            <img src="img/3.png" alt="">
            <img src="img/4.png" alt="">
            <img src="img/5.png" alt="">
        </div>
   </div>
    <script src="Lib/anime.min.js"></script>
    <script src="slide.js"></script>
    <script>
    //可以再次选择动画
        let slider1 = new Slide(document.getElementById("slideSection"), animationLib.Slide);
    </script>
</section>
```