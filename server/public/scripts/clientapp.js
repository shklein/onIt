$(document).ready(function (){
getTasks();

//Add a task
$('#task').on('submit', addTask);

//Mark tasks complete
$('#taskList').on('click', '.complete', taskComplete);

//Delete task
$('#taskList').on('click', '.delete', deleteTask);


});

//AJAX functions
function getTasks () {
  $.ajax({
      type: 'GET',
      url: '/tasks',
      success: function (tasks) {
        $('#taskList').empty();
          tasks.forEach(function (task) {
            if (task.complete === true) {

            $container = $('<div class="task_done">' + task.task_name + '\nDo by: ' + task.task_deadline + '</div>');
            $container.append('<button class="delete">Delete</button>');

          } else {
            $container = $('<div class="task">' + task.task_name + ': ' + task.task_deadline + '</div>');
            $container.append('<button class="complete">Complete</button>');
            $container.append('<button class="delete">Delete</button>');
          }
        $container.data('taskID', task.id);
        $('#taskList').append($container);
          });

}
});
};

function addTask (event) {
  event.preventDefault();
  var task = {};

  $.each($('#task').serializeArray(), function (i, field) {
    task[field.name] = field.value;

  });
  console.log(task.deadline)
  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: task,
    success: function (data) {
      getTasks();
    }
  });
};

function getTaskId(button) {
  var taskId = button.parent().data('taskID');
  console.log('getTaskId', taskId);
  return taskId;
}

function taskComplete (event) {
  event.preventDefault();
  $(this).parent().addClass('task_done');
  var taskID = getTaskId($(this));
  var complete = {'complete': true,
                  'id': taskID}
  $(this).remove();
  $.ajax({
    type: 'PUT',
    url: '/tasks/' + taskID,
    data: complete,
    success: function (data) {
      getTasks();
    }
  })

}

function deleteTask(event) {
  event.preventDefault();
  var taskId = getTaskId($(this));
  var sure = confirm('Are you sure you want to delete this task?');
  if (sure == true) {
  $.ajax({
    type: 'DELETE',
    url: '/tasks/' + taskId,
    success: function (data) {
      getTasks();
    },
  });
}
}
