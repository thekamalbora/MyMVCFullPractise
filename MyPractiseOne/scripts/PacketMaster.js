var GlobalURL = "http://localhost:2825/";

$(document).ready(function () {
    Validation();

    GetConsigneeCountryCode();
    ShowPackageDetails();
    $("#ddlConsigneeState").append($('<option/>').attr("value", "0").text("Select"));
    $("#ddlConsigneeState").prop("disabled", true);
    $("#ddlConsigneeCity").append($('<option/>').attr("value", "0").text("Select"));
    $("#ddlConsigneeCity").prop("disabled", true);
    $("#btnPacketSave").click(function () {
        PacketInsertUpdateData();

    });
    $("#btnPacketAddpacketdetails").click(function () {
        PacketDetailsInsertUpdateData();

    });
    $("#txtNoOfControls").change(function () {
        AddPacketDetailControls();
    });
});

function Validation() {
    $('#txtConsignerName,#txtConsigneeName').on('keypress', function (e) {
        var regex = new RegExp("^[a-zA-Z ]*$"); //Alphabtets With Whistespace
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            return true;
        }
        e.preventDefault();
        return false;
    });

    $('#txtConsignerGSTNumber,#txtConsigneeGSTNumber').on('keypress', function (e) {
        var regex = new RegExp("^[a-zA-Z0-9]$");  //Alphabtets With Numbers
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            return true;
        }
        e.preventDefault();
        return false;
    });

    $("#txtPacketWeight,#txtWidth,#txtHeight,#txtLength").keypress(function (event) {
        var keycode = event.which; //Numbers With Decimal Point
        if (keycode != 8 && keycode != 0 && keycode < 48 && $(this).val().indexOf('.') != -1 || keycode > 57) {
            event.preventDefault();
        }
    });

    $("#txtConsignerPhoneNumber,#txtConsigneePhoneNumber,#txtConsignerPincode,#txtConsigneePincode,#txtConsignerFaxNumber,#txtConsigneeFaxNumber").keypress(function (event) {
        var keycode = event.which; //Numbers 
        if (!(keycode >= 48 && keycode <= 57)) {
            event.preventDefault();
        }
    });
}

function GetConsigneeCountryCode() {
    $.ajax({
        url: GlobalURL + "Master/GetConsigneeCountryCode",
        type: "POST",
        data: {},
        success: function (data) {
            data = JSON.parse(data);
            for (var i = 0; i < data.length; i++) {
                //$("#ddlCountry").append($('<option/>').attr("value", data[i].CountryCode).text(data[i].CountryCode));
                $("#ddlConsigneeCountry").append($('<option value=' + data[i].CountryCode + '>' + data[i].CountryName + '</option>'));

            }
        },
        error: function () {
            alert("Country Code Not Load");
        }
    })
}

function GetConsigneeStateCode() {
    $.ajax({
        url: GlobalURL + "Master/GetConsigneeStateCode",
        type: "POST",
        data: { CountryCode: $("#ddlConsigneeCountry").val() },
        success: function (data) {
            data = JSON.parse(data);
            $("#ddlConsigneeState").empty();
            $("#ddlConsigneeState").prop("disabled", false);
            $("#ddlConsigneeCity").empty();
            $("#ddlConsigneeCity").prop("disabled", false);
            $("#ddlConsigneeCity").append($('<option/>').attr("value", "0").text("Select"));
            $("#ddlConsigneeState").append($('<option/>').attr("value", "0").text("Select"));
            for (var i = 0; i < data.length; i++) {
                //$("#ddlCountry").append($('<option/>').attr("value", data[i].CountryCode).text(data[i].CountryCode));
                $("#ddlConsigneeState").append($('<option value=' + data[i].StateCode + '>' + data[i].StateName + '</option>'));

            }
        },
        error: function () {
            alert("State Code Not Load");
        }
    })
}

