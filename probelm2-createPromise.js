const fs = require('fs');
const path = require("path");

const filePath = path.join(__dirname, "test", "lumpsum.txt");

// Function to append a file name to a text file
function appendFileName(filePath, fileName) {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, fileName + "\n", (err) => {
            if (err) {
                reject(`Error appending filename: ${err}`);
            } else {
                console.log(`Filename added to filenames.txt: ${fileName}`);
                resolve(); // Successfully appended
            }
        });
    });
}

// Function to write data to a file
function writeDataToFile(data, fileName) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, data, (err) => {
            if (err) {
                reject(`${err}, error at writeDataToFile`);
            } else {
                appendFileName("filenames.txt", fileName).then(() => {
                    console.log("Data is created for content");
                    resolve(fileName); // Resolve the filename after writing
                }).catch(reject); // Handle appendFileName error
            }
        });
    });
}

// Function to process the file content to lowercase and modify the sentence format
function processUppercaseFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, "utf-8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                let modifiedData = data.toLowerCase().split(". ").join("\n");
                writeDataToFile(modifiedData, "lowercase_sentences.txt")
                    .then(() => resolve("lowercase_sentences.txt"))
                    .catch(reject);
            }
        });
    });
}

// Function to sort the content of a file
function sortFileContent(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) {
                reject(`Error reading file: ${err}`);
            } else {
                let sortedData = data.split("\n").sort().join("\n");
                writeDataToFile(sortedData, "sorted_sentences.txt")
                    .then(() => resolve("sorted_sentences.txt"))
                    .catch(reject);
            }
        });
    });
}

// Function to delete files from the list in filenames.txt
function deleteFilesFromList() {
    return new Promise((resolve, reject) => {
        fs.readFile("filenames.txt", "utf-8", (err, data) => {
            if (err) {
                reject(`Error reading filenames.txt: ${err}`);
            } else {
                let fileNames = data.split("\n").filter((fileName) => fileName.trim() !== "");
                let deletionPromises = fileNames.map((fileName) => {
                    return new Promise((delResolve, delReject) => {
                        fs.unlink(fileName, (err) => {
                            if (err) {
                                delReject(`Error deleting file ${fileName}: ${err}`);
                            } else {
                                console.log(`Deleted file: ${fileName}`);
                                delResolve();
                            }
                        });
                    });
                });

                // Wait for all deletions to complete
                Promise.all(deletionPromises)
                    .then(() => resolve())
                    .catch(reject);
            }
        });
    });
}

// Main function to orchestrate the process
function main(filePath) {
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            console.log(`Error reading the input file: ${err}`);
        } else {
            writeDataToFile(data.toUpperCase(), "upperCase.txt")
                .then((fileName) => processUppercaseFile(fileName))
                .then(() => sortFileContent("lowercase_sentences.txt"))
                .then(() => deleteFilesFromList())
                .catch((err) => console.log(err));
        }
    });
}

main(filePath);
