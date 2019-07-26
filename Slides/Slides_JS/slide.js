//Slide Builder
{
    let targetString=".slideWindow>.currentSlide"
    let animationLib = {
        Bounce: {
            In: {
                targets: targetString,
                translateX: 0,
                rotate: '1turn',
                duration: 800
            },
            Out: {
                targets: targetString,
                translateX: 800,
                rotate: '0turn',
                duration: 800,
            }
        },
        Fade: {
            In: {
                targets: targetString,
                translateX: 0,
                opacity: 1,
                zIndex:0,
                duration: 800,
            },
            Out: {
                targets: targetString,
                translateX: 0,
                opacity: 0,
                zIndex: 0,
                duration: 800,

            }
        }
    }
    class Slide {
        constructor(root, anime) {
            this.$ = root.querySelector.bind(root); //encapsulate selector
            this.$$ = root.querySelectorAll.bind(root);//encapsulate selectorAll
            this.imgs = Array.from(this.$$(".slideWindow>img"));// the Array of img elements
            this.spans = Array.from(this.$$(".slideFooter>.dots>span"));//the Array of dots in the slide window.
            this.bind();
            this.anime = anime;
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
            anime(this.anime.In);
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


    let slider1 = new Slide(document.getElementById("slideSection"), animationLib.Bounce);
}