function GetConsigneeCityCode() {
    $.ajax({
        url: GlobalURL + "Master/GetConsigneeCityCode",
        type: "POST",
        data: { StateCode: $("#ddlConsigneeState").val() },
        success: function (data) {
            data = JSON.parse(data);
            $("#ddlConsigneeCity").empty();
            $("#ddlConsigneeCity").prop("disabled", false);
            $("#ddlConsigneeCity").append($('<option/>').attr("value", "0").text("Select"));
            for (var i = 0; i < data.length; i++) {
                //$("#ddlCountry").append($('<option/>').attr("value", data[i].CountryCode).text(data[i].CountryCode));
                $("#ddlConsigneeCity").append($('<option value=' + data[i].CityName + '>' + data[i].CityName + '</option>'));

            }
        },
        error: function () {
            alert("City Code Not Load");
        }
    })
}

function Clear() {
    $("#hfDTID").val("0"),
    $("#txtPacketName").val("");
    $("#ddlPacketType").val("0");
    $("#txtPacketWeight").val("");
    $("#txtLength").val("");
    $("#txtWidth").val("");
    $("#txtHeight").val("");

}

function GetCityCode() {
    $.ajax({
        url: GlobalURL + "Master/GetCityCode",
        type: "POST",
        data: { StateCode: $("#ddlState").val() },
        success: function (data) {
            data = JSON.parse(data);
            $("#ddlCity").empty();
            $("#ddlCity").prop("disabled", false);
            $("#ddlCity").append($('<option/>').attr("value", "0").text("Select"));
            for (var i = 0; i < data.length; i++) {
                //$("#ddlCountry").append($('<option/>').attr("value", data[i].CountryCode).text(data[i].CountryCode));
                $("#ddlCity").append($('<option value=' + data[i].CityName + '>' + data[i].CityName + '</option>'));

            }
        },
        error: function () {
            alert("City Code Not Load");
        }
    })
}

$('#btnPacketAdd').click(function () {
    ShowPackageDetails();
    $.ajax({
        url: GlobalURL + "Master/GetPacketDetails",
        type: "POST",
        data: {
            DTID: $("#hfDTID").val(),
            PacketName: $("#txtPacketName").val(),
            PacketType: $("#ddlPacketType").val(),
            Weight: $("#txtPacketWeight").val(),
            Length: $("#txtLength").val(),
            Width: $("#txtWidth").val(),
            Height: $("#txtHeight").val(),

        },
        success: function (data) {

            ShowPackageDetails();

        },
        error: function () {
            alert("Not Found");
        }
    });
});

function ShowPackageDetails() {
    $.ajax({
        url: GlobalURL + "Master/ShowPackageDetails",
        type: "POST",
        data: {},
        success: function (data) {
            $("#lbPacketDetails").html(data.Grid);

        },
        error: function () {
            alert("Record Not Load");
        }
    })
}

function EditPacketRecord(DTID) {
    $.ajax({
        url: GlobalURL + "Master/EditPacketRecord",
        type: "POST",
        data: { DTID: DTID },
        success: function (data) {

            $("#hfDTID").val(data.DTID);
            $("#txtPacketName").val(data.PacketName);
            $("#ddlPacketType").val(data.PacketType);
            $("#txtPacketWeight").val(data.Weight);
            $("#txtLength").val(data.Length);
            $("#txtWidth").val(data.Width);
            $("#txtHeight").val(data.Height);

        },
        error: function () {
            alert("Record not Edited");
        }
    });
}

function PacketDataDelete(DTID) {
    if (confirm("Are you sure to delete!!")) {
        $.ajax({
            url: GlobalURL + "Master/PacketDataDelete",
            type: "POST",
            data: { DTID: DTID },
            success: function () {
                alert("Record Deleted Successfully");
                ShowPackageDetails();
            },
            error: function () {
                alert("Record Not Deleted");
            }
        });
    }
}

//function PacketInsertUpdateData() {

