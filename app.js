var isItImportant = false;
var isDetailsVisible = true;
var serverUrl =  "http://fsdi.azurewebsites.net/api";


function toggleDetailsVisibility(){ 
    //hide/show the capture
    //$("#capture").hide();
    // $("#capture").show();
    if(isDetailsVisible) {
        $("#capture").hide();
        isDetailsVisible = false;
    }
    else {
        $("#capture").show();
        isDetailsVisible = true;
    }
}

function toggleImportant() {

    console.log("Icon Clicked");

    if(!isItImportant) {
        $("#iImportant").removeClass("fa-star-half-alt").addClass("fa-star");
        isItImportant = true;
    } else {
        isItImportant = false;
    }

}

function saveTask(){
    console.log("Save Clicked");

    /** Homework class 2
   * get the values from the input fields and put them into variables
   */
   var title = $("#txtTitle").val();
   var date = $("#txtDate").val()
   var status = $("#selStatus").val();
   var location = $("#txtLocation").val();
   var color = $("#txtColor").val();
   var desc = $("#txtDesc").val();
    if(title == ""){
        alert("This has to be filled in.");
        return;
    }
   var myTask = new Task(0,title, isItImportant, date, status, location, color, desc);

   console.log(myTask);
   console.log(JSON.stringify(myTask));
   //display task
    console.log("starting ajax");
   //save to server
   $.ajax({
       url: serverUrl + '/tasks',
       type: "POST",
       data: JSON.stringify(myTask), //JSON string
       contentType: "application/json",

       success: function(res) {
           console.log("Server says: ", res);
           displayTask(res);
       },
       error: function(errorDet){
           console.log("Error", errorDet);
       }
   });

   console.log("Code below ajax");
}
function clearForm() {
    // to clear an input, set its value to empty string '',    xxxx.val('');
    // ToDo 1 Clear Screen
    $(".form-control").val('');
    //$(".form-control").trigger(reset);

   }
function validateForm(){
    document.getElementById("txtTitle").value;
    if(txtTitle==""){
        alert("This field has to be filled in.");
    }

}
function taskId() {

    console.log("delete");
}
function displayTask(task) {
    // TODO-2 - set the background color of the task to the color select by the user
//create syntax
    var syntax = 
    `<div class="task" style="background-color: ${task.color};"> 
    <h4> ${task.title}</h4>
    <p>${task.description}</p>
    <label>${task.dueDate}</label>
    <label>${task.location}</label>

    <div class='task-section-sm'>
    <i class="fas fa-trash" onclick="deleteTask(${task.id})"></i>
    <i class="far fa-star"></i></div>`;
    //append the syntax to existing html
    $("#tasks-list").append(syntax);


    
}


function retrieveData() { 

        $.ajax({
            url: serverUrl + '/tasks',
            type: "GET",
            success: function(res){
                console.log("retrieving", res);
                for(i=0; i < res.length; i++){
                    let task = res[i];
                    if(task.user == "Nick2"){

                        displayTask(task);
                    }
                }

            },
            error: function(errorDet){
                console.log("Error retrieving", errorDet);
            }
        });

    }


function deleteTask(id){
    console.log("delete task", id);
    //create an ajax
    // Delete Task (Optional)
}
function testRequest() {

    $.ajax({
        url: "https://restclass.azurewebsites.net/api/test" ,
        type: "GET",
        success: function(res) {
            console.log("Yeei it worked!", res)
        },
        error: function(){
            console.log("Ouch we have an error(", errorDetails)
        }
    });
}

function init () {
    console.log("Task Manager");
    retrieveData();

    //events
    $("#iImportant").click(toggleImportant);
    $("#saveTask").click(saveTask);
    $("#btnDetails").click(toggleDetailsVisibility);
    
    $('#txtColor').spectrum({
        type: "component"
      });
     // retrieveData();
      validateForm();
    
    
}
















window.onload = init;

/*
Task
-Id
-Title
-Date & Time
-Important
-Description
-Status
-Location
-Color
*/
