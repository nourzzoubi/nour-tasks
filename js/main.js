$(document).ready(function () {

    // Load saved tasks when page opens
    loadTasks();
    updateStats();

    // Add new task
    $("#taskForm").submit(function (e) {
        e.preventDefault();

        let taskText = $("#taskInput").val().trim();

        if (taskText === "") {
            alert("Please Enter The Task Name :)");
            return;
        }

        let task = `
            <div class="task-active bg-sky-900/60 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div class="flex items-center gap-4">
                    <button type="button" class="circle-btn w-6 h-6 rounded-full border-2 border-yellow-300"></button>

                    <div>
                        <h3 class="text-lg font-bold">${taskText}</h3>
                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <span class="bg-yellow-300/20 text-yellow-300 px-3 py-1 rounded-full text-sm">
                        Pending
                    </span>

                    <button type="button" class="done-btn text-green-400 hover:text-green-300 transition">
                        <span class="material-symbols-outlined">check_circle</span>
                    </button>

                    <button type="button" class="delete-btn text-red-400 hover:text-red-300 transition">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>

            </div>
        `;

        $("#taskList").append(task);

        saveTasks();
        updateStats();

        $("#taskInput").val("");
    });

    // Delete task
    $(document).on("click", ".delete-btn", function () {
        $(this).closest(".task-active").remove();

        saveTasks();
        updateStats();
    });

    // Complete task
    $(document).on("click", ".done-btn", function () {
        let task = $(this).closest(".task-active");
        let text = task.find("h3").text();

        task.replaceWith(`
            <div class="task-active completed bg-sky-900/60 border border-green-400/30 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 opacity-80">

                <div class="flex items-center gap-4">
                    <button type="button" class="circle-btn w-6 h-6 rounded-full bg-green-400 flex items-center justify-center">
                        <span class="material-symbols-outlined !text-sm text-black">check</span>
                    </button>

                    <div>
                        <h3 class="text-lg font-bold line-through text-gray-400">${text}</h3>
                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <span class="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm">
                        Completed
                    </span>

                    <button type="button" class="delete-btn text-red-400 hover:text-red-300 transition">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>

            </div>
        `);

        saveTasks();
        updateStats();
    });

    // Filter button active style
    $(document).on("click", ".filter-buttons button", function () {
        $(".filter-buttons button").removeClass("filter-active");
        $(this).addClass("filter-active");
    });

    // Show all tasks
    $(document).on("click", ".all", function () {
        $(".task-active").show();
        toggleEmptyState();
    });

    // Show active tasks only
    $(document).on("click", ".active", function () {
        $(".task-active").show();
        $(".task-active.completed").hide();
        toggleEmptyState();
    });

    // Show completed tasks only
    $(document).on("click", ".filter-completed", function () {
        $(".task-active").hide();
        $(".task-active.completed").show();
        toggleEmptyState();
    });

    // Save tasks in localStorage
    function saveTasks() {
        localStorage.setItem("nourTasks", $("#taskList").html());
    }

    // Load tasks from localStorage
    function loadTasks() {
        let savedTasks = localStorage.getItem("nourTasks");

        if (savedTasks) {
            $("#taskList").html(savedTasks);
        }
        toggleEmptyState();
    }

    // Update numbers
    function updateStats() {
        let total = $(".task-active").length;
        let completed = $(".task-active.completed").length;
        let remaining = total - completed;

        $(".boxes .box:eq(0) .num-tasks").text(total);
        $(".boxes .box:eq(1) .num-tasks").text(completed);
        $(".boxes .box:eq(2) .num-tasks").text(remaining);

        $("#tasksCount").text(total + " tasks");
        toggleEmptyState();
    }

    // Show/hide empty state message
    function toggleEmptyState() {
        let total = $(".task-active").length;
        
        if (total === 0) {
            $("#emptyState").removeClass("hidden").show();
        } else {
            $("#emptyState").addClass("hidden").hide();
        }
    }

});