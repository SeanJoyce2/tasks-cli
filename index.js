import {promises as fs} from "fs";

const TASKS_FILENAME = "tasks.json"

const STATUS = {
    TODO: "todo",
    IN_PROGRESS: "in-progress",
    DONE: "done"
}

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



async function getTasks() {
    if (!(await fileExists(TASKS_FILENAME))) {
        const data = JSON.stringify([])
        await fs.writeFile(TASKS_FILENAME, data)
        return []
    } else {
        try {
            const data = await fs.readFile(TASKS_FILENAME);
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
    const task = {id, name, description, status: STATUS.TODO, createdAt: date, updatedAt: date};
    tasks.push(task)
    await updateFile(tasks,`Task added successfully (ID: ${id})` )
}

async function listTasks(args) {
    const [_, status] = args
    const tasks = await getTasks()

    if(status){
        const validStatuses = Object.values(STATUS)
        if (!validStatuses.includes(status)) {
            console.log(`Invalid status: ${status}`)
            console.log(`Valid statuses: ${validStatuses.join(', ')}`)
            return
        }

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

    if (isNaN(taskId)) {
        console.log("ID must be a valid number")
        return
    }

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

    if (isNaN(taskId)) {
        console.log("ID must be a valid number")
        return
    }

    const task = tasks.find(({id}) => id === taskId);

    if (!task) {
        console.log(`Task with id ${taskId} not found`)
        return
    }

    if (action === "mark-in-progress") {
        task.status = STATUS.IN_PROGRESS
    } else if (action === "mark-done") {
        task.status = STATUS.DONE
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


    if (args.length === 0) {
        console.log("Usage: node script.js <command> [arguments]")
        console.log("Commands:")
        console.log("  add <name> <description>     - Add a new task")
        console.log("  list [status]                - List all tasks or filter by status")
        console.log("  update <id> <name> <desc>    - Update a task")
        console.log("  delete <id>                  - Delete a task")
        console.log("  mark-in-progress <id>        - Mark task as in progress")
        console.log("  mark-done <id>               - Mark task as done")
        return
    }

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
            console.log("Unknown command:", action)
            console.log("Available commands: add, list, update, delete, mark-in-progress, mark-done")
    }


}


await main()