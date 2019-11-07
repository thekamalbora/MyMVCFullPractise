var GlobalURL = "http://localhost:2825/";

$(document).ready(function () {
    $("#example").DataTable();
    GetCityDetails();
    GetCityDetails2();
  
    GetCityRecord();

  
    $("#ddlState").append($('<option/>').attr("value", "0").text("Select"));
    $("#ddlState").prop("disabled", true);
    $("#ddlCity").append($('<option/>').attr("value", "0").text("Select"));
    $("#ddlCity").prop("disabled", true);
    $("#btnSave").click(function () {
        CityInsertUpdateData();
    });

});



function GetStateCode() {
    $.ajax({
        url: GlobalURL + "Master/GetStateCode",
        type: "POST",
        data: { CountryCode: $("#ddlCountry").val() },
        success: function (data) {
            data = JSON.parse(data);
            $("#ddlState").empty();
            $("#ddlState").prop("disabled", false);
            $("#ddlCity").empty();
            $("#ddlCity").prop("disabled", false);
            $("#ddlCity").append($('<option/>').attr("value", "0").text("Select"));
            $("#ddlState").append($('<option/>').attr("value", "0").text("Select"));
            for (var i = 0; i < data.length; i++) {
                //$("#ddlCountry").append($('<option/>').attr("value", data[i].CountryCode).text(data[i].CountryCode));
                $("#ddlState").append($('<option value=' + data[i].StateCode + '>' + data[i].StateName + '</option>'));

            }
        },
        error: function () {
            alert("State Code Not Load");
        }
    })
}

function CityInsertUpdateData() {

    //alert(GlobalURL + "Master/CountryInsertUpdateData");
    $.ajax({
        url: GlobalURL + "Master/CityInsertUpdateData",
        type: "POST",
        data: {
            CityID: $("#hfCityID").val(),
            CityName: $("#txtCityName").val(),
            CountryCode: $("#ddlCountry").val(),
            StateCode: $("#ddlState").val(),
            IsActive: $("#chckIsAactive").is(':checked') ? "1" : "0"
        },
        success: function (data) {
            data = JSON.parse(data.d);
            if (data.Status == "1" || data.Status == "2") {
                alert(data.Result);
                GetCityRecord();
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

function GetCityRecord() {
    $.ajax({
        url: GlobalURL + "Master/GetCityRecord",
        type: "POST",
        data: {},
        success: function (data) {
            data = JSON.parse(data);
            $("#tbl").find("tr:gt(0)").remove();
            for (var i = 0; i < data.length; i++) {
                //$("#ddlCountry").append($('<option/>').attr("value", data[i].CountryCode).text(data[i].CountryCode));
                $("#tbl").append('<tr> <td><input type="button" id="btnedit" class="btn btn-primary  form-control" value="Edit"  onclick="EditRecord(' + data[i].CityID + ')"</td> <td><input type="button" id="btndelete" class="btn btn-danger  form-control" value="Delete"  onclick="CityDataDelete(' + data[i].CityID + ')"</td> <td>' + data[i].CountryCode + '</td>  <td>' + data[i].StateCode + '</td>    <td>' + data[i].CityName + '</td> <td>' + (data[i].IsActive == 1 ? "Active" : "InActive") + '</td>  </tr>');

            }
        },
        error: function () {
            alert("Record Not Load");
        }
    })
}


function CityDataDelete(CityID) {
    if (confirm("Are you sure to delete!!")) {
        $.ajax({
            url: GlobalURL + "Master/CityDataDelete",
            type: "POST",
            data: { CityID: CityID },
            success: function () {
                alert("Record Deleted Successfully");
                GetCityRecord();
            },
            error: function () {
                alert("Record Not Deleted");
            }
        });
    }
}

function GetCityDetails() {
    $.ajax({
        url: GlobalURL + "Master/GetCityDetails",
        type: "POST",
        data: {},
        success: function (data) {
            $("#lbCountryDetails").html(data.Grid);
        },
        error: function () {
            alert("Record Not Load");
        }
    })
}

function GetCityByID(CityID) {
    $.ajax({
        url: GlobalURL + "Master/GetCityByID",
        type: "POST",
        data: { CityID: CityID },
        success: function (data) {
            $("#lbCountryDetails3").html(data.Grid);
        },
        error: function () {
            alert("Record Not Load");
        }
    })
}


function GetCityDetails2() {
    $.ajax({
        url: GlobalURL + "Master/GetCityDetails2",
        type: "POST",
        data: {},
        success: function (data) {
            $("#lbCountryDetails2").html(data.Grid);
            $("#totalrecord").html(data.RowCount);
        },
        error: function () {
            alert("Record Not Load");
        }
    })
}

function exportexcel() {
    $("#mytable").table2excel({
        name: "Table2Excel",
        filename: "myFileName",
        fileext: ".xls"
    });
}

function exportpdf() {
    html2canvas($('#mytable')[0], {
        onrendered: function (canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 500
                }]
            };
            pdfMake.createPdf(docDefinition).download("Table.pdf");
        }
    });
}

function EditRecord(CityID) {
    $.ajax({
        url: GlobalURL + "Master/EditRecord",
        type: "POST",
        data: { CityID: CityID },
        success: function (data) {
            data = JSON.parse(data);
            $("#hfCityID").val(CityID);
            $("#ddlCountry").val(data[0].CountryCode);
            GetStateCode();
            setTimeout(function () {
                $("#ddlState").val(data[0].StateCode);
            }, 500)
            $("#ddlState").val(data[0].StateCode);
            $("#txtCityName").val(data[0].CityName);
            //if ($("input[type=chkbox]").prop(":checked"))
            //{
            //    $("#chckIsAactive").prop("checked", true);
            //} else {
            //    $("#chckIsAactive").attr("checked", false);
            //}
            if ($("#chckIsAactive").val() == true) {
                $("#chckIsAactive").prop("checked", true);
            }
            else {
                $("#chckIsAactive").attr("checked", false);
            }

            $("#btnSave").val("Update");
        },
        error: function () {
            alert("Record not Edited");
        }
    });
}

