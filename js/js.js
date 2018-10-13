var globalID = 8;

function addToDotoDOM(id, list, i) {
    var item = $('#toDoTemplate').clone();
    item.attr("data-task-id", list[i].id);
    item.attr('id', '');
    item.find('.card-title').text(list[i].title);
    item.show();
    $("#" + id + "-addButton").after(item);
}

// function loadToDos(id, list) {
//     for (var i = list.length - 1; i >= 0; i--) {
//         addToDotoDOM(id, list, i);
//     }
// }

// function findElement(list, passedId) {
//     for (var i = 0; i < list.length; i++) {
//         if (list[i].id==passedId){return i;}
//     }
// }

$(document).ready(function () {


    loadToDos("home", home);
    loadToDos("office", office);


    $(".addToDo").click(function () {
        $('#loginModal').modal('show');
        const newToDoForm = document.querySelector('#newTodoForm');
        newToDoForm.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log("submited");
            var newToDoData = new FormData(newToDoForm);
            var newToDoTitle = newToDoData.get("title");
            var newToDoContent = newToDoData.get("content");
             $('#loginModal').modal('hide');
             console.log("hide");
            console.log("pushing");
            home.push({
                "title": newToDoTitle,
                "content": newToDoContent,
                "done": false,
                "id": globalID
            });
            addToDotoDOM("home", home, home.length - 1);
            globalID++;
        });
    });

    // $(".toDosList").on("click", "a.removeTodo", function () {
    //     var id = $(this).closest("div.toDoCardContainer");
    //     var index = findElement(home, id.attr("data-task-id"));
    //     home.splice(index,1);
    //     id.hide();
    // });

});


