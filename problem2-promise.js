const { error } = require('node:console');
const fs = require('node:fs/promises');
const path=require("path");

const filePath = path.join(__dirname,"test","lumpsum.txt");


function appendFileName(filePath, fileName) {
    return fs.appendFile(filePath, fileName + "\n") 
    .then(()=>  console.log(`Filename added to filenames.txt: ${fileName}`))
    .catch((err)=> console.log("Error appending filename:", err))
    
}

function writeDataToFile(data,fileName){
   return fs.writeFile(fileName,data)
   .then(()=>{
    appendFileName("filenames.txt", fileName);
    console.log("Data is  created for  content")
    return fileName
})
   .catch((err)=>console.log(`${err}, error at writeDataToFile`))
 }

function processUppercaseFile(fileName){
   return fs.readFile(fileName,"utf-8")
    .then((data)=>{
        let modifiedData = data.toLowerCase().split(". ").join("\n");
        return writeDataToFile(modifiedData, "lowercase_sentences.txt");
    })
    .catch((err)=>console.log(err))
}

function sortFileContent(filePath) {
    return fs.readFile(filePath, "utf-8")
    .then((data)=>{
        let sortedData = data.split("\n").sort().join("\n");
        // Write sorted content to sorted_sentences.txt
        return writeDataToFile(sortedData, "sorted_sentences.txt");
    })
    .catch((err)=>console.log(err,"error is at sortFileContent"))
    
}



function deleteFilesFromList() {
    return fs.readFile("filenames.txt", "utf-8")
    .then((data)=>{
        let fileNames = data.split("\n").filter((fileName) => fileName.trim() !== "")

            // Delete each file listed in filenames.txt
        fileNames.forEach((fileName) => {
                fs.unlink(fileName)
                .then((fileName)=> console.log(`Deleted file: ${fileName}`))
                .catch((err)=> console.log(`Error deleting file ${fileName}:`, err))                 
       })
     })
}


function main(filePath) {
    fs.readFile(filePath, "utf-8")
    .then((data)=>{
       return writeDataToFile(data.toUpperCase(),"upperCase.txt")
    })
    .then((fileName)=>processUppercaseFile(fileName))
    .then(()=> sortFileContent("lowercase_sentences.txt"))
    .then(()=> deleteFilesFromList())
    .catch((err)=>console.log(err))
}

main(filePath)