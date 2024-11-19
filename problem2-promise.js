const fs = require('node:fs/promises');
const path = require('path');

const filePath = path.join(__dirname, "test", "lumpsum.txt");

function appendFileName(filePath, fileName) {
    return fs.appendFile(filePath, fileName + "\n")
        .then(() => {
            console.log(`Filename added to filenames.txt: ${fileName}`);
        })
        .catch((err) => {
            console.log("Error appending filename:", err);
            return Promise.reject(err);
        });
}

function writeDataToFile(data, fileName) {
    return fs.writeFile(fileName, data)
        .then(() => {
            return appendFileName("filenames.txt", fileName)
                .then(() => {
                    console.log("Data is created for content");
                    return fileName;
                });
        })
        .catch((err) => {
            console.log(`${err}, error at writeDataToFile`);
            return Promise.reject(err);
        });
}

function processUppercaseFile(fileName) {
    return fs.readFile(fileName, "utf-8")
        .then((data) => {
            let modifiedData = data.toLowerCase().split(". ").join("\n");
            return writeDataToFile(modifiedData, "lowercase_sentences.txt");
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        });
}

function sortFileContent(filePath) {
    return fs.readFile(filePath, "utf-8")
        .then((data) => {
            let sortedData = data.split("\n").sort().join("\n");
            return writeDataToFile(sortedData, "sorted_sentences.txt");
        })
        .catch((err) => {
            console.log(err, "error is at sortFileContent");
            return Promise.reject(err);
        });
}

function deleteFilesFromList() {
    return fs.readFile("filenames.txt", "utf-8")
        .then((data) => {
            let fileNames = data.split("\n").filter((fileName) => fileName.trim() !== "");
            const deletePromises = fileNames.map((fileName) => {
                return fs.unlink(fileName)
                    .then(() => {
                        console.log(`Deleted file: ${fileName}`);
                    })
                    .catch((err) => {
                        console.log(`Error deleting file ${fileName}:`, err);
                        return Promise.reject(err);
                    });
            });
            return Promise.all(deletePromises);
        })
        .catch((err) => {
            console.log("Error reading filenames.txt:", err);
            return Promise.reject(err);
        });
}

function main(filePath) {
    fs.readFile(filePath, "utf-8")
        .then((data) => {
            return writeDataToFile(data.toUpperCase(), "upperCase.txt");
        })
        .then((fileName) => processUppercaseFile(fileName))
        .then(() => sortFileContent("lowercase_sentences.txt"))
        .then(() => deleteFilesFromList())
        .catch((err) => {
            console.log(err);
        });
}

main(filePath);
