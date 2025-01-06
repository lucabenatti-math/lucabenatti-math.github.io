const talkTemplate = (id,title,location,date,event,photo,subtitle,link_slides,link_video) => {
    let talk_button_slides = ``;
    let talk_button_video = ``;
    let talk_subtitle = ``;
    if(link_slides !== null){
        talk_button_slides = `<a class="outlined" href="${link_slides}" style="font-size: 1rem;--button-background:var(--background-second-color); --button-color:var(--text-color); --button-outline:var(--text-color);">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path class="slides-icon"></path>
                                </svg> 
                                SLIDES
                            </a>`;
    }
    if(link_video !== null){
        talk_button_video = `<a class="outlined" href="${link_video}" style="font-size: 1rem;--button-background:var(--background-second-color); --button-color:var(--text-color); --button-outline:var(--text-color);">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path class="movie-icon" stroke-width="2"></path>
                                </svg> 
                                VIDEO 
                            </a>`;
    }
    return `<div class="swiper-slide talk">
                <div class="talk-image">
                    <img src="${photo}">
                </div>
                <div class="talk-description">
                    <p>${location}</p>
                    <p>${date}</p>
                    <h3>${title}</h3>
                    ${talk_subtitle}
                    <p><em>${event}</em></p>
                    <div class="container">
                        ${talk_button_slides}
                        ${talk_button_video}
                    </div>
                </div>
                <div class="autoplay-progress"></div>
            </div>`;
};


const eventTemplate = (id,title,organizers,date,description,speakers,photo,button_link) => `
    <div class="swiper-slide event">
        <div class="event-description">
            <p>${date}</p>
            <h2> ${title}</h2>
            <h3><em>Organized with ${organizers}</em></h3>
            <p>${description}</p>
            <div></div>
            <p><b>Speakers:</b> ${speakers}</p>
        </div>
        <div class="event-img">
            <img src="${photo}">
        </div>
        <a class="outlined" href="${button_link}" style="--button-background:var(--background-second-color);--button-color:var(--text-color);">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path  class="link-icon"></path> 
            </svg> 
            SEE MORE
        </a>
    </div>
`;

const researchTemplate = (id,title,description,photo,link) => `
    <div class="topic-button">
        <img src="${photo}"/>
        <div class="banner">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path class="arrow-out-box-icon"></path>
            </svg> 
            <h3>${title}</h3>
            <p>${description}</p>
        <a href="${link}">
        </a>
    </div>
`;

const newsTemplate = (id,title,link) => `
    <a href="${link}">
        <h3>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path class="link-icon"></path>
            </svg>
        </h3>
        ${title}
    </a>
`;

function formatDate(inputDate) {
    // Create a Date object from the input date string
    const date = new Date(inputDate);

    // Define months array
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Extract day, month, and year from the Date object
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    // Format the month using the months array
    const month = months[monthIndex];

    // Construct the formatted date string
    const formattedDate = day + " " + month + " " + year;

    // Return the formatted date string
    return formattedDate;
}


