import {promises as fs }from "fs";

const tasksFile = "tasks.json"


async function fileExists(filePath) {
    try {
        await fs.access(filePath)
        return true;
    } catch {
        return false;
    }
}

async function addTask(name, description) {
    if(!(await fileExists(tasksFile))) {
        await fs.writeFile(tasksFile)
    }
}






async function main() {
    const args = process.argv.slice(2)
    const action = args[0].trim().toLowerCase()

    switch(action){
        case "add":
            const [action, name, description] = args

            //check if file exists
            // get file contents
            //add item to contents
            //print added item

            console.log(`Adding ${name}, ${description}`)
            break;
        default:
            console.log("incorrect command")
    }


}


await main()