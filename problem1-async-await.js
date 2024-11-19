const fs = require('node:fs/promises');
const path = require("path");

const filePath = path.join(__dirname, "test", "randomJSON", "promiseDir");

const createJSONFiles = async (filePath, filesToCreate) => {
    const filePaths = [];
    for (let i = 0; i < filesToCreate; i++) {
        const filePathRando = path.join(filePath, `file${i + 1}.json`);
        const data = { id: i + 1, value: Math.random() };

        try {
            await fs.writeFile(filePathRando, JSON.stringify(data));
            console.log(`File ${filePathRando} is created`);
            filePaths.push(filePathRando); // Add the file path to the list for deletion
        } catch (err) {
            console.error(`Error creating file ${filePathRando}: ${err}`);
        }
    }
    return filePaths; // Return the list of file paths
};

const deleteJSONFiles = async (filePaths) => {
    for (const filePath of filePaths) {
        try {
            await fs.unlink(filePath);
            console.log(`File ${filePath} is deleted`);
        } catch (err) {
            console.error(`Error deleting file ${filePath}: ${err}`);
        }
    }
};

const createAndDeleteJSONFiles = async (filePath) => {
    try {
        await fs.mkdir(filePath, { recursive: true });
        console.log("Directory is created");

        const createdFiles = await createJSONFiles(filePath, 5);
        console.log("All files are created. Starting deletion...");

        await deleteJSONFiles(createdFiles);
        console.log("All files have been deleted successfully");
    } catch (err) {
        console.error(`Error in the operation: ${err}`);
    }
};

createAndDeleteJSONFiles(filePath);
