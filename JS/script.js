// getting the elements
const formElements1 = {
  name: document.querySelector("#form-name"),
  number: document.querySelector("#form-number"),
  cvc: document.querySelector("#form-cvc"),
};
const formElements2 = {
  month: document.querySelector("#month"),
  year: document.querySelector("#year"),
};
const formCardsFields = {
  name: document.querySelector("#front-name"),
  number: document.querySelector("#front-numbers"),
  cvc: document.querySelector("#back-cvc"),
  date: document.querySelector("#front-date"),
};

const form_button = document.querySelector("#form-button");
const form = document.querySelector("#form");
const message = document.querySelector("#message");
const message_button = document.querySelector("#message-button");

// Adding the data to the card fields simultaneously when entering the data
formElements1.name.addEventListener("input", ({ target: { value } }) => {
  formCardsFields.name.innerHTML = value.trim();
});
formElements1.number.addEventListener("input", ({ target: { value } }) => {
  const spans = formCardsFields.number.querySelectorAll("span");
  const numbers = value.match(/.{1,4}/g) || ["0000"];
  spans.forEach((span, index) => {
    span.textContent =
      numbers[index] == undefined
        ? "0000"
        : (numbers[index] + "0".repeat(4)).slice(0, 4);
  });
});
formElements1.cvc.addEventListener("input", ({ target: { value } }) => {
  formCardsFields.cvc.innerHTML = (value.trim() + "0".repeat(3)).slice(0, 3);
});
formElements2.month.addEventListener("input", ({ target: { value } }) => {
  const the_date = value.trim() == "" ? "00" : value.trim();
  formCardsFields.date.innerHTML = [
    the_date,
    formCardsFields.date.innerHTML.split("/")[1],
  ].join("/");
});
formElements2.year.addEventListener("input", ({ target: { value } }) => {
  the_date = value.trim() == "" ? "00" : value.trim();
  formCardsFields.date.innerHTML = [
    formCardsFields.date.innerHTML.split("/")[0],
    the_date,
  ].join("/");
});

// check if the fields are empty and check regex

// check the regex of each field
function check_regex(name, value) {
  let regex;
  switch (name) {
    case "name":
      regex = /(?:^|[^ ])[-a-zA-Z' ]{2,26}/;
      break;
    case "number":
      regex = /^4[0-9]{12}(?:[0-9]{3})?$/;
      break;
    case "cvc":
      regex = /^\d{3}$/;
      break;
    default:
      return;
  }

  if (!regex.test(value)) {
    formElements1[name].style.borderColor = "red";
    formElements1[name].parentNode.classList.add("error", "error2");
  } else {
    formElements1[name].style.borderColor = "var(--light-grayish-violet)";
    formElements1[name].parentNode.classList.remove("error", "error2");
  }
}
function check_regex_date() {
  const regex = /^(0[1-9]|1[0-2])\/(2[2-9]|(?:[3-9][0-9]))$/;
  if (!regex.test(formCardsFields.date.innerHTML)) {
    formElements2.month.style.borderColor = "red";
    formElements2.year.style.borderColor = "red";
    formElements2.month.parentNode.classList.add("error", "error2");
  } else {
    formElements2.month.style.borderColor = "var(--light-grayish-violet)";
    formElements2.year.style.borderColor = "var(--light-grayish-violet)";
    formElements2.month.parentNode.classList.remove("error", "error2");
  }
}

// check if any field is empty then calling the regex function
form_button.addEventListener("click", () => {
  for (const [fieldName, fieldElement] of Object.entries(formElements1)) {
    if (fieldElement.value.trim() == "") {
      fieldElement.style.borderColor = "red";
      fieldElement.parentNode.classList.add("error", "error1");
    } else {
      fieldElement.style.borderColor = "var(--light-grayish-violet)";
      fieldElement.parentNode.classList.remove("error", "error1");
      check_regex(fieldName, fieldElement.value.trim());
    }
  }
  let emptyFieldsCount = 0;
  for (const [fieldName, fieldElement] of Object.entries(formElements2)) {
    if (fieldElement.value.trim() == "") {
      emptyFieldsCount++;
      fieldElement.style.borderColor = "red";
    } else {
      fieldElement.style.borderColor = "var(--light-grayish-violet)";
    }
  }
  if ((emptyFieldsCount === 2) | (emptyFieldsCount === 1)) {
    formElements2.month.parentNode.classList.add("error", "error1");
  } else {
    formElements2.month.parentNode.classList.remove("error", "error1");
    check_regex_date();
  }
  if (document.querySelectorAll(".error").length == 0) {
    message.classList.remove("hidden");
    form.classList.add("hidden");
  }
});

// When clicking on the confirm, reload the page
message_button.addEventListener("click", () => {
  location.reload();
});
