const fsModule = require("fs");
const path = require("path");


const filePath=path.join(__dirname,"test","randomJSON","promiseDir")

// Custom promise wrapper for fs.writeFile
const writeFileAsync = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fsModule.writeFile(filePath, JSON.stringify(data), (err) => {
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
        fsModule.unlink(filePath, (err) => {
            if (err) {
                reject(`Error deleting file ${filePath}: ${err}`);
            } else {
                resolve(`File ${filePath} deleted.`);
            }
        });
    });
};

// Function to create and delete files using promises
const createAndDeleteJSONFiles = (dirPath) => {
    const filesToCreate = 5; // Number of JSON files to create


    for (let i = 0; i < filesToCreate; i++) {
        const filePath = path.join(dirPath, `file${i + 1}.json`);
        const data = { id: i + 1, value: Math.random() };

        // Add the file creation promise to the array
        writeFileAsync(filePath, data)
            .then((message) => {
                console.log(message);
                // Once file is created, add the deletion promise
                return unlinkAsync(filePath);
            })
            .then((message) => {
                console.log(message);
            })
            .catch((err) => {
                console.error(err);
            });

    }

};

// Main function to create directory and process files
const main = (directoryPath) => {
    fsModule.mkdir(directoryPath, (err) => {
        if (err) {
            console.log("Error creating directory:", err);
            return;
        }
        createAndDeleteJSONFiles(directoryPath);
    });
};

main(filePath);
