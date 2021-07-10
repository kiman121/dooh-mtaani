const newUser = new User(),
  newSystemUsers = new SystemUsers();
   
$(document).ready(function () {
  var chamaID = 1;
  /*===== Form submissions======*/
  // 1) Add chama
  $("form#add-new-chama").submit(function (event) {
    event.preventDefault();

    var fieldsToValidates = [
      "county",
      "town",
      "contribution-frequency",
      "contribution-amount",
      "chama-name",
      "chama-type",
      "vision",
    ],
      result = validateUserInput(fieldsToValidates, "new-chama-form-alerts");

    if (result) {
      var county = $(".county").val(),
        town = $(".town").val(),
        frequency = $(".contribution-frequency").val(),
        amount = $(".contribution-amount").val(),
        chamaName = $(".chama-name").val(),
        type = $(".chama-type").val(),
        vision = $(".vision").val(),
        selectedUserStatus = userStatus();
      // userStatus = userStatus();
      // console.log(userStatus());

      console.log(chamaID);

      var newChama = new Chama(
        chamaID,
        county,
        town,
        frequency,
        amount,
        chamaName,
        type,
        vision
      );

      // console.log(userStatus());
      var title = newUser.name.title,
        fullName =
          newUser.name.first +
          " " +
          newUser.name.middle +
          " " +
          newUser.name.last,
        gender = newUser.gender,
        phoneNumber = newUser.phoneNumber,
        idNumber = newUser.nationalId,
        emailAddress = newUser.email;

      const newMember = new Member(
        title,
        fullName,
        gender,
        phoneNumber,
        idNumber,
        emailAddress
      );

      newChama.members.push(newMember);

      newUser.chamas.push(newChama);
      console.log(newUser);
      // console.log(userStatus(),chamaId, chamaName);

      // console.log(userStatus());
      if (!selectedUserStatus) {
        setChamaStatus(chamaID, chamaName);
        navigate("settings");
      } else {
        navigate("dashboard");
      }
      resetHtmlContent(selectedUserStatus, chamaID);
      // resetNavBar(userStatus());
      console.log(chamaID);
      console.log();
      resetFormFields(fieldsToValidates);
      chamaID++;
    }
  });
  // 2) Add payment details
  $("form#add-payment-details").submit(function (event) {
    event.preventDefault();
    var selectedChamaID = $(".status-bar")
      .find(".selected-chama-details")
      .data("selectedchamaid"),
      chamas = newUser.chamas,

      financialServiceProvider = $(".financial-service-provider").val(),
      accountNumber = $(".account-number").val(),
    
    chamaPaymentDetails = {
      financialServiceProvider: financialServiceProvider,
      accountNumber: accountNumber,
    };
    console.log(selectedChamaID);
    chamas.forEach(function (chama) {
      if ((chama.description.chamaId = selectedChamaID)) {
        chama.paymentDetails = chamaPaymentDetails;
      }
    });
      validatePaymentDetails();
    // resetHtmlContent();
    console.log(newUser);
  });
 // 3) Signup
  $("form#signup").submit(function (event) {
    event.preventDefault();
    var fieldsToValidates = [
      "title",
      "firstname",
      "lastname",
      "middlename",
      "gender",
      "phonenumber",
      "id-number",
      "email",
      "password",
    ];
    var result = validateUserInput(fieldsToValidates, "sign-up-form-alerts");
    const sigupUser = new User();
    if (result) {
      (sigupUser.name.title = $(".title").val()),
        (sigupUser.name.first = $(".firstname").val()),
        (sigupUser.name.last = $(".lastname").val()),
        (sigupUser.name.middle = $(".middlename").val()),
        (sigupUser.gender = $(".gender").val()),
        (sigupUser.phoneNumber = $(".phonenumber").val()),
        (sigupUser.email = $(".email").val()),
        (sigupUser.nationalId = $(".id-number").val()),
        (sigupUser.password = $(".password").val());
      // Add login functionality

      newSystemUsers.users.push(sigupUser);
      $.ajax({
			type: "POST",
		url: "https://60e6fd3c15387c00173e49e5.mockapi.io/systemusers",
			
			data: sigupUser,
			
			success: function(res) {
				console.log("success after user is register response" +"  "+JSON.stringify(res)); 
        resetFormFields(fieldsToValidates);
      alertUser(
        "You have successfully signed up! Kindly proceed to the login.",
        "sign-up-form-alerts",
        "alert-success"
      ); 
      $(".sign-up").addClass("hide-div");   
			},
			error: function(res) {
      alertUser("error singing up",
      "sign-up-form-alerts",
      "alert-danger");
			}
		});

      
      // $(".sign-up-form-alerts").empty().html(;
      // $(".sign-up-form-alerts").removeClass("hide-alert").addClass("alert-success");

      
      console.log(newSystemUsers);
      // resetHtmlContent();
  }
  });
  // 4) Login
  $("form#login").submit(function (event) {
    event.preventDefault();
    var userEmail = $(".user-eamil").val(),
      userPassword = $(".user-password").val(),
      fieldsToValidates = ["user-eamil", "user-password"];

    var result = validateUserInput(fieldsToValidates, "sign-up-form-alerts");
    
    if (result) {
  
      var users = newSystemUsers.users;

      users.forEach(function (user) {
        if (user.email === userEmail && user.password === userPassword) {
          $(".landingpage").addClass("hide-div");
          $(".main-content").removeClass("hide-div");

          newUser.name.title = user.name.title;
          newUser.name.first = user.name.first;
          newUser.name.last = user.name.last;
          newUser.name.middle = user.name.middle;
          newUser.gender = user.gender;
          newUser.phoneNumber = user.phoneNumber;
          newUser.email = user.email;
          newUser.nationalId = user.nationalId;
          newUser.password = user.password;
          resetHtmlContent();
        } else {
          alertUser(
            "Your email or password is incorrect!!!",
            "sign-up-form-alerts",
            "alert-danger"
          );
        }
      });
    }
  });
  /*===== Other events ======*/
  $(".btn-nav").click(function (event) {
    event.preventDefault();
    var selectedLink = $(this).data("link"),
      activeLink = $(this).parents(".menu-bar").find(".active").data("link");
    $(this).parents(".menu-bar").find(".active").removeClass("active");
    $(this).addClass("active");

    $("." + activeLink).addClass("hide-div");
    $("." + selectedLink).removeClass("hide-div");
  });
  $(".btn-settings").click(function (event) {
    event.preventDefault();
    var selectedLink = $(this).data("link"),
      activeLink = $(this)
        .parents(".settings-well-menu")
        .find(".active")
        .data("link");

    $(this)
      .parents(".settings-well-menu")
      .find(".active")
      .removeClass("active");
    $(this).addClass("active");

    $("." + activeLink).addClass("hide-div");
    $("." + selectedLink).removeClass("hide-div");
  });
  $(".btn-landingpage").click(function (event) {
    event.preventDefault();
    var divLink = $(this).data("link");
    if (divLink === "sign-up") {
      $(".sign-in").addClass("hide-div");
    } else {
      $(".sign-up").addClass("hide-div");
    }
    $("." + divLink).removeClass("hide-div");
  });
});