async function loadData() {
    try {
        const response = await fetch("database.sqlite");
        const buffer = await response.arrayBuffer();

        // Initialize SQL.js with the database buffer
        const SQL = await initSqlJs({ locateFile: () => "sql-wasm.wasm"});
        const db = new SQL.Database(new Uint8Array(buffer));

        // Execute a query to retrieve data
        const results = db.exec("SELECT * FROM talks ORDER BY date DESC; SELECT * FROM events;SELECT * FROM research;SELECT * FROM upcoming_events");
        
        var nTalks = results[0].values.length;
        for(var j = 0; j<2; j++){
            var result = results[0].values[nTalks-2];
            document.getElementById("TalksWrapper").innerHTML+= talkTemplate(result[0]+1000*j,result[1],result[2],formatDate(result[3]),result[4],result[5],result[6],result[7],result[8]);
            var result = results[0].values[nTalks-1]; 
            document.getElementById("TalksWrapper").innerHTML+= talkTemplate(result[0]+1000*j,result[1],result[2],formatDate(result[3]),result[4],result[5],result[6],result[7],result[8]);
            for(let i=2; i<results[0].values.length; i++){
                var result = results[0].values[i-2]; 
                document.getElementById("TalksWrapper").innerHTML+= talkTemplate(result[0]+1000*j,result[1],result[2],formatDate(result[3]),result[4],result[5],result[6],result[7],result[8]);
            }
        }
        
        var nEvents = results[1].values.length;
        for(let i = 0; i<nEvents; i++){
            var result = results[1].values[i]; 
            document.getElementById("EventsWrapper").innerHTML+= eventTemplate(result[0],result[1],result[2],result[3],result[4],result[5],result[6],result[7]);
        }
        
        var nResearch = results[2].values.length;
        for(let i = 0; i<nResearch; i++){
            var result = results[2].values[i]; 
            document.getElementById("Topics").innerHTML+= researchTemplate(result[0],result[1],result[2],result[3],result[4]);
        }
        
        
        var nNews = results[3].values.length;
        for(let i = 0; i<nNews; i++){
            var result = results[3].values[i]; 
            document.getElementById("NewsList").innerHTML+= newsTemplate(result[0],result[1],result[2]);
        }
        
        
        MathJax.typeset();

        // Close the database connection
        db.close();
        
        
    } catch (error) {
        console.error('Error loading database:', error);
    }
    
    let progressUpdatable = true;
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
        watchSlidesVisibility: false,
        centeredSlides:true,
        touchMoveStopPropagation:true,
        simulateTouch:true,
        keyboard:true,
        autoplay: {
            enabled:true,
            delay: 10000, // Delay between transitions in milliseconds
            pauseOnMouseEnter: true,
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
                    typeof params.modifier === "function" ? params.modifier(centerOffset) : centerOffset * params.modifier;
                    let translateZ = -translate * Math.abs(offsetMultiplier);
                    const opacity = Math.min(Math.max(1+translateZ/600,0),1);
                    const fading = Math.min(Math.max((500+translateZ)/100, 0), 1);
                    slide.style.setProperty("--overlay-opacity", 1-opacity);
                    slide.style.setProperty("--shadow-opacity", opacity);
                    slide.style.opacity = fading;
                });
            },  
            autoplayTimeLeft(s, time, progress) {
                let widthPercentage = 100 - progress * 100;
                const progressLine = document.querySelector(".swiper-slide-active .autoplay-progress");
                if(progressUpdatable){
                    progressLine.style.width = widthPercentage + "%";
                } 
            },
            touchStart(){
                progressUpdatable = false;
                const progressLines = document.querySelectorAll(".swiper-slide .autoplay-progress");
                progressLines.forEach((line)=>{
                   if (!line.closest('.swiper-slide').classList.contains('swiper-slide-active')){
                       line.style.width = 0;
                   }  
                });
            },
            
            touchEnd(){
                progressUpdatable = true;
            }
        }
       
    });
    const eventSwiper = new Swiper(".events", {
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
            el: ".events-pagination",
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
        //on: {
        //    slideChange: function(){
        //        var activeIndex = this.activeIndex;
        //        var orgSlides = this.slides;
        //        for (var j = 0; j < orgSlides.length; j++){
        //            var orgContent = orgSlides[j].querySelector(".organization-content");
        //            var childElements = orgContent.children;
        //            for (var i = 0; i < childElements.length; i++) {
        //                var childElement = childElements[i];
        //                if(j === activeIndex){
        //                    var transitionDelay = 0.1 + i * 0.1;
        //                    childElement.style.transition = ".5s ease";
        //                    childElement.style.transitionDelay = transitionDelay + "s";
        //                } else {
        //                    childElement.style.transitionDelay = "0s";
        //                    childElement.style.transition = ".1s";
        //                }
        //            }
        //        }
        //    },
//
        //},

    });
}


loadData();