//    $.ajax({
//        url: GlobalURL + "Master/PacketInsertUpdateData",
//        type: "POST",
//        data: {
//            PacketID: $("#hfPacketID").val(),
//            AWBNo: $("#txtawbno").val(),
//            ConsigerName: $("#txtConsignerName").val(),
//            ConsigerAddress: $("#txtConsignerAddress").val(),
//            ConsigerCountryCode: $("#ddlCountry").val(),
//            ConsigerStateCode: $("#ddlState").val(),
//            ConsigerCityName: $("#ddlCity").val(),
//            ConsigerPincode: $("#txtConsignerPincode").val(),
//            ConsigerPhoneNo: $("#txtConsignerPhoneNumber").val(),
//            ConsigerGSTNo: $("#txtConsignerGSTNumber").val(),
//            ConsigerFaxNo: $("#txtConsignerFaxNumber").val(),
//            ConsigneeName: $("#txtConsigneeName").val(),
//            ConsigneeAddress: $("#txtConsigneeAddress").val(),
//            ConsigneeCountryCode: $("#ddlConsigneeCountry").val(),
//            ConsigneeStateCode: $("#ddlConsigneeState").val(),
//            ConsigneeCityName: $("#ddlConsigneeCity").val(),
//            ConsigneePincode: $("#txtConsigneePincode").val(),
//            ConsigneePhoneNo: $("#txtConsigneePhoneNumber").val(),
//            ConsigneeGSTNo: $("#txtConsigneeGSTNumber").val(),
//            ConsigneeFaxNo: $("#txtConsigneeFaxNumber").val(),
//            PacketName: $("#txtPacketName").val(),
//            PacketType: $("#ddlPacketType").val(),
//            PacketWeight: $("#txtPacketWeight").val(),
//            PacketLength: $("#txtLength").val(),
//            PacketWidth: $("#txtWidth").val(),
//            PacketHeight: $("#txtHeight").val()


//        },
//        success: function (data) {
//            data = JSON.parse(data);
//            if (data.Status == "1" || data.Status == "2") {
//                alert(data.Msg);

//            } else {
//                alert(data.Msg);
//            }
//            if (data.Focus != "") {
//                $("#" + data.Focus).focus();
//            }
//        },
//        error: function () {
//            alert("Record not saved,Somethong wrong");
//        }
//    });
//}

