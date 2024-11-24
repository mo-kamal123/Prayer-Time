const middleEastCapitals = {
  Egypt: "Cairo",
  "Saudi Arabia": "Riyadh",
  "United Arab Emirates": "Abu Dhabi",
  Jordan: "Amman",
  Lebanon: "Beirut",
  Kuwait: "Kuwait City",
  Oman: "Muscat",
  Qatar: "Doha",
  Bahrain: "Manama",
  Iraq: "Baghdad",
  Syria: "Damascus",
  Palestine: "Ramallah",
  Turkey: "Ankara",
  Iran: "Tehran",
  Yemen: "Sana'a",
  Libya: "Tripoli",
  Tunisia: "Tunis",
  Algeria: "Algiers",
  Morocco: "Rabat",
};

function updateCountryValue() {
  const selectElement = document.getElementById("country");
  const selectedCountry = selectElement.value;
  const city = middleEastCapitals[selectedCountry];
  document.getElementById("currcountry").innerHTML = selectedCountry;
  console.log("Country changed to:", selectedCountry);
  console.log("Country changed to:", city);
  prayerTimes(city, selectedCountry);
}

const convertTo12Format = (time) => {
  let [hours, mins] = time.split(":").map(Number);
  let period = hours >= 12 ? "am" : "pm";
  hours = hours % 12 || 12;

  // Use padStart to ensure two-digit format
  const hourFormatted = hours.toString().padStart(2, "0");
  const minuteFormatted = mins.toString().padStart(2, "0");

  return `${hourFormatted}:${minuteFormatted} ${period}`;
};

const prayerTimes = (city, country) => {
  axios
    .get(
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}`
    )
    .then((res) => {
      let pray = res.data.data.timings;
      // let currDate = res.data.data.date.gregorian.date
      let week = res.data.data.date.readable;
      const readable = res.data.data.date.hijri.weekday.ar;
      console.log(date);
      console.log(week + readable);
      document.getElementById("date").innerHTML = `${week + " " + readable}`;
      fillAllTimes("fajr", pray.Fajr);
      fillAllTimes("sunrise", pray.Sunrise);
      fillAllTimes("dhuhr", pray.Dhuhr);
      fillAllTimes("asr", pray.Asr);
      fillAllTimes("maghrib", pray.Maghrib);
      fillAllTimes("ishaa", pray.Isha);
    });
};
fillAllTimes = (id, time) => {
  document.getElementById(id).innerHTML = convertTo12Format(time);
};
prayerTimes("Cairo", "Egypt");


