//Slide Builder
{
    let currentString = ".slideWindow>.currentSlide"
    let waitingString = ".slideWindow>.waitingSlide"
    let imageWidth = document.querySelector(".slideWindow>img").clientWidth;
    let animationLib = {
        Bounce: {
            In: {
                targets: currentString,
                translateX: 0,
                rotate: '1turn',
                duration: 800
            },
            Out: {
                targets: currentString,
                translateX: -imageWidth,
                rotate: '0turn',
                duration: 800,
            },
            Ready: {
                targets: waitingString,
                translateX: imageWidth,
                rotate: '0turn',
                duration: 0,
            }
        },
        Slide: {
            In: {
                targets: currentString,
                translateX: 0,
                duration: 300,
                easing:"linear",
            },
            Out: {
                targets: currentString,
                translateX: -imageWidth,
                duration: 300,
                easing:  'linear',
            },
            Ready: {
                targets: waitingString,
                translateX: imageWidth,
                duration: 0,
            }
        },
        Fade: {
            In: {
                targets: currentString,
                opacity: 1,
                duration: 800,
                easing:"easeInQuad"
            },
            Out: {
                targets: currentString,
                opacity: 0,
                duration: 800,
                easing:"easeInQuad"
            },
            Ready: {
                targets: waitingString,
                opacity: 0,
                duration: 0,
            }
        }
    }

    class Slide {
        constructor(root, animationLib) {
            this.$ = root.querySelector.bind(root); //encapsulate selector
            this.$$ = root.querySelectorAll.bind(root);//encapsulate selectorAll
            this.imgs = Array.from(this.$$(".slideWindow>img"));// the Array of img elements
            this.spans = Array.from(this.$$(".slideFooter>.dots>span"));//the Array of dots in the slide window.
            this.bind();
            this.anime = animationLib;
            anime(this.anime.Ready);
        }

        // Listeners bind.
        bind() {
            this.$(".slideFooter>.dots").addEventListener("click", info => {
                if (info.target.tagName !== "SPAN") return;
                this.makeDotActive(info.target);
                this.makeCurrentSlide(this.currentDot, this.currentSlide);
            })
            this.$(".slideFooter>.nextButton").addEventListener("click", info => {
                this.makeCurrentSlide((this.currentSlide + 1) % this.imgs.length, this.currentSlide);
            })
            this.$(".slideFooter>.preButton").addEventListener("click", info => {
                this.makeCurrentSlide((this.currentSlide - 1 + this.imgs.length) % this.imgs.length, this.currentSlide);
            })
        }

        makeCurrentSlide(indexIn, indexOut) {
            /***
             * make the indexed img as the current img in the window.
             * @param: index. the index of the img of all imgs.
             */
            anime(this.anime.Out);
            this.$(".slideWindow>.currentSlide").classList.remove("currentSlide");
            this.imgs[indexIn].classList.add("currentSlide");
            this.imgs[indexIn].classList.remove("waitingSlide");
            this.makeDotActive(indexIn);
            this.imgs[indexOut].classList.remove("currentSlide");
            this.imgs[indexOut].classList.add("waitingSlide");
            anime(this.anime.In).finished.then(() => {
                anime(this.anime.Ready)});
        }

        makeDotActive(dotOrIndex) {
            /***
             * make the indexed dot as the current dot in the window.
             * @param: dotOrIndex. the index of the dot of all dots. Or the elementNode dot.
             */
            if (typeof dotOrIndex === 'number') {
                this.$("span.active").classList.remove("active");
                this.spans[dotOrIndex].classList.add("active");
                return;
            }
            this.$("span.active").classList.remove("active");
            dotOrIndex.classList.add("active");
        }

        get currentSlide() {
            /***
             * return the current img index;
             */
            return this.imgs.indexOf(this.$(".slideWindow>img.currentSlide"));
        }

        get currentDot() {
            /***
             * return the current dot index;
             */
            return this.spans.indexOf(this.$(".dots>span.active"));
        }
    }


    let slider1 = new Slide(document.getElementById("slideSection"), animationLib.Fade);
}