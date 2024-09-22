const dailyTab = document.getElementById("daily");
const weeklyTab = document.getElementById("weekly");
const monthlyTab = document.getElementById("monthly");
const cards = document.querySelector(".cards-section");

const tabs = [dailyTab, weeklyTab, monthlyTab];
const fetchedData = [];

fetch("data.json")
  .then((response) => {
    if (!response.ok) {
      console.log("data fetching failed");
      return null;
    }
    return response.json();
  })
  .then((data) => {
    data.forEach((item) => {
      fetchedData.push(item);
    });
  });

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tab.classList.add("active");

    // remove active class from other tabs
    const otherTabs = [...tabs].filter((other) => other !== tab);
    otherTabs.forEach((item) => item.classList.remove("active"));

    // reset card-section's innerHMTL
    cards.innerHTML = "";

    // extract id name
    const tabClicked = tab.id;

    // extract data and insert into element
    fetchedData.forEach((item) => {
      const timeFrameSelected = item.timeframes[tabClicked];
      cards.innerHTML += `<div class="card ${item.title.toLowerCase() === "self care" ? "self-care" : item.title.toLowerCase()}">
          <div class="category">
            <img src="/images/icon-ellipsis.svg" alt="More options" />
            <h2>${item.title}</h2>
          </div>
          <div class="time">
            <span class="current">${timeFrameSelected.current}${
        timeFrameSelected.current === 1 ? "hr" : "hrs"
      }</span>
            <span class="previous">Last ${tabClicked === "daily" ? "Day" : tabClicked === "weekly" ? "Week" : "Month"} - ${timeFrameSelected.previous}${
        timeFrameSelected.previous === 1 ? "hr" : "hrs"
      }</span>
          </div>
        </div>`;
    });
  });
});
