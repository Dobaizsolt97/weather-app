/* Global Variables */
//api setup
//root link for making zip calls to the api
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
//personal api key
const apiKey = "bb9913447c72efc510a7810df3376048";
// html elements
const button = document.getElementById("generate");
const feelings = document.getElementById("feelings");
const lastDate = document.getElementById("date");
const lastTemp = document.getElementById("temp");
const lastContent = document.getElementById("content");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

//fetch to the api
const getWeather = async (zip, baseUrl, apiKey) => {
  const res = await fetch(`${baseUrl}${zip}&appid=${apiKey}`);
  const data = await res.json();
  //creating an object that contains the values that we want to store
  const object = {
    temperature: data.main.temp,
    date: newDate,
    userResponse: feelings.value
  };
  postData("http://localhost:8080/", object);
};

// uppon click we check if there is a zip value

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

  updateUi("http://localhost:8080/values");
};

/* making a call to our stored values and accesing the last one */
const updateUi = async (url = "") => {
  const request = await fetch(url);
  try {
    const allData = await request.json();
    const lastResponse = allData.entryes[allData.entryes.length - 1];
    lastContent.innerHTML = `<p>${lastResponse.userResponse}</p>`;
    lastDate.innerHTML = `<h4>date: ${lastResponse.date}<h4>`;
    lastTemp.innerHTML = `<h4>temperature: ${lastResponse.temperature} degrees<h4>`;
  } catch (error) {
    console.log("error", error);
  }
};
