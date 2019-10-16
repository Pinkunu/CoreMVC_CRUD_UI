
$(function () {
$("#btnSubmit").click(function (event) {
        event.preventDefault();
        var formData = { "FullName": $("#Fullname").val(), "EmpCode": $("#EmployeeCode").val(), "Position": $("#Position").val(), "OfficeLocation": $("#OfficeLocation").val() };

        $.ajax({
            type: 'POST',
            url: "http://localhost:63956/api/SaveEmployee",
            contentType: "application/json",
            dataType: "json",

            data: JSON.stringify(formData),

            success: function (response) {
                if (response == "Success") {
                    alert("Successfully Stored User...");
                    
                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('error');
            }
        });
    });





    
    $.ajax({
            
            type: "GET",
            url: "http://localhost:63956/api/GetEmployee",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                
                var tr;
                //Append each row to html table  
                for (var i = 0; i < result.length; i++) {
                    tr = $('<tr/>');
                    tr.append("<td>" + result[i].EmployeeId + "</td>");
                    tr.append("<td>" + result[i].FullName + "</td>");
                    tr.append("<td>" + result[i].EmpCode + "</td>");
                    tr.append("<td>" + result[i].Position + "</td>");
                    tr.append("<td>" + result[i].OfficeLocation + "</td>");
                    tr.append("<td>" + "<button type='button' " +"onclick='employeeDelete(this);' " +
                        "class='btn btn-danger' " + "data-id="+ result[i].EmployeeId +">" + "<span class='glyphicon glyphicon-trash' />" + "Delete</button>" + "</td >");
                    tr.append("<td>" + "<button type='button' " + "class='btn btn-primary edit' " + "onclick='edit()' " + "data-id=" + result[i].EmployeeId + ">" + "<span class='glyphicon glyphicon-trash' />" + "Edit</button>" +"</td >");
                    $('table').append(tr);
                }
            },
            error: function (response) {
               
                alert('eror');
            }
        });
  
    //Edit
    $('#table').on("click", "tr", function () {
        event.preventDefault();
        var $data_row = $(this).closest('tr');
        $("#EmployeeId").val($data_row.find("td:nth-child(1)").text().toString().trim());
        $("#Fullname").val($data_row.find("td:nth-child(2)").text().toString().trim());
        $("#EmployeeCode").val($data_row.find("td:nth-child(3)").text().toString().trim());
        $("#Position").val($data_row.find("td:nth-child(4)").text().toString().trim());
        $("#OfficeLocation").val($data_row.find("td:nth-child(5)").text().toString().trim());

        $("#btnSubmit").hide();
        $("#btnUpdate").show();
        $("#btnClear").show();

        
    });

    $("#btnUpdate").click(function (result) {
        result.preventDefault();
        
       var formData = { "EmployeeId": $("#EmployeeId").val(),"FullName": $("#Fullname").val(), "EmpCode": $("#EmployeeCode").val(), "Position": $("#Position").val(), "OfficeLocation": $("#OfficeLocation").val() };
       
        $.ajax({
            type: 'PUT',
            url: "http://localhost:63956/api/UpdateEmployee",
            contentType: "application/json",
            dataType: "json",

            data: JSON.stringify(formData),

            success: function (response) {
                if (response == "success") {
                    alert("Update Successfully ....");

                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('error');
            }
        });
    });

});





//DELETE
function employeeDelete(ctl) {

    var id = $(ctl).data("id");
   $.ajax({
        type: 'DELETE',
        url: "http://localhost:63956/api/EmployeeDelete?id=" + id,
        contentType: "application/json",
        dataType: "json",

        success: function (result) {
            $(ctl).parents("tr").remove();

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('error');
        }
    });
}
