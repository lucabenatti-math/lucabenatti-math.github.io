async function loadData() {
    try {
        // Load the SQLite database file directly
        const response = await fetch('database.sqlite');
        const buffer = await response.arrayBuffer();

        // Initialize SQL.js with the database buffer
        const SQL = await initSqlJs({ locateFile: () => 'sql-wasm.wasm' });
        const db = new SQL.Database(new Uint8Array(buffer));

        // Execute a query to retrieve data
        const results = db.exec("SELECT * FROM research; SELECT * FROM papers ORDER BY date DESC; SELECT * FROM talks ORDER BY date DESC; SELECT * FROM events;SELECT * FROM teaching ORDER BY year; SELECT* FROM social");
        
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
        var nSocial = results[5].values.length;
        for(let i=0; i<nSocial; i++){
            var result = results[5].values[i]; 
            document.getElementById("socialButtons").innerHTML+=  socialTemplate(result[0],result[1],result[2]);
        }
        db.close();
        } catch (error) {
            console.error('Error loading database:', error);
        }
    
        // SWIPER FOR SELECTED TALKS
        const progressLine = document.querySelector(".autoplay-progress svg line");
        const autoplayProgress = document.querySelector(".autoplay-progress");
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
                        autoplayProgress.style.opacity=0;
                    } else if (progress<1.5){
                        autoplayProgress.style.opacity=Math.max(10*(progress-.05));
                    } else if(progress >.8) {
                        autoplayProgress.style.opacity=(1 - progress)*5;
                    }
                progressLine.setAttribute("x1",3+40*progress+"px");
                progressLine.setAttribute("x2", 83-40*progress+"px");

                }  
            }
        });
}

loadData();
