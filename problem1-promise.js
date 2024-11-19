const fs = require('node:fs/promises');
const path = require("path");

const filePath = path.join(__dirname, "test", "randomJSON", "promiseDir");

const createJSONFiles = (filePath, filesToCreate) => {
    const filePromises = [];
    for (let i = 0; i < filesToCreate; i++) {
        const filePathRando = path.join(filePath, `file${i + 1}.json`);
        const data = { id: i + 1, value: Math.random() };

        const writePromise = fs.writeFile(filePathRando, JSON.stringify(data))
            .then(() => {
                console.log(`File ${filePathRando} is created`);
                return filePathRando; // Return the file path for deletion
            });
        filePromises.push(writePromise);
    }
    return Promise.all(filePromises); // Resolves with an array of file paths
};

const deleteJSONFiles = (filePaths) => {
    const deletePromises = filePaths.map((filePath) => {
        return fs.unlink(filePath)
            .then(() => console.log(`File ${filePath} is deleted`))
            .catch((err) => {
                console.log(`Error deleting file ${filePath}: ${err}`);
                return Promise.reject(err); // Propagate the error
            });
    });
    return Promise.all(deletePromises); // Wait for all deletions to complete
};

const createAndDeleteJSONFiles = (filePath) => {
    fs.mkdir(filePath, { recursive: true })
        .then(() => {
            console.log("Directory is created");
            return createJSONFiles(filePath, 5); // Create 5 JSON files
        })
        .then((filePaths) => {
            console.log("All files are created. Starting deletion...");
            return deleteJSONFiles(filePaths); // Delete all created files
        })
        .then(() => {
            console.log("All files have been deleted successfully");
        })
        .catch((err) => {
            console.log(`Error in the operation: ${err}`);
        });
};

createAndDeleteJSONFiles(filePath);
