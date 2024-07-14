const API_KEY = "9f4c19b7dea6ddd617571073"; 
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;

const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr =  document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector("form button"); 
const msg = document.querySelector(".msg");

for (let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="From" && currCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="To" && currCode==="PKR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });

}

const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
    
};

const updateExchangeRate = async ()=>{
   let amount = document.querySelector(".amount input");
   let amtVal = amount.value;
   if(amtVal===""||amtVal<1){
    amtVal=1;
    amount.value="1";
   }
   const URL = `${BASE_URL}/${fromCurr.value}`;
   let response = await fetch(URL);
   let data = await response.json();
   let rate = data.conversion_rates[toCurr.value];
   let finalAmount = rate * amtVal;
   msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

btn.addEventListener("click",(evt)=>{
   evt.preventDefault();
   updateExchangeRate();
});
window.addEventListener("load",()=>{
   updateExchangeRate();
});

