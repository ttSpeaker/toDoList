

var globalID = 8;
var currentList = home;
function addToDotoDOM(listName, list, i) {
    var item = $('#toDoTemplate').clone();
    item.attr("data-task-id", list[i].id);
    item.attr('id', '');
    item.find('.card-title').text(list[i].title);
    item.find('.card-content').text(list[i].content);
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
function findList(element) {
    switch (element.parent().parent().attr("id")) {
        case "home-addButton":
            return home;
        case "office-addButton":
            return office;
            break;
        case "others-addButton":
            return others;
            break;
    }

}
function findListName(element) {
    switch (element.parent().parent().attr("id")) {
        case "home-addButton":
            return "home";
            break;
        case "office-addButton":
            return "office";
            break;
        case "others-addButton":
            return "others";
            break;
    }
}
$(document).ready(function () {

    loadToDos("home", home);
    loadToDos("office", office);

    $(".addToDo").click(function () {
        var list = currentList;
        var listName = findListName($(this));
        $('#loginModal').modal('show');
        var $newToDoForm = $('#newTodoForm');
        $newToDoForm.unbind('submit').bind('submit', function () {
            event.preventDefault();
            var newToDoTitle = $("#todoTitle").val();
            var newToDoContent = $("#todoContent").val();
            $('#loginModal').modal('hide');
            list.push({
                "title": newToDoTitle,
                "content": newToDoContent,
                "done": false,
                "id": globalID
            });
            addToDotoDOM(listName, list, list.length - 1);
            globalID++;
        });
    });
    $(".toDosList").on("click", "a.removeTodo", function () {
        $('#checkModal').modal('show');
        var $delete = $("#delete");
        var id = $(this).closest("div.toDoCardContainer");
        $delete.unbind("click").on("click", function () {
            switch (id.parent().parent().attr("id")) {
                case "v-pills-home":
                    var list = home;
                    break;
                case "v-pills-office":
                    var list = office;
                    break;
                case "v-pills-others":
                    var list = others;
                    break;
            }
            var index = findElement(list, id.attr("data-task-id"));
            list.splice(index, 1);
            id.hide();

        });

    });

    $(".toDosList").on("click", "a.doneToDo", function () {
        var $id = $(this).closest("div.toDoCardContainer");
        switch ($id.parents('.tab-pane').attr("id")) {
            case "v-pills-home":
                var list = home;
                break;
            case "v-pills-office":
                var list = office;
                break;
            case "v-pills-others":
                var list = others;
                break;
        }
        var index = findElement(list, $id.attr("data-task-id"));

        list[index].done = true;
        $(this).attr("class", "btn btn-success doneToDo card-btn");
        $id.remove();
        console.log($id.closest('.toDosList').parent())
        //.find('.done').append($id);
    });

});


