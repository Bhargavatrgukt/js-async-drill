const fsModule=require("fs");
const path=require("path");

// Using callbacks and the fs module's asynchronous functions, do the following:
// 1. Create a directory of random JSON files
// 2. Delete those files simultaneously 



const createAndDeleteJSONFiles = (dirPath) => {
    const filesToCreate = 5; // Number of JSON files I take 5 here 

    for (let i = 0; i < filesToCreate; i++) {
        const filePath = path.join(dirPath, `file${i + 1}.json`);
        const data = { id: i + 1, value: Math.random() };

        fsModule.writeFile(filePath, JSON.stringify(data), (err) => {
            if (err) {
                console.error(`Error creating file ${filePath}:`, err);
                return;
            }
            console.log(`File ${filePath} created.`);

           

            fsModule.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Error deleting file ${filePath}:`, err);
                    return;
                }
                console.log(`File ${filePath} deleted.`);
            });
        });
    }
};


const main=function(directoryPath){
    fsModule.mkdir(directoryPath,(err)=>{
    if(err){
        console.log(err,"error here")
    }
    createAndDeleteJSONFiles(directoryPath)
})


}

module.exports=main






