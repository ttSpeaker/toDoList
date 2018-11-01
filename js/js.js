


var globalID = 8;
var currentList = "home"
function addToDotoDOM(listName, list, i) {
    var item = $('#toDoTemplate').clone();
    item.attr("data-task-id", list[i].id);
    item.attr('id', '');
    item.find('.card-title').text(list[i].title);
    item.find('.popoverFinder').attr("title", list[i].title);
    item.find('.popoverFinder').attr("data-content", list[i].content);
    if (list[i].done == true) {
        item.find('.doneTodo').attr("class", "btn btn-success doneToDo card-btn")
    }
    item.show();
    !list[i].done ? $("#v-pills-" + listName).find('.notDone').prepend(item) : $("#v-pills-" + listName).find('.done').prepend(item);
}

function loadToDos(id, list) {
    for (var i = list.length - 1; i >= 0; i--) {
        addToDotoDOM(id, list, i);
    }
}

function findElement(list, passedId) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].id == passedId) {
            return i;
        }
    }
}
function findList() {
    switch (currentList) {
        case "home":
            return home;
        case "office":
            return office;
        case "others":
            return others;
    }
}

$(document).ready(function () {

    loadToDos("home", home);
    loadToDos("office", office);
    loadToDos("others", others);
    localStorage.setItem("home", home);

    $("#v-pills-home-tab").click(function () {
        currentList = "home"
    });
    $("#v-pills-office-tab").click(function () {
        currentList = "office"
    });
    $("#v-pills-others-tab").click(function () {
        currentList = "others"
    });

    $(function () {
        $('[data-toggle="popover"]').popover()
    });

    $(".addToDo").click(function () {
        var list = findList();
        var listName = currentList;
        $('#newToDoModal').modal('show');
        var $newToDoForm = $('#newTodoForm');
        $newToDoForm.unbind('submit').bind('submit', function () {
            event.preventDefault();
            var newToDoTitle = $("#todoTitle").val();
            if (newToDoTitle != "") {
                var newToDoContent = $("#todoContent").val();
                list.push({
                    "title": newToDoTitle,
                    "content": newToDoContent,
                    "done": false,
                    "id": globalID
                });
                addToDotoDOM(listName, list, list.length - 1);
                globalID++;
            }
            $('#newToDoModal').modal('hide');
            $(function () {
                $('[data-toggle="popover"]').popover();
            });
        });
    });

    $(".toDosList").on("click", ".removeTodo", function () {
        $('#checkModal').modal('show');
        var $delete = $("#delete");
        var $id = $(this).closest("div.toDoCardContainer");
        $delete.unbind("click").on("click", function () {
            var list = findList();
            var index = findElement(list, $id.attr("data-task-id"));
            list.splice(index, 1);
            $id.remove();
        });
    });

    $(".toDosList").on("click", ".edit", function () {
        var $id = $(this).closest("div.toDoCardContainer");
        var list = findList();
        var index = findElement(list, $id.attr("data-task-id"));
        var modal = $('#editToDoModal');
        modal.find("#editTitle").val(list[index].title);
        modal.find("#editContent").val(list[index].content);
        modal.modal('show');
        var $editToDoForm = $("#editTodoForm")
        $editToDoForm.unbind('submit').bind('submit', function () {
            event.preventDefault();
            var newToDoTitle = $("#editTitle").val();
            var newToDoContent = $("#editContent").val();
            modal.modal('hide');
            list[index].title = newToDoTitle;
            list[index].content = newToDoContent;
            $id.find('.card-title').text(newToDoTitle);
            $id.find('.popoverFinder').attr("data-original-title", newToDoTitle);
            $id.find('.popoverFinder').attr("data-content", newToDoContent);
        });
    });

    $(".toDosList").on("click", "a.doneToDo", function () {
        var $id = $(this).closest("div.toDoCardContainer");
        var list = findList();
        var index = findElement(list, $id.attr("data-task-id"));
        if (!list[index].done) {
            list[index].done = true;
            $(this).attr("class", "btn btn-success doneToDo card-btn");
            var doneItem = $id.clone();
            $id.closest(".tab-pane").find(".done").prepend(doneItem);
            $id.remove();
        } else {
            list[index].done = false;
            $(this).attr("class", "btn btn-secondary doneToDo card-btn");
            var doneItem = $id.clone();
            $id.closest(".tab-pane").find(".notDone").prepend(doneItem);
            $id.remove();
        }
    });
});


