const researchTemplate = (id,title,description,photo,link) => `
    <div class="research-line">
        <div class="research-image">
            <img src="${photo}">
        </div>
        <div class="research-cover">
            <div style="display: flex;flex-direction: column;gap:.4rem; margin-bottom: 1rem;">
                <h2>${title}</h2>
                <p>${description}</p>
            </div>
            <div  class="svg_button" style="width:7rem;"  data-aligned="left">
                <svg width="7rem" height="2.5rem" viewBox="-70 -25 140 50">
                    <a href="${link}">
                        <rect x="-70 " y="-25" width="140" height="50" fill="var(--main-color)" mask="url(#${id}seemore)" stroke="0pt"  vector-effect="non-scaling-stroke"></rect> 
                        <mask id="${id}seemore">
                            <rect x="-70" y="-25" width="140" height="50" vector-effect="non-scaling-stroke" stroke="0pt" fill="black"></rect>
                            <text text-anchor="middle" dominant-baseline="central" fill="white" font-weight="600">
                                SEE MORE
                            </text>
                        </mask>
                    </a>
                </svg>
            </div>
        </div>
    </div>
`;


const socialTemplate = (id,icon,link) => `
    <div class="svg_button">
        <svg width="50px" height="50px" viewBox="-30 -30 60 60">
            <a href="${link}">
                <rect x="-30" y="-30" width="60" height="60" fill="var(--main-color)" mask="url(#${id}-mask)" vector-effect="non-scaling-stroke"></rect>
                <mask id="${id}-mask">
                    <rect   x="-30" y="-30" width="60" height="60" fill="black" vector-effect="non-scaling-stroke"></rect>
                    <path d="${icon}" fill="white"></path>
                </mask>
            </a>
        </svg>
    </div>
`;


const paperTemplate = (id,title,coauthors,journal,year,url) => {
    let coauthorsTemplate =``;
    if(coauthors!==null){
        coauthorsTemplate =`with ${coauthors}, `;
    }
    return `<li style="font-size:1rem; color:var(--text-light-second);">
        <a href="${url}" style="color:var(--text-color);text-decoration: underline;font-size:1.1rem;">${title}</a><br/>
        ${coauthorsTemplate}<em>${journal}</em> (${year}).
    </li>`
};


const talkTemplate = (id,title,location,date,event,photo,link_slides,link_video) => {
    let talk_button_slides = ``;
    let talk_button_video = ``;
    if(link_slides !== null){
        talk_button_slides = `<svg class="talk-button" width="5.5rem" height="2.5rem">
                    <a href="${link_slides}">
                        <rect class="rounded-button color" mask="url(#${id}talkmask)"  vector-effect="non-scaling-stroke"></rect>
                        <mask id="${id}talkmask">
                            <rect class="rounded-button"  vector-effect="non-scaling-stroke"></rect>
                            <text class="button-text" dx="50%" dy="50%">
                                <tspan>slides</tspan>
                            </text>
                        </mask>
                    </a>
                </svg>`;
    }
    if(link_video !== null){
        talk_button_video = `<svg class="talk-button" width="5.5rem" height="2.5rem">
                    <a href="${link_video}">
                        <rect class="rounded-button color" mask="url(#${id}talkmask-video)"  vector-effect="non-scaling-stroke"></rect>
                        <mask id="${id}talkmask-video">
                            <rect class="rounded-button"  vector-effect="non-scaling-stroke"></rect>
                            <text class="button-text" dx="50%" dy="50%">
                                <tspan>video</tspan>
                            </text>
                        </mask>
                    </a>
                </svg>`;
    }
    return `<div class="swiper-slide">
        <div class="overlayed-color"></div>   
        <div class="talk-wrapper">          
            <div class="talks-image" >
                <img src="${photo}"></img>
            </div>
            <div class="talks-details">
                <center><p style="color:var(--text-light);">${location}</p></center>
                <center><p><b>${date}</b></p></center>
                <center><h4 style="color:var(--main-color); margin:.7rem 0rem;">${title}</h4></center>
                <center><p style="color:var(--text-light);"><em>${event}</em></p></center>
            </div>
            <div class="talks-buttons">
                ${talk_button_slides}
                ${talk_button_video}
            </div>
        </div>
    </div>`;
};


const eventTemplate = (id,title,subtitle,date,content,photo,button_text,button_link) => `
    <div class="swiper-slide">
        <div class="organization-content">
            <h4><b>${date}</b></h4>
            <h2 style="color:var(--main-color);"> ${title}</h2>
            <h4 style="color:var(--text-light); font-weight: 300;margin-bottom:.2rem;"><em>${subtitle}</em></h4>
            <ul>
                ${content}
            </ul>
            <svg class="organization-button" width="14rem" height="2.5rem">
                <a href="${button_link}">
                    <rect class="rounded-button color" mask="url(#${id}eventmask)"  vector-effect="non-scaling-stroke"></rect>
                    <mask id="${id}eventmask">
                        <rect class="rounded-button"  vector-effect="non-scaling-stroke"></rect>
                        <text class="button-text" dx="50%" dy="50%">
                            <tspan>${button_text}</tspan>
                        </text>
                    </mask>
                </a>
            </svg>
        </div>
        <div class="organization-img">
            <img src="${photo}">
        </div>
    </div>
`;

const yearTemplate = (year) => `
    <div class="swiper-slide"> 
        <div class="year">
            <h3>${year}</h3>
        </div>
    </div>
`;


const teachingTemplate = (activities) => `
    <div class="swiper-slide"> 
        ${activities}
    </div>
`;


