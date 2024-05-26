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
        
        
        var nSocial = results[5].values.length;
        for(let i=0; i<nSocial; i++){
            var result = results[5].values[i]; 
            document.getElementById("socialButtons").innerHTML+=  socialTemplate(result[0],result[1],result[2]);
        }
        db.close();
        } catch (error) {
            console.error('Error loading database:', error);
        }
}

loadData();
