import {promises as fs} from "fs";
import {TASKS_FILENAME} from "./constants";

async function fileExists(filePath) {
    try {
        await fs.access(filePath)
        return true;
    } catch {
        return false;
    }
}

async function updateFile(tasks, message){
    try {
        await fs.writeFile(TASKS_FILENAME, JSON.stringify(tasks, null, 2))
        console.log(message)
    } catch (error) {
        console.error("Error writing to file:", error.message)
    }
}


export {fileExists, updateFile}