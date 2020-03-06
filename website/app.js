/* Global Variables */
//api setup
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "bb9913447c72efc510a7810df3376048";
const button = document.getElementById("generate");
const feelings = document.getElementById("feelings");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

//fetch to the api

const getWeather = async (zip, baseUrl, apiKey) => {
  const res = await fetch(`${baseUrl}${zip}&appid=${apiKey}`);
  const data = await res.json();
  const object = {
    temperature: data.main.temp,
    date: d,
    userResponse: feelings.value
  };
  console.log(object);
};
getWeather(94040, baseUrl, apiKey);

button.addEventListener("click", () => {
  const zip = document.getElementById("zip").value;
  if (zip) {
    getWeather(zip, baseUrl, apiKey);
  }
});
const postData = async (url = "", object) => {
  const result = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(object)
  });
  const answer = await result.json();
  console.log(answer);
};
const testObject = {
  temperature: 20,
  date: "now",
  userResponse: "sick"
};
postData("http://localhost:8080/", testObject);
