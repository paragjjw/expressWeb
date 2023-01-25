const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp_status = document.getElementById("temp_status");
const temp = document.getElementById("temp");
const data_hide = document.querySelector(".middle_layer");
const today_day = document.getElementById("today_day");
const today_date = document.getElementById("today_date");
const today = new Date();
const day_arr = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const month_arr = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEPT",
  "OCT",
  "NOV",
  "DEC",
];
today_day.innerText = day_arr[today.getDay()];
today_date.innerText = `${today.getDate()} ${month_arr[today.getMonth()]}`;
const getInfo = async (event) => {
  event.preventDefault();
  if (cityName.value === "") {
    city_name.innerText = "Please write the name before search";
    data_hide.classList.add("data_hide");
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&units=metric&appid=b956fceac870753fa983882ba852ef4c`;
      const response = await fetch(url);
      const arrData = [await response.json()];
      city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`;
      temp.innerText = `${arrData[0].main.temp}`;
      const tempMood = arrData[0].weather[0].main;
      //   console.log(tempMood);
      if (tempMood == "Clear") {
        temp_status.innerHTML =
          "<i class='fa-solid fa-sun' style='color:#eccc68'></i>";
      } else if (tempMood == "Clouds") {
        temp_status.innerHTML =
          "<i class='fa-solid fa-cloud' style='color:#f1f2f6'></i>";
      } else if (tempMood == "Rain") {
        temp_status.innerHTML =
          "<i class='fa-solid fa-cloud-rain' style='color:#a4b0be'></i>";
      } else {
        temp_status.innerHTML =
          "<i class='fa-solid fa-sun' style='color:#eccc68'></i>";
      }
      if (data_hide.classList.contains("data_hide"))
        data_hide.classList.remove("data_hide");
    } catch (error) {
      console.log("error");
      city_name.innerText = "Please enter a valid city name";
      data_hide.classList.add("data_hide");
    }
  }
};
submitBtn.addEventListener("click", getInfo);
