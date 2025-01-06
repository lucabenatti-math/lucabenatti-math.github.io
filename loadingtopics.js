
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

const paperTemplate = (id,title,coauthors,journal,date,url) => {
    
    let paper_coauthors = ``;
    if(coauthors!==null){
        paper_coauthors =`with ${coauthors}, `;
    }
    return`
    <li class="paper">
        <a href="${url}" style="text-decoration:underline;">${title}</a><p>${paper_coauthors}<em>${journal}</em> (${date})</p>
    </li>`;
};

async function loadData() {
    try {
        const response = await fetch("database.sqlite");
        const buffer = await response.arrayBuffer();

        // Initialize SQL.js with the database buffer
        const SQL = await initSqlJs({ locateFile: () => "sql-wasm.wasm"});
        const db = new SQL.Database(new Uint8Array(buffer));

        // Execute a query to retrieve data
        const results = db.exec("SELECT * FROM research; SELECT * FROM papers");
        
        var nResearch = results[0].values.length;
        for(let i = 0; i<nResearch; i++){
            var result = results[0].values[i]; 
            document.getElementById("Topics").innerHTML+= researchTemplate(result[0],result[1],result[2],result[3],result[4]);
        }
        var nPapers = results[1].values.length;
        for(let i = 0; i<nPapers; i++){
            var result = results[1].values[i]; 
            document.getElementById("ListOfPapers").innerHTML+= paperTemplate(result[0],result[1],result[2],result[3],result[4],result[5]);
        }

        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

        // Close the database connection
        db.close();
        
        
    } catch (error) {
        console.error('Error loading database:', error);
    }
    
}


loadData();