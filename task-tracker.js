import {promises as fs} from "fs";

const tasksFile = "tasks.json"

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
        await fs.writeFile(tasksFile, JSON.stringify(tasks, null, 2))
        console.log(message)
    } catch (error) {
        console.error("Error writing to file:", error.message)
    }
}


async function getTasks() {
    if (!(await fileExists(tasksFile))) {
        const data = JSON.stringify([])
        await fs.writeFile(tasksFile, data)
        return []
    } else {
        try {
            const data = await fs.readFile(tasksFile);
            return JSON.parse(data.toString())
        } catch (error) {
            console.error("Error reading tasks file:", error.message)
            return []
        }
    }
}

async function addTasks(args) {
    const tasks = await getTasks()
    const [_, name, description] = args
    const date = new Date()
    const id = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1
    const task = {id, name, description, status: "todo", createdAt: date, updatedAt: date};
    tasks.push(task)
    await updateFile(tasks,`Task added successfully (ID: ${id})` )
}

async function listTasks(args) {
    const [_, status] = args
    const tasks = await getTasks()

    if(status){
        const filteredTasks = tasks.filter(t => t.status === status)
        console.table(filteredTasks)
        return
    }

    console.table(tasks)
}

async function updateTask(args){
    const [_, id, name, description] = args
    const tasks = await getTasks()
    const date = new Date()
    const taskId = parseInt(id)

    const taskIndex = tasks.findIndex(({id}) => id === taskId);

    if (taskIndex === -1) {
        console.log(`Task with id ${taskId} not found`)
        return
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        name,
        description,
        updatedAt: date
    }

    await updateFile(tasks,`Task ${taskId} updated successfully` )
}

async function updateStatus(args) {
    const [action, id] = args
    const tasks = await getTasks()
    const taskId = parseInt(id)
    const task = tasks.find(({id}) => id === taskId);

    if (!task) {
        console.log(`Task with id ${taskId} not found`)
        return
    }

    if (action === "mark-in-progress") {
        task.status = "in-progress"
    } else if (action === "mark-done") {
        task.status = "done"
    }

    await updateFile(tasks, `Task ${taskId} status updated successfully`)
}



async function deleteTask(args){
    const [_, id] = args
    const tasks = await getTasks()
    const taskId = parseInt(id)
    const taskIndex = tasks.findIndex(({id}) => id === taskId);

    if (taskIndex === -1) {
        console.log(`Task with id ${taskId} not found`)
        return
    }

    tasks.splice(taskIndex, 1)
    await updateFile(tasks, `Task ${taskId} deleted successfully`)
}



async function main() {
    const args = process.argv.slice(2)
    const action = args[0].trim().toLowerCase()

    switch (action) {
        case "add":
            await addTasks(args)
            break;
        case "list":
            await listTasks(args)
            break;
        case "mark-in-progress":
        case "mark-done":
            await updateStatus(args)
            break;
        case "update":
            await updateTask(args)
            break;
        case "delete":
            await deleteTask(args)
            break;
        default:
            console.log("incorrect command")
    }


}


await main()