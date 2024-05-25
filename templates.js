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
            <svg width="7rem" height="2.5rem">
                <a href="${link}">
                    <rect class="rounded-button color" mask="url(#${id}seemore)"  vector-effect="non-scaling-stroke"></rect>
                    <mask id="${id}seemore">
                        <rect class="rounded-button"  vector-effect="non-scaling-stroke"></rect>
                        <text class="button-text" dx="50%" dy="50%">
                            <tspan>See more</tspan>
                        </text>
                    </mask>
                </a>
            </svg>
        </div>
    </div>
`;


var socialsData =[
    { id: 1, link: "https://arxiv.org/search/math?searchtype=author&query=Benatti,+L", icon: "arxiv" },
    { id: 2, link: "https://scholar.google.com/citations?view_op=list_works&hl=it&user=v9uPo6IAAAAJ&gmla=AJsN-F5ZHMc5Eww_QoxsmD7pzyV3_g99e3iIqCUhCY_8_EuMC3AAsJfswOj-CbSQMDhbPEOAsJeTdX6aqMAJHkhr49GfC7_5kAS6AHdeuacwfA9vo2hll4RUxJRln31FVVomVbGQRAop", icon: "google" },
    { id: 3, link: "https://orcid.org/0000-0002-4685-7443", icon: "orcid" },
    { id: 4, link: "https://cvgmt.sns.it/person/3317/", icon: "cvgmt" },
    { id: 5, link: "https://www.researchgate.net/profile/Luca-Benatti", icon: "rgate" }
];

const socialTemplates = (id,link,icon) => `
    <div class="svg_button">
        <svg style="margin:-1px;" width="50px" height="50px" viewBox="0 0 64 64">
            <a href="${link}">
                <rect class="rounded-button color" mask="url(#${id}-mask)" vector-effect="non-scaling-stroke"></rect>
                <mask id="${id}-mask">
                    <rect class="rounded-button inverted" vector-effect="non-scaling-stroke"></rect>
                    <path class="icon-${icon}" width="20%"></path>
                </mask>
            </a>
        </svg>
    </div>
`;
socialsData.forEach(social => {
    const istance = socialTemplates(social.id,social.link,social.icon);
    document.getElementById("socialButtons").innerHTML +=istance;
});

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


