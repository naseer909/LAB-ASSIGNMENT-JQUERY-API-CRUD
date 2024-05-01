$(document).ready(function(){
    // Function to fetch tasks from the server
    function fetchTasks() {
        $.ajax({
            url: 'http://your-api-url/tasks',
            method: 'GET',
            success: function(tasks) {
                displayTasks(tasks);
            }
        });
    }

    // Function to display tasks on the page
    function displayTasks(tasks) {
        $('#taskList').empty();
        tasks.forEach(function(task) {
            $('#taskList').append(`<li>${task.name} <button class="deleteBtn" data-id="${task.id}">Delete</button></li>`);
        });
    }

    // Initial fetch of tasks when the page loads
    fetchTasks();

    // Form submission to add a new task
    $('#taskForm').submit(function(event){
        event.preventDefault();
        var taskName = $('#taskInput').val();
        $.ajax({
            url: 'http://your-api-url/tasks',
            method: 'POST',
            data: { name: taskName },
            success: function(){
                fetchTasks(); // Refresh task list after adding
                $('#taskInput').val(''); // Clear input field
            }
        });
    });

    // Event delegation for delete buttons
    $('#taskList').on('click', '.deleteBtn', function(){
        var taskId = $(this).data('id');
        $.ajax({
            url: `http://your-api-url/tasks/${taskId}`,
            method: 'DELETE',
            success: function(){
                fetchTasks(); // Refresh task list after deletion
            }
        });
    });
});
