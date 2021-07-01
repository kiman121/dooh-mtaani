const newUser = new User();
$(document).ready(function () {
  var chamaId = 1;
  /*===== Form submissions======*/
  // 1) Add chama
  $("form#add-new-chama").submit(function (event) {
    event.preventDefault();
    var county = $(".county").val(),
      town = $(".town").val(),
      frequency = $(".contribution-frequency").val(),
      amount = $(".contribution-amount").val(),
      chamaName = $(".chama-name").val(),
      type = $(".chama-type").val(),
      vision = $(".vision").val();

    const newChama = new Chama(
      chamaId,
      county,
      town,
      frequency,
      amount,
      chamaName,
      type,
      vision
    );

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

    if (userStatus()) {
      setChamaStatus(chamaId, chamaName);
    }
    resetHtmlContent();
    // resetNavBar(userStatus());
    navigate("settings");

    chamaId++;
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

    chamas.forEach(function (chama) {
      if ((chama.description.chamaId = selectedChamaID)) {
        chama.paymentDetails = chamaPaymentDetails;
      }
    });

    resetHtmlContent();
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
    var result = validateUserInput(fieldsToValidates);

    if (result) {
      (newUser.name.title = $(".title").val()),
        (newUser.name.first = $(".firstname").val()),
        (newUser.name.last = $(".lastname").val()),
        (newUser.name.middle = $(".middlename").val()),
        (newUser.gender = $(".gender").val()),
        (newUser.phoneNumber = $(".phonenumber").val()),
        (newUser.email = $(".email").val()),
        (newUser.nationalId = $(".id-number").val()),
        (newUser.password = $(".password").val());
    }

    // Add login functionality
    $(".landingpage").addClass("hide-div");
    $(".main-content").removeClass("hide-div");

    resetHtmlContent();
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
  $(".settings-link").addClass("active");

  $("." + activeNavLink).addClass("hide-div");
  $("." + toLink).removeClass("hide-div");
}
function resetHtmlContent() {
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
  // General settings
  resetGeneralSettings(
    chamaName,
    county,
    town,
    nature,
    vision,
    frequency,
    amount
  );
  // Payment details
  resetPaymentDetailsSettings(paymentDetails);
  // Reset welcome message
  resetWelcomeMessage(title, firstname, fullName);
  // Reset contribute
  resetContribute(fullName, phoneNumber, frequency, amount);
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
}
function validateUserInput(fieldsToValidates) {
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
// $(document).ready(function () {
//   $("#signup-btn").click(function () {
//     $("#signup").show();
//     $("#login").hide();
//   });
//   $("#login-btn").click(function () {
//     $("#login").show();
//     $("#signup").hide();
//   });
//   $("#submit-btn").click(function (event) {
//     event.preventDefault();

//     var firstname = $("input#firstname").val();
//     var lastname = $("input#lastname").val();
//     var phonenumber = $("input#phonenumber").val();
//     var email = $("input#email").val();
//     var numberid = $("input#numid").val();
//     var username = $("input#username").val();
//     var password = $("input#newpass").val();
//     var pass = $("input#conpass").val();
//     console.log(
//       firstname,
//       lastname,
//       phonenumber,
//       email,
//       numberid,
//       username,
//       password,
//       pass
//     );
//     if (
//       firstname == "" ||
//       lastname == "" ||
//       phonenumber == "" ||
//       email == "" ||
//       numberid == "" ||
//       username == "" ||
//       password == "" ||
//       pass == ""
//     ) {
//       $("h5#errorfirstname").append(
//         " ERROR!!please complete filling in the form"
//       );
//     } else {
//       $("#maincontent").show();
//       $("#landingpage").hide();
//     }
//   });
//   $("#loginbtn").click(function (event) {
//     event.preventDefault();
//     var usnumber = $("input#usnum").val();
//     var pswd = $("input#pwd").val();

//     console.log(usnumber, pswd);

//     if (usnumber == "" || pswd == "") {
//       $("h5#errorfirstname").append(
//         " ERROR!!please complete filling in the form"
//       );
//     } else {
//       $("#maincontent").show();
//       $("#landingpage").hide();
//     }
//   });
// });

// var firstname =document.getElementById("firstname").value();
// console.log(firstname)



var loadFile = function (event) {
  var image = document.getElementById("output");

  image.src = URL.createObjectURL(event.target.files[0]);
};