function PacketDetailsInsertUpdateData() {

    $.ajax({
        url: GlobalURL + "Master/PacketDetailsInsertUpdateData",
        type: "POST",
        data: {
            PacketID: $("#hfDTID").val(),
            PacketName: $("#txtPacketName").val(),
            PacketType: $("#ddlPacketType").val(),
            PacketWeight: $("#txtPacketWeight").val(),
            PacketLength: $("#txtLength").val(),
            PacketWidth: $("#txtWidth").val(),
            PacketHeight: $("#txtHeight").val()
        },
        success: function (data) {
            data = JSON.parse(data);
            if (data.Status == "1" || data.Status == "2") {
                alert(data.Msg);

            } else {
                alert(data.Msg);
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

function GetDynamicControl(value) {

    return '<br/> <div class="row"> <div class="col-lg-12 col-md-12 col-sm-12"> <div class="col-lg-2 col-md-2 col-sm-2"> <div class="form-group"> <input type="hidden" class="hfDTID" value="0" /> <label class="col-sm-4 col-lg-4 col-md-4">Name<span style="color: red; font-size: 20px;">*</span></label> <div class="col-sm-8 col-lg-8 col-md-8"> <input type="text" class="txtPacketName form-control" autocomplete="off" placeholder="Name" /> </div> </div> </div> <div class="col-lg-2 col-md-2 col-sm-2"> <div class="form-group"> <label class="col-sm-4 col-lg-4 col-md-4">P&nbsp;Type<span style="color: red; font-size: 20px;">*</span></label> <div class="col-sm-8 col-lg-8 col-md-8"> <select class="ddlPacketType form-control"> <option value="0">Select</option> <option value="Doc">Doc</option> <option value="Non Doc">Non Doc</option> </select> </div> </div> </div> <div class="col-lg-2 col-md-2 col-sm-2"> <div class="form-group"> <label class="col-sm-4 col-lg-4 col-md-4">Weight<span style="color: red; font-size: 20px;">*</span></label> <div class="col-sm-8 col-lg-8 col-md-8"> <input type="text" class="txtPacketWeight form-control" autocomplete="off" placeholder="Packet Weight" /> </div> </div> </div> <div class="col-lg-2 col-md-2 col-sm-2"> <div class="form-group"> <label class="col-sm-4 col-lg-4 col-md-4"> Length<span style="color: red; font-size: 20px;">*</span> </label> <div class="col-sm-8 col-lg-8 col-md-8"> <input type="text" class="txtLength form-control" autocomplete="off" placeholder="Length" /> </div> </div> </div> <div class="col-lg-2 col-md-2 col-sm-2"> <div class="form-group"> <label class="col-sm-4 col-lg-4 col-md-4">Width<span style="color: red; font-size: 20px;">*</span></label> <div class="col-sm-8 col-lg-8 col-md-8"> <input type="text" class="txtWidth form-control" autocomplete="off" placeholder="Width" /> </div> </div> </div> <div class="col-lg-2 col-md-2 col-sm-2"> <div class="form-group"> <label class="col-sm-4 col-lg-4 col-md-4">Height<span style="color: red; font-size: 20px;">*</span></label> <div class="col-sm-8 col-lg-8 col-md-8"> <input type="text" class="txtHeight form-control" autocomplete="off" placeholder="Height" /> </div> </div> </div> </div>  <button type="button" id="btnPacketRemoveController" onclick="RemoveControl(this)" style="color:black;" class="btn btn-danger"> <span class="glyphicon glyphicon-trash"></span>  </button> </div>'


}

function AddController() {

    var div = document.createElement('DIV');

    div.innerHTML = GetDynamicControl("");

    document.getElementById("divCont").appendChild(div);

}

function RemoveControl(div) {

    document.getElementById("divCont").removeChild(div.parentNode.parentNode);

}

function AddPacketDetailControls() {
    $.ajax({
        url: GlobalURL + "Master/AddPacketDetailControls",
        type: "POST",
        data: { NoOfControls: $("#txtNoOfControls").val() },
        success: function (data) {
            $("#lblPacketControls").html(data.Grid);
        },
        error: function () {
            alert("Controls  not added");
        }
    });
}

function PacketInsertUpdateData() {

    var PacketName = "";
    var PacketType = "";
    var PacketWeight = "";
    var PacketLength = "";
    var PacketWidth = "";
    var PacketHeight = "";
 
    for (var i = 0; i < $("#txtNoOfControls").val() ; i++)
    {
        PacketName += $("#txtPacketName" + i).val()+',';
        PacketType += $("#ddlPacketType" + i).val()+',';
        PacketWeight += $("#txtPacketWeight" + i).val()+',';
        PacketLength += $("#txtLength" + i).val()+',';
        PacketWidth += $("#txtWidth" + i).val()+',';
        PacketHeight += $("#txtHeight" + i).val()+',';
    }

    $.ajax({
        url: GlobalURL + "Master/PacketInsertUpdateData",
        type: "POST",
        data: {
            PacketID: $("#hfPacketID").val(),
            AWBNo: $("#txtawbno").val(),
            ConsigerName: $("#txtConsignerName").val(),
            ConsigerAddress: $("#txtConsignerAddress").val(),
            ConsigerCountryCode: $("#ddlCountry").val(),
            ConsigerStateCode: $("#ddlState").val(),
            ConsigerCityName: $("#ddlCity").val(),
            ConsigerPincode: $("#txtConsignerPincode").val(),
            ConsigerPhoneNo: $("#txtConsignerPhoneNumber").val(),
            ConsigerGSTNo: $("#txtConsignerGSTNumber").val(),
            ConsigerFaxNo: $("#txtConsignerFaxNumber").val(),
            ConsigneeName: $("#txtConsigneeName").val(),
            ConsigneeAddress: $("#txtConsigneeAddress").val(),
            ConsigneeCountryCode: $("#ddlConsigneeCountry").val(),
            ConsigneeStateCode: $("#ddlConsigneeState").val(),
            ConsigneeCityName: $("#ddlConsigneeCity").val(),
            ConsigneePincode: $("#txtConsigneePincode").val(),
            ConsigneePhoneNo: $("#txtConsigneePhoneNumber").val(),
            ConsigneeGSTNo: $("#txtConsigneeGSTNumber").val(),
            ConsigneeFaxNo: $("#txtConsigneeFaxNumber").val(),



            PacketName: PacketName,
            PacketType: PacketType,
            PacketWeight: PacketWeight,
            PacketLength: PacketLength,
            PacketWidth: PacketWidth,
            PacketHeight: PacketHeight


        },
        success: function (data) {
            data = JSON.parse(data);
            if (data.Status == "1" || data.Status == "2") {
                alert("Record Saved");

            } else {
                alert(data.Msg);
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