/*==============
 CONSTRUCTORS
 ===============*/
function User() {
  this.name = {
    title: "",
    first: "",
    middle: "",
    last: "",
  };
  this.gender = "";
  this.phoneNumber = "";
  this.nationalId = "";
  this.email = "";
  this.password = "";
  this.chamas = [];
}
function Chama(
  chamaId,
  county,
  town,
  frequency,
  amount,
  chamaName,
  type,
  vision
) {
  this.description = {
    chamaId: chamaId,
    chamaName: chamaName,
    type: type,
    vision: vision,
  };
  this.address = { county: county, town: town };
  this.contributions = { frequency: frequency, amount: amount };
  this.members = [];
  this.transactions = [];
  this.paymentDetails = {};
}
function Member(title, fullName, gender, phoneNumber, idNumber, emailAddress) {
  this.registrationDate = "";
  this.names = { title: title, fullName: fullName };
  this.gender = gender;
  this.phoneNumber = phoneNumber;
  this.nationalId = idNumber;
  this.email = emailAddress;
}
function SystemUsers() {
  this.users = [];
}
/*==============
 PROTOTYPES
 ===============*/
User.prototype.fullName = function () {
  return (
    newUser.name.first + " " + newUser.name.middle + " " + newUser.name.last
  );
};

/*==============
 FUNCTIONS-OTHER
 ===============*/
