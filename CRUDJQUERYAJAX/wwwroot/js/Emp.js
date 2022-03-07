$(document).ready(function () {
    void loadData();
  
   
});
function loadData() {
  
    $.ajax({
        url: 'Employee/GetEmployee',
        type: "GET",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {

                html += '<tr>';
                html += '<td>' + item.id + '</td>';
                html += '<td>' + item.name + '</td>';
                html += '<td>' + item.age + '</td>';
                html += '<td>' + item.address + '</td>';
                html += '<td>' + item.salary + '</td>';
                html += '<td>' + item.gender + '</td>';
                html += '<td><a href="#" onclick="return Edit(' + item.id + ')" class="btn btn-sm btn-primary">Edit</a> | <a href="#" onclick="Delete(' + item.id + ')" class="btn btn-sm btn-danger">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
            $('#PeopleTable').dataTable({
            });
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}
function Add() {
  
    var res = validate();
    if (res == false) {
        return false;
    }
    var obj = {
        
        Name: $('#Name').val(),   
        Age: parseInt($('#Age').val()),
        Address: $('#Address').val(),
        Salary: parseInt($('#Salary').val()),
        Gender: $('#Gender').val(),
    };
    $.ajax({
        type: "POST",
        url: '/Employee/CreateEmployee',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(obj),
        success: function () {
            loadData();
            $('#myModal').modal('hide');
            $('#Name').val("");
            $('#Age').val("");
            $('#Address').val("");
            $('#Salary').val("");
            $('#Gender').val("");
            alert('Record Added');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function Edit(Id) {
  
    $("#myModalLabel").text("Edit Details");
    $("#Id").parent().show();
    $('#Name').css('border-color', 'lightgrey');
    $.ajax({
        url: 'Employee/GetEmployee?id=' + Id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            if (result.length > 0) {
               /* debugger;*/
                $('#Id').val(result[0].id);
                $('#Name').val(result[0].name);
                $('#Age').val(result[0].age);
                $('#Address').val(result[0].address);
                $('#Salary').val(result[0].salary);
                $('#Gender').val(result[0].gender);
                $('#myModal').modal('show');
                $('#btnUpdate').show();
                $('#btnAdd').hide();
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        } 
    });
    return false;
}
function Update() {
   
    var res = validate();
    if (res == false) {
        return false;
    }
    var obj = {
        Id: parseInt($('#Id').val()),
        Name: $('#Name').val(),
        Age: parseInt($('#Age').val()),
        Address: $('#Address').val(),
        Salary: parseInt($('#Salary').val()),
        Gender: $('#Gender').val(),
    };
    $.ajax({
        url: 'Employee/UpdateEmployee',
        data: JSON.stringify(obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        success: function () {
            loadData();
            $('#myModal').modal('hide');
            $('#Id').val("");
            $('#Name').val("");
            $('#Age').val("");
            $('#Address').val("");
            $('#Salary').val("");
            $('#Gender').val("");
            swal('Record Updated!');
        },

        error: function (errormessage) {
            alert(errormessage.responseText); 
        }
    });
}
function Delete(Id) {
    if (confirm("Are you sure, You want to delete this Record?")) {
      /*  debugger;*/
        $.ajax({
            url: 'Employee/DeleteEmployee?id=' + Id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            success: function () {

                alert('Record is Successfully Removed in Database!');
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
function HideKey() {
    $("#myModalLabel").text("Add New User");
    $("#Id").parent().hide();
}


//Function for clearing the textboxes  
function clearTextBox() {
    $('#Id').val("");
    $('#Name').val("");
    $('#Age').val("");
    $('#Address').val("");
    $('#Salary').val("");
    $('#Gender').val();
    $('#btnAdd').show();
    $('#btnUpdate').hide();
    $('#Name').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#Address').css('border-color', 'lightgrey');
    $('#Salary').css('border-color', 'lightgrey');
}
//Valdidation using jquery  
function validate() {
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }
    if ($('#Age').val().trim() == "") {
        $('#Age').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Age').css('border-color', 'lightgrey');
    }
    if ($('#Address').val().trim() == "") {
        $('#Address').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Address').css('border-color', 'lightgrey');
    }
    if ($('#Salary').val().trim() == "") {
        $('#Salary').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Salary').css('border-color', 'lightgrey');
    }
    if ($('#Gender').val().trim() == "") {
        $('#Gender').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Gender').css('border-color', 'lightgrey');
    }
    return isValid;
}