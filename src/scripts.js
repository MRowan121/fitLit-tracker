import "./css/styles.css";
import UserRepository from "./UserRepository";
import Hydration from "./Hydration";
import Sleep from "./Sleep"
import User from "./User";
import apiCalls from "./apiCalls";
import Activity from "./Activity";
import { waterGraph, sleepGraph, weeklyActivityGraph } from "./graphs";

// Query Selectors

const greeting = document.querySelector(".greeting");
const address = document.querySelector(".address");
const email = document.querySelector(".email");
const stride = document.querySelector(".stride");
const goal = document.querySelector(".goal");
const average = document.querySelector(".average");
const ounces = document.querySelector(".ounces");
const dailyHours = document.querySelector(".daily-hours");
const dailyQuality = document.querySelector(".daily-quality");
const qualityAvg = document.querySelector(".quality");
const hoursAvg = document.querySelector(".hours");
const userMinutes = document.getElementById("minutes");
const userDistance = document.getElementById("distance");
const userSteps = document.getElementById("steps");
const userStairs = document.getElementById("stairs");
const allMinutes = document.getElementById("allMinutes");
const allDistance = document.getElementById("allDistance");
const allSteps = document.getElementById("allSteps");
const allStairs = document.getElementById("allStairs");
const dataForm = document.getElementsByName("newDataType");
const addDataBtn = document.querySelector(".add-data-btn");

//Global Variables
let allUserData = [];
let user;
let currentRepo;
let hydration;
let hydrationData;
let sleepData;
let userData;
let sleep;
let activity;
let activityData;


//Functions

apiCalls.fetchAllData().then((data) => {
  userData = data[0].userData;
  hydrationData = data[1].hydrationData;
  sleepData = data[2].sleepData;
  activityData = data[3].activityData;
  loadPageFunctions();
});

const loadPageFunctions = () => {
  makeUserInstances(userData);
  newRepo();
  getRandomUser();
  newHydration();
  newSleep();
  newActivity();
  greetUser();
  showUserInfo();
  showStepInfo();
  showAllTimeInfo();
  showTodayWater();
  showTodaySleep();
  showAverageActivity();
  showUserActivity();
  waterGraph(hydration.getWeeklyOunces());
  sleepGraph(
    sleep.totalWeekly(
      sleep.sleepHistory[sleep.sleepHistory.length - 1].date,
      "hoursSlept"
    ),
    sleep.totalWeekly(
      sleep.sleepHistory[sleep.sleepHistory.length - 1].date,
      "sleepQuality"
    )
  );
  weeklyActivityGraph(
    activity.getWeeklyData( 
      activity.activityHistory[activity.activityHistory.length - 1].date,
      "numSteps"
      ), 
      activity.getWeeklyData(
        activity.activityHistory[activity.activityHistory.length - 1].date,
        "minutesActive"
        ),
        activity.getWeeklyData(
          activity.activityHistory[activity.activityHistory.length - 1].date,
          "flightsOfStairs"
          )
          )
        };

// addDataBtn.addEventListener("click", doSomething)

// function doSomething() {
//   for(i = 0; i < dataForm.length; i++) {
//       if(dataForm[i].checked) {
//           console.log(dataForm[i].id)
//       }
//   }
// }
        
const makeUserInstances = (dataFile) => {
  dataFile.forEach((obj) => {
    let newUser = new User(obj);
    allUserData.push(newUser);
  });
};

const getRandomIndex = (array) => Math.floor(Math.random() * array.length);

const getRandomUser = () =>
  (user = currentRepo.userData[getRandomIndex(currentRepo.userData)]);

const newRepo = () => (currentRepo = new UserRepository(allUserData));

const newHydration = () => (hydration = new Hydration(user.id, hydrationData));

const newSleep = () => (sleep = new Sleep(user.id, sleepData));

const newActivity = () => (activity = new Activity(activityData, user))

const greetUser = () => (greeting.innerHTML = `Hi, ${user.findFirstName()}!`);

const showUserInfo = () => {
  address.innerText = `${user.address}`;
  email.innerText = `${user.email}`;
};

const showUserActivity = () => {
  userMinutes.innerText = `${activity.returnMinutesActive()}`;
  userDistance.innerText = `${activity.returnMilesWalked()}`;
  userSteps.innerText = `${activity.returnSteps()}`;
  userStairs.innerText = `${activity.returnStairs()}`;
};

const showAverageActivity = () => {
  allMinutes.innerText = `${activity.findAllUsersAvg("minutesActive")}`;
  //allDistance.innerText = `${activity.findAllUsersStairs()}`;
  allSteps.innerText = `${activity.findAllUsersAvg("numSteps")}`;
  allStairs.innerText = `${activity.findAllUsersAvg("flightsOfStairs")}`;
}

const showStepInfo = () => {
  stride.innerText = `${user.strideLength}`;
  goal.innerText = `${user.dailyStepGoal}`;
  average.innerText = `${currentRepo.findAverageStepGoal()}`;
};

const showTodayWater = () =>
  (ounces.innerText += `${hydration.getDailyOunces()}`);

const showTodaySleep = () => {
  const lastIndex = sleep.sleepHistory.length - 1;
  dailyHours.innerText = `${sleep.giveDaily(
    sleep.sleepHistory[lastIndex].date,
    "hoursSlept"
  )}`;
  dailyQuality.innerText = `${sleep.giveDaily(
    sleep.sleepHistory[lastIndex].date,
    "sleepQuality"
  )}`;
};

const showAllTimeInfo = () => {
  hoursAvg.innerText = `${sleep.calcDailyHrsAvg()}`;
  qualityAvg.innerText = `${sleep.calcDailyQualityAvg()}`;
};
