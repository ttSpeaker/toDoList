var globalID = 0;
var currentList = "home"
function addToDotoDOM(listName, list, i) {
    var item = $('#toDoTemplate').clone();
    item.attr("data-task-id", list[i].id);
    item.attr('id', '');
    item.find('.card-title').text(list[i].title);
    var content = item.find('.popoverFinder');
    content.attr("title", list[i].title);
    content.attr("data-content", list[i].content);
    content.html(list[i].content);
    content.shorten({
        moreText: "",
        showChars: 15
    });
    if (list[i].done) {
        item.find('.doneTodo').attr("class", "btn btn-success doneToDo card-btn")
    }
    item.show();
    !list[i].done ? $("#v-pills-" + listName).find('.notDone').prepend(item) : $("#v-pills-" + listName).find('.done').prepend(item);
}

function loadToDos(completeList) {
    for (var j = 0; j < completeList.length; j++) {
        for (var i = 0; i < completeList[j][1].length; i++) {
            addToDotoDOM(completeList[j][0], completeList[j][1], i);
            completeList[j][1][i].id > globalID ? globalID = completeList[j][1][i].id : globalID = globalID;
        }
    }
    globalID++;
}

function findElement(list, passedId) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].id == passedId) {
            return i;
        }
    }
}
function findList() {
    for (var i = 0; i < completeList.length; i++) {
        if (completeList[i][0] == currentList) {
            return completeList[i][1];
        }
    }

}

if (localStorage.getItem("primeraVez") == undefined) {

    localStorage.setItem("primeraVez", "ok");
    localStorage.setItem("home", JSON.stringify(homeOriginal));
    localStorage.setItem("office", JSON.stringify(officeOriginal));
    localStorage.setItem("others", JSON.stringify(othersOriginal));
}
var home = JSON.parse(localStorage.getItem("home"));
var office = JSON.parse(localStorage.getItem("office"));
var others = JSON.parse(localStorage.getItem("others"));
var completeList = [
    ["home", home],
    ["office", office],
    ["others", others]
]
function setLocalStorage(list) {
    localStorage.setItem(currentList, JSON.stringify(list));
}

function refreshPopovers() {
    $(function () {
        $('[data-toggle="popover"]').popover()
    });
}
$(document).ready(function () {
    $().maxlength();

    loadToDos(completeList);

    $("#v-pills-home-tab").click(function () {
        currentList = "home"
    });
    $("#v-pills-office-tab").click(function () {
        currentList = "office"
    });
    $("#v-pills-others-tab").click(function () {
        currentList = "others"
    });


    refreshPopovers();

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
                setLocalStorage(list);
            }

            $('#newToDoModal').modal('hide');
            refreshPopovers();
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
            setLocalStorage(list);
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
            var content = $id.find('.popoverFinder');
            content.attr("data-original-title", newToDoTitle);
            content.attr("data-content", newToDoContent);
            content.html(newToDoContent);
            setLocalStorage(list);
        });

    });
    $(".toDosList").on("click", "a.doneToDo", function () {
        var $id = $(this).closest("div.toDoCardContainer");
        var list = findList();
        var index = findElement(list, $id.attr("data-task-id"));
        console.log(list[index].title);
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
        setLocalStorage(list);
    });
});


