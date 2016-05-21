$(document).ready(function (){
getTasks();

//Add a task
$('#task').on('submit', addTask);

//Mark tasks complete
$('#taskList').on('click', '.complete', taskComplete);
  console.log('hi');
});

//AJAX functions
function getTasks () {
  $.ajax({
      type: 'GET',
      url: '/tasks',
      success: function (tasks) {
        $('#taskList').empty();
          tasks.forEach(function (task) {

            $container = $('<div class="task">' + task.task_name + ': ' + task.task_deadline + '</div>');

              $container.data('taskID', task.id);
              $container.append('<button class="complete">Complete</button>');
        $container.append('<button class="delete">Delete</button>');
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
  var complete = true;
  $(this).remove();

  $.ajax({
    type: 'PUT',
    url: '/tasks/' + taskID,
    data: complete,
    success: function (data) {
      getTasks();
    }
  });

}
