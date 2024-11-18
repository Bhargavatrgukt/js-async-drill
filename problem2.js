const fs = require("fs");

function appendFileName(filePath, fileName) {
    fs.appendFile(filePath, fileName + "\n", (err) => {
        if (err) {
            console.log("Error appending filename:", err);
        } else {
            console.log(`Filename added to filenames.txt: ${fileName}`);
        }
    });
}

function writeDataToFile(data, fileName, callback = () => {}) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.log(err);
        } else {
            appendFileName("filenames.txt", fileName);
            callback(); // Execute the callback after file writing is done
        }
    });
}

function processUppercaseFile(filePath = "uppercase.txt", callback) {
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            // Convert to lowercase and split into sentences
            let modifiedData = data.toLowerCase().split(". ").join("\n");

            // Write to lowercase_sentences.txt
            writeDataToFile(modifiedData, "lowercase_sentences.txt", callback);
        }
    });
}

function sortFileContent(filePath = "lowercase_sentences.txt", callback) {
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            // Sort sentences alphabetically
            let sortedData = data.split("\n").sort().join("\n");

            // Write sorted content to sorted_sentences.txt
            writeDataToFile(sortedData, "sorted_sentences.txt", callback);
        }
    });
}


function deleteFilesFromList(callback) {
    fs.readFile("filenames.txt", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            // Get all the filenames from filenames.txt
            let fileNames = data.split("\n").filter((fileName) => fileName.trim() !== "");

            // Delete each file listed in filenames.txt
            fileNames.forEach((fileName) => {
                fs.unlink(fileName, (err) => {
                    if (err) {
                        console.log(`Error deleting file ${fileName}:`, err);
                    } else {
                        console.log(`Deleted file: ${fileName}`);
                    }
                });
            });
        }
        callback(); // Indicate completion of the deletion process
    });
}

function main(filePath) {
    fs.readFile(filePath, "utf-8", (error, data) => {
        if (error) {
            console.log(error);
        } else {
            let uppercaseData = data.toUpperCase();

            // Write uppercase data to a new file, then process it
            writeDataToFile(uppercaseData, "uppercase.txt", () => {
                processUppercaseFile("uppercase.txt", () => {
                    sortFileContent("lowercase_sentences.txt", () => {
                        deleteFilesFromList(() => {
                            console.log("All files processed and deleted.");
                        });
                    });
                });
            });
        }
    });
}

module.exports = main;
