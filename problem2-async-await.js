const fs = require('node:fs/promises');
const path = require('path');

const filePath = path.join(__dirname, "test", "lumpsum.txt");

async function appendFileName(filePath, fileName) {
    try {
        await fs.appendFile(filePath, fileName + "\n");
        console.log(`Filename added to filenames.txt: ${fileName}`);
    } catch (err) {
        console.error("Error appending filename:", err);
        throw err; // Propagate the error
    }
}

async function writeDataToFile(data, fileName) {
    try {
        await fs.writeFile(fileName, data);
        await appendFileName("filenames.txt", fileName);
        console.log("Data is created for content");
        return fileName;
    } catch (err) {
        console.error(`${err}, error at writeDataToFile`);
        throw err; // Propagate the error
    }
}

async function processUppercaseFile(fileName) {
    try {
        const data = await fs.readFile(fileName, "utf-8");
        const modifiedData = data.toLowerCase().split(". ").join("\n");
        return await writeDataToFile(modifiedData, "lowercase_sentences.txt");
    } catch (err) {
        console.error("Error in processUppercaseFile:", err);
        throw err; // Propagate the error
    }
}

async function sortFileContent(filePath) {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        const sortedData = data.split("\n").sort().join("\n");
        return await writeDataToFile(sortedData, "sorted_sentences.txt");
    } catch (err) {
        console.error("Error in sortFileContent:", err);
        throw err; // Propagate the error
    }
}

async function deleteFilesFromList() {
    try {
        const data = await fs.readFile("filenames.txt", "utf-8");
        const fileNames = data.split("\n").filter((fileName) => fileName.trim() !== "");
        for (const fileName of fileNames) {
            try {
                await fs.unlink(fileName);
                console.log(`Deleted file: ${fileName}`);
            } catch (err) {
                console.error(`Error deleting file ${fileName}:`, err);
                throw err; // Propagate the error
            }
        }
    } catch (err) {
        console.error("Error reading filenames.txt:", err);
        throw err; // Propagate the error
    }
}

async function main(filePath) {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        const upperCaseFileName = await writeDataToFile(data.toUpperCase(), "upperCase.txt");
        await processUppercaseFile(upperCaseFileName);
        await sortFileContent("lowercase_sentences.txt");
        await deleteFilesFromList();
    } catch (err) {
        console.error("Error in main function:", err);
    }
}

main(filePath);
