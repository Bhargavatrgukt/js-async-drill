const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "test", "randomJSON", "promiseDir");

// Custom promise wrapper for fs.mkdir
const mkdirAsync = (dirPath) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(dirPath, { recursive: true }, (err) => {
            if (err) {
                reject(`Error creating directory ${dirPath}: ${err}`);
            } else {
                resolve(`Directory ${dirPath} created.`);
            }
        });
    });
};

// Custom promise wrapper for fs.writeFile
const writeFileAsync = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if (err) {
                reject(`Error creating file ${filePath}: ${err}`);
            } else {
                resolve(`File ${filePath} created.`);
            }
        });
    });
};

// Custom promise wrapper for fs.unlink
const unlinkAsync = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                reject(`Error deleting file ${filePath}: ${err}`);
            } else {
                resolve(`File ${filePath} deleted.`);
            }
        });
    });
};

// Function to create and delete JSON files using promises
const createAndDeleteJSONFiles = (dirPath) => {
    const filesToCreate = 5; // Number of JSON files to create
    const filePromises = [];

    for (let i = 0; i < filesToCreate; i++) {
        const filePath = path.join(dirPath, `file${i + 1}.json`);
        const data = { id: i + 1, value: Math.random() };

        // Chain promises for file creation and deletion
        const filePromise = writeFileAsync(filePath, data)
            .then((message) => {
                console.log(message);
                return unlinkAsync(filePath);
            })
            .then((message) => {
                console.log(message);
            })
            .catch((err) => {
                console.error(err);
            });

        filePromises.push(filePromise);
    }

    // Wait for all file operations to complete
    return Promise.all(filePromises)
        .then(() => {
            console.log("All files have been created and deleted successfully.");
        })
        .catch((err) => {
            console.error("Error in file operations:", err);
        });
};

// Main function to create directory and process files
const main = (directoryPath) => {
    mkdirAsync(directoryPath)
        .then((message) => {
            console.log(message);
            return createAndDeleteJSONFiles(directoryPath);
        })
        .catch((err) => {
            console.error(err);
        });
};

main(filePath);
