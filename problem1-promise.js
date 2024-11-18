const fs = require('node:fs/promises');
const path=require("path");

const filePath=path.join(__dirname,"test","randomJSON","promiseDir")

// 1. Create a directory of random JSON files
// 2. Delete those files simultaneously 

const createAndDeleteJSONFiles=(filePath)=>{
   fs.mkdir(filePath,{recursive:true})
   .then(()=>console.log("Directory is created"))
   .catch(()=> console.log("Error at direactroy creation"))
   .then(()=>{
    const filesToCreate = 5; // Number of JSON files I take 5 here 

    for (let i = 0; i < filesToCreate; i++) {
        const filePathRando = path.join(filePath, `file${i + 1}.json`);
        const data = { id: i + 1, value: Math.random() };
        fs.writeFile(filePathRando,JSON.stringify(data))
        .then(()=>{
            console.log(`file ${filePathRando} is created`)
            fs.unlink(filePathRando)
            .then(()=>console.log(`file ${filePathRando} is deleted`))
            .catch((err)=>console.log(`${err} error at file ${filePathRando} is deleted`))
        })
        .catch((err)=>console.log(`${err} , errMsg at writing file`))
    }
   })
   .catch((err)=>console.log(`${err},errMsg at file creationAndDeletionOperation`))
}



createAndDeleteJSONFiles(filePath)

