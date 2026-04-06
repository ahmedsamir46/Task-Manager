import { createdom } from "./createDom.module.js"
import { allTasks, localstorageSetter, deleteTask as deleteTaskShared } from "./data.js"

export const key = "tasks";

// Function to render tasks
const tasksRender = (tasks) => {
    const tasksContainer = document.querySelector("#tasks");
    if (!tasksContainer) return; // Skip if not on a page with tasks container
    
    tasksContainer.innerHTML = "";
    tasks.forEach(task => {
        let card = createdom("div", tasksContainer, "", "card task-card shadow-sm mb-3 border-0 rounded-3","","","","","width:90%");
        
        let check = createdom("input", card, "", "form-check-input me-3 mt-2");
        check.setAttribute("type", "checkbox");
        if (task.status === "completed") {
            check.checked = true;
        }
        
        check.addEventListener("change", () => {
            task.status = check.checked ? "completed" : "notcompleted";
            localstorageSetter(key, allTasks);
        });

        let wrapperParent = createdom("div", card, "", "d-flex justify-content-between align-items-center w-100");
        let wrapperChild = createdom("div", wrapperParent, "", "flex-grow-1");

        createdom("h5", wrapperChild, task.title, "text-capitalize mb-1 fw-bold");
        createdom("small", wrapperChild, task.date, "text-muted d-block mb-2");
        createdom("p", wrapperChild, task.content, "mb-0");

        let wrapper = createdom("div", wrapperParent, "", "d-flex gap-2");

        let editBtn = createdom("button", wrapper, `<i class="fa-solid fa-pen-to-square"></i>`, "btn btn-sm btn-outline-primary rounded-pill");
        editBtn.addEventListener("click", () => {
            document.querySelector("#title").value = task.title;
            document.querySelector("#date").value = task.date;
            document.querySelector("#content").value = task.content;
            const updatedTasks = deleteTaskShared(task, allTasks);
            allTasks.length = 0;
            allTasks.push(...updatedTasks);
            tasksRender(allTasks);
        });

        let deleteBtn = createdom("button", wrapper, `<i class="fa-solid fa-trash"></i>`, "btn btn-sm btn-outline-danger rounded-pill");
        deleteBtn.addEventListener("click", () => {
            const updatedTasks = deleteTaskShared(task, allTasks);
            allTasks.length = 0;
            allTasks.push(...updatedTasks);
            tasksRender(allTasks);
        });
    });
};

// Only run this code on pages that have the task management UI
if (document.querySelector("#tasks")) {
    const AddButton = document.querySelector("#create");
    
    const reedObject = () => ({
        id: Date.now(),
        title: document.querySelector("#title").value,
        date: document.querySelector("#date").value,
        content: document.querySelector("#content").value,
        status: "notcompleted"
    });

    const addToLocalsorage = (task) => {
        allTasks.unshift(task);
        localstorageSetter(key, allTasks);
    };

    const formcheck = () => {
        const title = document.querySelector("#title").value.trim();
        const date = document.querySelector("#date").value;
        const content = document.querySelector("#content").value.trim();
        
        // Check if any field is empty
        if (!title || !date || !content) {
            return { isValid: false, message: "Please fill in all fields" };
        }
        
        // Check if date is in the past
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time part to compare dates only
        
        if (selectedDate < today) {
            return { isValid: false, message: "Please select today's or a future date" };
        }
        
        return { isValid: true };
    };

    const clearform = () => {
        document.querySelector("#title").value = "";
        document.querySelector("#date").value = "";
        document.querySelector("#content").value = "";
    };

    AddButton.addEventListener("click", () => {
        const validation = formcheck();
        if (validation.isValid) {
            const newTask = reedObject();
            addToLocalsorage(newTask);
            tasksRender(allTasks);
            clearform();
        } else if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: validation.message || "An error occurred"
            });
        }
    });

    // Search functionality
    const search = document.querySelector("#search");
    if (search) {
        search.addEventListener("input", () => {
            const searchTerm = search.value.toLowerCase();
            const filter = allTasks.filter(task => 
                task.title.toLowerCase().includes(searchTerm) ||
                task.content.toLowerCase().includes(searchTerm)
            );
            tasksRender(filter);
        });
    }

    // Filter functionality
    const makeFilter = (btn, word, status) => {
        if (!btn) return;
        
        btn.addEventListener("click", () => {
            const screen = document.querySelector(".screen");
            if (word.toLowerCase() === "all") {
                tasksRender(allTasks);
                if (screen) screen.textContent = "All";
            } else {
                const filter = allTasks.filter(task => task.status === status);
                tasksRender(filter);
                if (screen) screen.textContent = word;
            }
        });
    };

    // Initialize filters
    makeFilter(document.querySelector("#showcompleted"), "Completed", "completed");
    makeFilter(document.querySelector("#shownotcompleted"), "Not Completed", "notcompleted");
    makeFilter(document.querySelector("#all"), "All");

    // Initial render
    tasksRender(allTasks);
}