function userStatus() {
  var exists = false;
  if (newUser.chamas.length !== 0) {
    exists = true;
  }
  return exists;
}
function resetNavBar(userStatus) {
  if (!userStatus) {
    $(".settings-link, .contribute-link, .dashboard-link").addClass(
      "hide-link"
    );
  } else {
    $(".settings-link, .contribute-link, .dashboard-link").removeClass(
      "hide-link"
    );
    $(".welcome-link").addClass("hide-link");
  }
}
function navigate(toLink) {
  var activeNavLink = $(".menu-bar").find(".active").data("link");

  $(".menu-bar").find(".active").removeClass("active");
  $("." + toLink + "-link").addClass("active");

  $("." + activeNavLink).addClass("hide-div");
  $("." + toLink).removeClass("hide-div");
}
function resetHtmlContent(selectedUserStatus = true, chamaId = "") {
  var selectedChamaID = $(".status-bar")
    .find(".selected-chama-details")
    .data("selectedchamaid"),
    chamas = newUser.chamas,
    title = newUser.name.title,
    firstname = newUser.name.first,
    fullName = newUser.fullName(),
    phoneNumber = newUser.phoneNumber,
    chamaName = "",
    county = "",
    town = "",
    nature = "",
    vision = "",
    frequency = "",
    amount = 0,
    paymentDetails = {};

  chamas.forEach(function (chama) {
    if ((chama.description.chamaId = selectedChamaID)) {
      chamaName = chama.description.chamaName;
      county = chama.address.county;
      town = chama.address.town;
      nature = chama.description.type;
      vision = chama.description.vision;
      frequency = chama.contributions.frequency;
      amount = formatCurrency(parseInt(chama.contributions.amount));
      paymentDetails = chama.paymentDetails;
    }
  });
  // Nav bar
  resetNavBar(userStatus());
  // Resets for a new user
  if (!selectedUserStatus) {
    resetGeneralSettings(
      chamaName,
      county,
      town,
      nature,
      vision,
      frequency,
      amount
    );
  }

  // Payment details
  resetPaymentDetailsSettings(paymentDetails);
  // Reset welcome message
  resetWelcomeMessage(title, firstname, fullName);
  // Reset contribute
  resetContribute(fullName, phoneNumber, frequency, amount);
  // Reset registered chamas
  resetRegisteredChamas(userStatus(), chamas);
}
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
function formatCurrency(amount) {
  return parseFloat(amount, 10)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
    .toString();
}
function resetGeneralSettings(
  chamaName,
  county,
  town,
  nature,
  vision,
  frequency,
  amount
) {
  $(".general-settings .sub-settings-content")
    .empty()
    .html(
      "<ul> <li>Name: <span>" +
      chamaName +
      "</span></li> <li>County: <span>" +
      county +
      "</span></li> <li>Town: <span>" +
      town +
      "</span></li> <li>Nature: <span>" +
      nature +
      "</span></li> <li>Vision: <span>" +
      vision +
      "</span></li> <li>Contribution frequency: <span>" +
      frequency +
      "</span></li> <li>Amount: <span>" +
      amount +
      " ksh</span></li> </ul>"
    );
}
function resetPaymentDetailsSettings(paymentDetails) {
  if ($.isEmptyObject(paymentDetails)) {
    $(".sub-settings-content.info").addClass("hide-div");
    $(".sub-settings-content.form").removeClass("hide-div");
  } else {
    $(".sub-settings-content.info").removeClass("hide-div");
    $(".sub-settings-content.form").addClass("hide-div");
    $(".sub-settings-content.info")
      .empty()
      .html(
        "<p>Make contributions to:</p> <p>Paybill#: <span>" +
        paymentDetails.accountNumber +
        '</span></p> <p>Account #: <span>"your phone number"</span></p>'
      );
  }
}
function setChamaStatus(chamaId, chamaName) {
  $(".selected-chama-details").data({
    selectedchamaid: chamaId,
    selectedchamaname: chamaName,
  });
  $(".selected-chama-details").empty().html(chamaName);
}
function validateUserInput(fieldsToValidates, alertDivClass) {
  $(".validate").removeClass("validate");
  var status = true;

  fieldsToValidates.forEach(function (fieldsToValidate) {
    var field = fieldsToValidate,
      thisField = $("." + field),
      value = thisField.val();

    if (value === "") {
      thisField.addClass("validate");
      status = false;
    }
  });
  if (!status) {
    alertUser("Fill in the missing details!", alertDivClass, "alert-danger");
  }
  return status;
}
function resetWelcomeMessage(title, first, fullName) {
  $(".user-name").text(title + " " + fullName);
  $(".current-user__name").text(first);
}
function resetContribute(fullName, phoneNumber, frequency, amount) {
  $(".contribute__container")
    .empty()
    .html(
      "<p>Member Name: <span>" +
      fullName +
      "</span></p> <p>Phone no: <span>" +
      phoneNumber +
      "</span></p> <p>Contribution cycle: <span>" +
      frequency +
      "</span></p> <p>Amount: <span>" +
      amount +
      '</span> ksh</p> <button type="button">Push to mpesa</button>'
    );
}
function resetFormFields(fieldsToValidates) {
  fieldsToValidates.forEach(function (fieldsToValidate) {
    $("." + fieldsToValidate).val("");
  });
}
function alertUser(message, alertDivClass, alertClass) {
  $("." + alertDivClass).html(message);
  $("." + alertDivClass)
    .removeClass("hide-alert")
    .addClass(alertClass);

  setTimeout(() => {
    $("." + alertDivClass).empty();
    $("." + alertDivClass)
      .removeClass(alertClass)
      .addClass("hide-alert");
  }, 3000);
}
function resetRegisteredChamas(userStatus, chamas) {
  //
  var yourChamas = "";
  if (userStatus) {
    chamas.forEach(function (chama) {
      yourChamas +=
        '<li data-chamaId = "' +
        chama.description.chamaId +
        '">#' +
        chama.description.chamaName +
        "</li>";
    });
  } else {
    yourChamas = "<li>#Yet to join a chama</li>";
  }
  $(".sidenav").find(".Your-chamas ul").empty().html(yourChamas);
}
var loadFile = function (event) {
  var image = document.getElementById("output");

  image.src = URL.createObjectURL(event.target.files[0]);
};
function validatePaymentDetails(electedChamaID){
  var chamaPaymentDetails = [ financialServiceProvider = $(".financial-service-provider").val(),
      accountNumber = $(".account-number").val(),]
  if(chamaPaymentDetails == ""){
alertUser("sign-up-form-alerts")

  }else{
resetHtmlContent();
  }
}
function getsystemusers(callback){
    $.get("https://60e6fd3c15387c00173e49e5.mockapi.io/systemusers", function(registeredUsers){
      // return registeredUsers() ;
      var registeredUser = registeredUsers
      for (let val in registeredUser){
        var systemusers = registeredUser[val]
        
        console.log(systemusers)
      }
      
     
     });
    }
    getsystemusers()
    
    
