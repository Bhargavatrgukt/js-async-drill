const path=require("path");
const mainFunction=require("../problem1")

const directoryPath=path.join(__dirname,"randomJSON");

mainFunction(directoryPath)