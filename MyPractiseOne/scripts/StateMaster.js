var GlobalURL = "http://localhost:2825/";

$(document).ready(function () {
    GetStateDetails();
    GetCountryCode();

    GetStateRecord();
    $("#btnSave").click(function () {
        StateInsertUpdateData();
    });
   
});

function GetCountryCode()
{    
    $.ajax({
        url: GlobalURL + "Master/GetCountryCode",
        type: "POST",
        data: {},
        success: function (data) {
            data = JSON.parse(data);
            for (var i = 0; i < data.length; i++)
            {
                //$("#ddlCountry").append($('<option/>').attr("value", data[i].CountryCode).text(data[i].CountryCode));
                $("#ddlCountry").append($('<option value='+data[i].CountryCode+'>'+data[i].CountryName+'</option>'));

            }
        },
        error: function ()
        {
            alert("Country Code Not Load");
        }
    })
}

function StateInsertUpdateData() {


    $.ajax({
        url: GlobalURL + "Master/StateInsertUpdateData",
        type: "POST",
        data: {
            StateID: $("#hfStateID").val(),
            StateCode: $("#txtStateCode").val(),
            StateName: $("#txtStateName").val(),
            CountryCode: $("#ddlCountry").val(),
            IsActive: $("#chckIsAactive").is(':checked') ? "1" : "0"
        },
        success: function (data) {
            data = JSON.parse(data.d);
            if (data.Status == "1" || data.Status == "2") {
                alert(data.Result);
                GetStateRecord();
                //Reset();
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


function GetStateRecord() {
    $.ajax({
        url: GlobalURL + "Master/GetStateRecord",
        type: "POST",
        data: {},
        success: function (data) {
            data = JSON.parse(data);
            $("#tbl").find("tr:gt(0)").remove();
            for (var i = 0; i < data.length; i++) {
                //$("#ddlCountry").append($('<option/>').attr("value", data[i].CountryCode).text(data[i].CountryCode));
                $("#tbl").append('<tr> <td><input type="button" id="btnedit" class="btn btn-primary  form-control" value="Edit"  onclick="Edit(' + data[i].StateID + ')"</td> <td><input type="button" id="btndelete" class="btn btn-danger  form-control" value="Delete"  onclick="StateDataDelete(' + data[i].StateID + ')"</td> <td>' + data[i].CountryCode + '</td>  <td>' + data[i].StateCode + '</td>    <td>' + data[i].StateName + '</td> <td>' + (data[i].IsActive == 1 ? "Active" : "InActive") + '</td>  </tr>');

            }
        },
        error: function () {
            alert("Record Not Load");
        }
    })
}


function StateDataDelete(StateID) {
    if (confirm("Are you sure to delete!!")) {
        $.ajax({
            url: GlobalURL + "Master/StateDataDelete",
            type: "POST",
            data: { StateID: StateID },
            success: function () {
                alert("Record Deleted Successfully");
                GetStateRecord()();
            },
            error: function () {
                alert("Record Not Deleted");
            }
        });
    }
}

function GetStateDetails() {
    $.ajax({
        url: GlobalURL + "Master/GetStateDetails",
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
