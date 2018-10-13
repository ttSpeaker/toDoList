
function loadToDos(id, list) {
    for (var i = list.length - 1; i >= 0; i--) {
        var item = $('#toDoTemplate').clone();
        item.attr("data-task-id", list[list.length - 1].id);
        item.attr('id', '');
        item.find('.card-title').text(list[i].title);
        item.show();
        $("#" + id + "-addButton").after(item);   
    }
}

function eraseToDo(element, list) {
    
}
$(document).ready(function () {

    loadToDos("home", home);
    loadToDos("office", office);

    $(".removeToDo").click(function () {
        
    });
    
    $(".addToDo").click(function () {
            $('#loginModal').modal('show');

            const newToDoForm = document.querySelector('#newTodoForm');
            newToDoForm.addEventListener('submit', (event) => {
                event.preventDefault();
                var newToDoData = new FormData(newToDoForm);
                var newToDoTitle = newToDoData.get("title");
                var newToDoContent = newToDoData.get("content");
                $('#loginModal').modal('hide');

                //mover a funcion que agregue esto al array
                // algo como updateToDos(newToDoTitle,newToDoContent,THIS_LISTA)
                home.push({
                    "title": newToDoTitle,
                    "content": newToDoContent,
                    "done": false
                });
                // agregar elemento al DOM (probablmente desde la funcion anterior)
                var item = $('#toDoTemplate').clone();
                item.attr("data-task-id", home[home.length - 1].id);
    
                item.attr('id', '');
                item.find('.card-title').text(home[home.length - 1].title);
                item.show();
                $("#home-addButton").after(item);
                console.log(item.data("identificador"));
            });
        });


});


