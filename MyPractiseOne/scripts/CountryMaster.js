var GlobalURL = "http://localhost:2825/";

$(document).ready(function () {
    GetCountryRecord();
    GetCountryDetails();
    $("#btnSave").click(function () {
        CountryInsertUpdateData();

    });
});
    
function CountryInsertUpdateData() {

    //alert(GlobalURL + "Master/CountryInsertUpdateData");
    $.ajax({
        url: GlobalURL + "Master/CountryInsertUpdateData",
        type: "POST",
        data: {
            CountryID: $("#hfCountryID").val(),
            CountryCode: $("#txtCountryCode").val(),
            CountryName: $("#txtCountryName").val(),
            IsActive: $("#chckIsAactive").is(':checked')?"1":"0"
        },
        success: function (data) {
            data = data.d;
            if (data.Status == "1" || data.Status == "2") {
                alert(data.Result);
                GetCountryRecord();
               
            } else {
                alert(data.Result);
            }
            if (data.Focus != "") {
                $("#" + data.Focus).focus();
            }
        },
        error: function () {
            alert("Record not saved,Somethong wrong");
        }
    });
}



function GetCountryRecord() {
    $.ajax({
        url: GlobalURL + "Master/GetCountryRecord",
        type: "POST",
        data: {},
        success: function (data) {
            data = JSON.parse(data);
            $("#tbl").find("tr:gt(0)").remove();
            for (var i = 0; i < data.length; i++) {
                //$("#ddlCountry").append($('<option/>').attr("value", data[i].CountryCode).text(data[i].CountryCode));
                $("#tbl").append('<tr> <td><input type="button" id="btnedit" class="btn btn-primary  form-control" value="Edit"  onclick="CountryEditRecord(' + data[i].CountryID + ')"</td> <td><input type="button" id="btndelete" class="btn btn-danger  form-control" value="Delete"  onclick="CountryDataDelete(' + data[i].CountryID + ')"</td>  <td>' + data[i].CountryCode + '</td>    <td>' + data[i].CountryName + '</td> <td>' + (data[i].IsActive == 1 ? "Active" : "InActive") + '</td>  </tr>');

            }
        },
        error: function () {
            alert("Record Not Load");
        }
    })
}

function CountryEditRecord(CountryID) {
    $.ajax({
        url: GlobalURL + "Master/CountryEditRecord",
        type: "POST",
        data: {CountryID:CountryID},
        success: function (data) {
            data = JSON.parse(data);
            $("#hfCountryID").val(CountryID);
            $("#txtCountryCode").val(data[0].CountryCode);
            $("#txtCountryName").val(data[0].CountryName);
            if ($("#chckIsAactive").val(data[0].IsActive))
            {
                $("chckIsAactive").attr("checked", true);
        }
            $("#btnSave").val("Update");
        },
        error: function () {
            alert("Record not Edited");
        }
    });
}

function CountryDataDelete(CountryID) {
    if (confirm("Are you sure to delete!!")) {
        $.ajax({
            url: GlobalURL + "Master/CountryDataDelete",
            type: "POST",
            data: { CountryID: CountryID },
            success: function () {
                alert("Record Deleted Successfully");
                GetCountryRecord();
            },
            error: function () {
                alert("Record Not Deleted");
            }
        });
    }
}


function GetCountryDetails() {
    $.ajax({
        url: GlobalURL + "Master/GetCountryDetails",
        type: "POST",
        data: {},
        success: function (data) {   
            var str = JSON.stringify(data).replace(/\"/g, "");
            $("#lbCountryDetails").html(str);
        },
        error: function () {
            alert("Record Not Load");
        }
    })
}
