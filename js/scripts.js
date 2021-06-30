$(document).ready(function () {
  var userStatus = "";
  resetNavBar();

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
      county,
      town,
      frequency,
      amount,
      chamaName,
      type,
      vision
    );

    // add member ===
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

    resetHtmlContent();
    resetNavBar();
    navigate("settings");

    console.log(newUser);
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
});
var newUser = new User(
  "Mr",
  "male",
  "John",
  "Doe",
  "Doe",
  "0721000000",
  "023189",
  "john-doe@gmail.com"
);

/*==============
 CONSTRUCTORS
 ===============*/
function User(
  title,
  gender,
  firstName,
  middleName,
  lastName,
  phoneNumber,
  idNumber,
  emailAddress
) {
  this.name = {
    title: title,
    first: firstName,
    middle: middleName,
    last: lastName,
  };
  this.gender = gender;
  this.phoneNumber = phoneNumber;
  this.nationalId = idNumber;
  this.email = emailAddress;
  this.chamas = [];
}
function Chama(county, town, frequency, amount, chamaName, type, vision) {
  this.description = { chamaName: chamaName, type: type, vision: vision };
  this.address = { county: county, town: town };
  this.contributions = { frequency: frequency, amount: amount };
  this.members = [];
  this.transactions = [];
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
 FUNCTIONS-OTHER
 ===============*/
function resetNavBar() {
  if (newUser.chamas.length === 0) {
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
  // Settings
  // General settings
  var chamas = newUser.chamas,
    county = "",
    town = "",
    nature = "",
    vision = "",
    frequency = "",
    amount = 0;

  chamas.forEach(function (chama) {
    county = chama.address.county;
    town = chama.address.town;
    nature = chama.description.type;
    vision = chama.description.vision;
    frequency = chama.contributions.frequency;
    amount = formatCurrency(parseInt(chama.contributions.amount));
  });

  $(".general-settings .sub-settings-content")
    .empty()
    .html(
      "<ul> <li>Name: <span>Jiwezeshe</span></li> <li>County: <span>" +
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
  //
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

$(document).ready(function () {
  $("#signup-btn").click(function () {
    $("#signup").show();
    $("#login").hide();
  });
  $("#login-btn").click(function () {
    $("#login").show();
    $("#signup").hide();
  });
  $("#submit-btn").click(function (event) {
    event.preventDefault();

    var firstname = $("input#firstname").val();
    var lastname = $("input#lastname").val();
    var phonenumber = $("input#phonenumber").val();
    var email = $("input#email").val();
    var numberid = $("input#numid").val();
    var username = $("input#username").val();
    var password = $("input#newpass").val();
    var pass = $("input#conpass").val();
    console.log(
      firstname,
      lastname,
      phonenumber,
      email,
      numberid,
      username,
      password,
      pass
    );
    if (
      firstname == "" ||
      lastname == "" ||
      phonenumber == "" ||
      email == "" ||
      numberid == "" ||
      username == "" ||
      password == "" ||
      pass == ""
    ) {
      $("h5#errorfirstname").append(
        " ERROR!!please complete filling in the form"
      );
    } else {
      $("#maincontent").show();
      $("#landingpage").hide();
    }
  });
  $("#loginbtn").click(function (event) {
    event.preventDefault();
    var usnumber = $("input#usnum").val();
    var pswd = $("input#pwd").val();

    console.log(usnumber, pswd);

    if (usnumber == "" || pswd == "") {
      $("h5#errorfirstname").append(
        " ERROR!!please complete filling in the form"
      );
    } else {
      $("#maincontent").show();
      $("#landingpage").hide();
    }
  });
});

// var firstname =document.getElementById("firstname").value();
// console.log(firstname)
