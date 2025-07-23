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


async function getTasks() {
    if(!(await fileExists(tasksFile))) {
        const data = JSON.stringify([])
        await fs.writeFile(tasksFile, data)
        return []
    } else {
        const data = await fs.readFile(tasksFile);
        return JSON.parse(data.toString())
    }
}

async function addTasks(args){
    const tasks = await getTasks()
    const [_, name, description] = args
    const date = new Date()
    const id = tasks.length
    const task = {id, name, description, status: "todo", createdAt: date, updatedAt: date};
    tasks.push(task)
    await fs.writeFile(tasksFile, JSON.stringify(tasks))
    console.log(`Task added successfully (ID: ${id + 1})`)
}

async function listTasks() {
    const tasks = await getTasks()
    console.table(tasks)
}

async function main() {
    const args = process.argv.slice(2)
    const action = args[0].trim().toLowerCase()

    switch(action){
        case "add":
            await addTasks(args)
            break;
        case "list":
            await listTasks()
            break;
        default:
            console.log("incorrect command")
    }


}


await main()