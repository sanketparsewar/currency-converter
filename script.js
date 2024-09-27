const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// this is written to get the list of all the country code from the countryList saved in the code.js file
// for (code in countryList){
//     console.log(code,countryList[code])
// }

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.value = currCode;
    newOption.innerText = currCode;
    if (select.name == "from" && currCode == "USD") {
      newOption.selected = "selected";
    }
    if (select.name == "to" && currCode == "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];

  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  // currently we have select in our element variable so to assces the image which is outside of the select that so we have to go to parent element and then  select the img element
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  // this will prevent all the default work done by the button
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let finalAmount = amtVal * rate;
  msg.textContent = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(3)} ${
    toCurr.value
  }`;
});
