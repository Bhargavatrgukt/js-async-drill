const fs = require('fs');
const path = require("path");

const filePath = path.join(__dirname, "test", "lumpsum.txt");

// Custom Promise wrappers for fs operations
const readFileAsync = (filePath, encoding = "utf-8") => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                reject(`Error reading file ${filePath}: ${err}`);
            } else {
                resolve(data);
            }
        });
    });
};

const writeFileAsync = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if (err) {
                reject(`Error writing to file ${filePath}: ${err}`);
            } else {
                resolve(`File ${filePath} written successfully.`);
            }
        });
    });
};

const appendFileAsync = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, data + "\n", (err) => {
            if (err) {
                reject(`Error appending to file ${filePath}: ${err}`);
            } else {
                resolve(`Data appended to file ${filePath}.`);
            }
        });
    });
};

const unlinkFileAsync = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                reject(`Error deleting file ${filePath}: ${err}`);
            } else {
                resolve(`File ${filePath} deleted successfully.`);
            }
        });
    });
};

// Main operations
const writeDataToFile = (data, fileName) => {
    return writeFileAsync(fileName, data)
        .then(() => appendFileAsync("filenames.txt", fileName))
        .then(() => fileName)
        .catch((err) => Promise.reject(err));
};

const processUppercaseFile = (fileName) => {
    return readFileAsync(fileName)
        .then((data) => {
            const modifiedData = data.toLowerCase().split(". ").join("\n");
            return writeDataToFile(modifiedData, "lowercase_sentences.txt");
        })
        .catch((err) => Promise.reject(err));
};

const sortFileContent = (fileName) => {
    return readFileAsync(fileName)
        .then((data) => {
            const sortedData = data.split("\n").sort().join("\n");
            return writeDataToFile(sortedData, "sorted_sentences.txt");
        })
        .catch((err) => Promise.reject(err));
};

const deleteFilesFromList = () => {
    return readFileAsync("filenames.txt")
        .then((data) => {
            const fileNames = data.split("\n").filter((fileName) => fileName.trim() !== "");
            const deletionPromises = fileNames.map((fileName) => unlinkFileAsync(fileName));
            return Promise.all(deletionPromises);
        })
        .catch((err) => Promise.reject(err));
};

// Main function
const main = (filePath) => {
    readFileAsync(filePath)
        .then((data) => writeDataToFile(data.toUpperCase(), "upperCase.txt"))
        .then((fileName) => processUppercaseFile(fileName))
        .then(() => sortFileContent("lowercase_sentences.txt"))
        .then(() => deleteFilesFromList())
        .then(() => console.log("All operations completed successfully."))
        .catch((err) => console.error(err));
};

main(filePath);
