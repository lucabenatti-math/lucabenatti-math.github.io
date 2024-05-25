var isMouseOver = false;
var timeoutWheel;
var timeoutClosed;
const yearsSelector = document.querySelector(".years");


function resetRotation(swiper){
    for (let i = 0, length = swiper.slides.length; i < length; i += 1) {
        const slideEl = swiper.slides[i];
        const slideSize = swiper.slidesSizesGrid[i];
        const slideTransform = `translate3d(${-i*slideSize}px,0px, 0px)  rotateZ(0deg)`;
        slideEl.style.transform = slideTransform;
    }
}


async function loadData() {
    try {
        // Load the SQLite database file directly
        const response = await fetch('database.sqlite');
        const buffer = await response.arrayBuffer();

        // Initialize SQL.js with the database buffer
        const SQL = await initSqlJs({ locateFile: () => 'sql-wasm.wasm' });
        const db = new SQL.Database(new Uint8Array(buffer));

        // Execute a query to retrieve data
        const results = db.exec("SELECT * FROM research; SELECT * FROM papers ORDER BY date DESC; SELECT * FROM talks ORDER BY date DESC; SELECT * FROM events;SELECT * FROM teaching ORDER BY year;");

        var nResarch = results[0].values.length;
        for(let i=0; i<nResarch; i++){
            var result = results[0].values[i]; 
            document.getElementById("wrapperResearch").innerHTML+=  researchTemplate(result[0],result[1],result[2],result[3],result[4]);;
        }
        var nPapers = results[1].values.length;
        for(let i=0; i<nPapers; i++){
            var result = results[1].values[i];
            document.getElementById("wrapperPapers").innerHTML += paperTemplate(result[0],result[1],result[2],result[3],result[4],result[5]);
        }
        var nTalks = results[2].values.length;
        for(var j = 0; j<2; j++){
            var result = results[2].values[nTalks-2];
            document.getElementById("wrapperTalks").innerHTML+= talkTemplate(result[0]+1000*j,result[1],result[2],formatDate(result[3]),result[4],result[5],result[7],result[8]);
            var result = results[2].values[nTalks-1]; 
            document.getElementById("wrapperTalks").innerHTML+= talkTemplate(result[0]+1000*j,result[1],result[2],formatDate(result[3]),result[4],result[5],result[7],result[8]);
            for(let i=2; i<results[2].values.length; i++){
                var result = results[2].values[i-2]; 
                document.getElementById("wrapperTalks").innerHTML+= talkTemplate(result[0]+1000*j,result[1],result[2],formatDate(result[3]),result[4],result[5],result[7],result[8]);
            }
        }
        var nEvents = results[3].values.length;
        for(let i=0; i<nEvents; i++){
            var result = results[3].values[i]; 
            document.getElementById("wrapperOrganization").innerHTML+= eventTemplate(result[0],result[1],result[2],result[3],result[4],result[5],result[6],result[7]);
        }
        var nTeaching = results[4].values.length;
        for(let i=0; i<nTeaching; i++){
            var result = results[4].values[i]; 
            document.getElementById("wrapperYears").innerHTML+= yearTemplate(result[1]);
            document.getElementById("wrapperTeaching").innerHTML+= yearTemplate(result[2]);
        }
        MathJax.typeset();

        // Close the database connection
        db.close();
    } catch (error) {
        console.error('Error loading database:', error);
    }
    
    
    // SWIPER FOR SELECTED TALKS
    const progressLine = document.querySelector(".autoplay-progress svg line");
    const talkSwiper = new Swiper(".talks", {
        loop:true,
        effect:"coverflow",
        loopAdditionalSlides:4,
        spaceBetween:0,
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: false,
        },
        initialSlide:2,
        slidesPerView:"auto",
        watchSlidesVisibility: true,
        centeredSlides:true,
        touchMoveStopPropagation:true,
        simulateTouch:true,
        keyboard:true,
        pagination: {
            el: ".talks-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 3000, // Delay between transitions in milliseconds
            pauseOnMouseEnter: true,// Set to true to disable autoplay on user interaction
        },   
        navigation: {
            nextEl: ".talks-button-next",
            prevEl: ".talks-button-prev"
        },
        on: {
            setTranslate: function () {
                // THIS CODE IS MODIFIED STARTING FROM THE ORIGINAL CODE BY SWIPER JS //
                const { width: swiperWidth, height: swiperHeight, slides, slidesSizesGrid } = this;
                const params = this.params.coverflowEffect;
                const transform = this.translate;
                const center =  -transform + swiperWidth / 2;
                slides.forEach((slide,i) => {
                    const slideOffset = slide.swiperSlideOffset;
                    const slideSize = slidesSizesGrid[i];
                    const translate = params.depth;
                    const centerOffset = (center - slideOffset - slideSize / 2) / slideSize;
                    const offsetMultiplier =
                        typeof params.modifier === "function"
                            ? params.modifier(centerOffset)
                            : centerOffset * params.modifier;
                    let translateZ = -translate * Math.abs(offsetMultiplier);
                        slide.querySelector(".talk-wrapper").style.opacity= Math.min(Math.max(1+translateZ/600,0),1);
                });
            },
            setTransition: function (duration) {
                var slides = this.slides;
                slides.forEach((slide,i) => {
                    slide.querySelector(".talk-wrapper").style.transitionDuration =`${duration}ms`; });
            },
            autoplayTimeLeft(s, time, progress) {
                if(progress>=1){
                    progressLine.style.opacity=0;
                } else if (progress<1.5){
                    progressLine.style.opacity=Math.max(10*(progress-.05));
                } else if(progress >.8) {
                    progressLine.style.opacity=(1 - progress)*5;
                }
                progressLine.setAttribute("x1", 3+40*progress+"px");
                progressLine.setAttribute("x2", 83-40*progress+"px");
            }  
        }
    });
    
    const orgSwiper = new Swiper(".organization", {
        loop: true,
        direction: "horizontal",
        resistanceRatio:0,
        speed:200,
        freeMode:false,
        touchMoveStopPropagation:true,
        simulateTouch:true,
        mousewheel: {
            enable: false,
            invert: false,
            forceToAxis: true,
        },
        pagination: {
            el: ".organization-pagination",
            clickable: true,
        },
        effect:"creative",
        nested: true,
        creativeEffect: {
            next: {
                opacity:0,
            },
            prev: {
                opacity:0,
            },
            active: {
                opacity:1,
            },
        },
        on: {
            slideChange: function(){
                var activeIndex = this.activeIndex;
                var orgSlides = this.slides;
                for (var j = 0; j < orgSlides.length; j++){
                    var orgContent = orgSlides[j].querySelector(".organization-content");
                    var childElements = orgContent.children;
                    for (var i = 0; i < childElements.length; i++) {
                        var childElement = childElements[i];
                        if(j === activeIndex){
                            var transitionDelay = 0.1 + i * 0.1;
                            childElement.style.transition = ".5s ease";
                            childElement.style.transitionDelay = transitionDelay + "s";
                        } else {
                            childElement.style.transitionDelay = "0s";
                            childElement.style.transition = ".1s";
                        }
                    }
                }
            },

        },

    });
    var yearsSwiper = new Swiper(".years", {
        slidesPerView:5,
        initialSlide:document.querySelectorAll(".teaching .swiper-wrapper .swiper-slide").length-1,
        watchSlidesVisibility: true,
        centeredSlides:true,
        touchMoveStopPropagation:true,
        simulateTouch:true,
        effect:"creative",
        //coverflowEffect:{
          //  slideShadows:false,
        //},
        on: {
            setTranslate: function tranlsate () {
                // Each slide offset from center
                clearTimeout(timeoutWheel);
                for (let i = 0, length = this.slides.length; i < length; i += 1) {
                    const slideEl = this.slides[i];
                    const transform = this.translate;
                    const slideSize = this.slidesSizesGrid[i];
                    var rotate = (2- i )*30 - transform / slideSize  * 30;
                    if(rotate> 120 )
                        rotate =120;
                    else if (rotate < -120)
                        rotate =-120
                    else 
                        rotate = Math.round(rotate);
                    if (yearsSelector.classList.contains("wheel-closed")) {
                        const slideTransform = `translate3d(${-i*slideSize}px,0px, 0px)  rotateZ(0deg)`;
                        slideEl.style.transform = slideTransform;
                    } else {
                        const slideTransform = `translate3d(${-i*slideSize}px,0px, 0px)  rotateZ(${rotate}deg)`;
                        slideEl.style.transform = slideTransform;
                    }

                }
            },
            transitionEnd: function () {
                if(!isMouseOver){
                    clearTimeout(timeoutWheel);
                    timeoutWheel = setTimeout(()=>{
                        yearsSelector.classList.remove("wheel-open");
                        clearTimeout(timeoutClosed);
                        timeoutClosed = setTimeout(()=>{
                            yearsSelector.classList.add("wheel-closed"); 
                            resetRotation(this);
                        }, 400);
                    }, 2000);
                }
            },
            click: function (){
                this.slideTo(this.clickedIndex);
            }
        }
    });

    var teachingSwiper = new Swiper(".teaching", {
        loopAdditionalSlides:4,
        initialSlide:document.querySelectorAll(".teaching .swiper-wrapper .swiper-slide").length-1,
        slidesPerView:1,
        watchSlidesVisibility: true,
        centeredSlides:true,
        touchMoveStopPropagation:true,
        simulateTouch:true,
        keyboard:true});

    yearsSwiper.on("slideChange", function(){
        var activeIndex = yearsSwiper.activeIndex;
        teachingSwiper.slideTo(activeIndex);
    });

    teachingSwiper.on("slideChange", function(){
        var activeIndex = teachingSwiper.activeIndex;
        yearsSwiper.slideTo(activeIndex);
    });
    yearsSelector.addEventListener("mouseenter",()=>{
        clearTimeout(timeoutWheel);
        clearTimeout(timeoutClosed);
        yearsSelector.classList.add("wheel-open");
        yearsSelector.classList.remove("wheel-closed");
        isMouseOver =true;
    });

    yearsSelector.addEventListener("mouseleave", () =>{
        clearTimeout(timeoutWheel);
        timeoutWheel = setTimeout(()=>{
            yearsSelector.classList.remove("wheel-open");
            clearTimeout(timeoutClosed);
            timeoutClosed = setTimeout(()=>{
                yearsSelector.classList.add("wheel-closed"); resetRotation(yearsSwiper);}, 400);
        }, 2000);
        isMouseOver=false;
    });
    
}

loadData();