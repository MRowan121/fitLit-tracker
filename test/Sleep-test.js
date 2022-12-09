const { expect } = require("chai");
const Sleep = require("../src/Sleep");

describe("Sleep", () => {
  let sleepEntry1;
  let sleepEntry2;
  let sleepEntry3;
  let sleepEntry4;
  let sleepEntry5;
  let sleepEntry6;
  let data;
  let sleep1;

  beforeEach(() => {
    sleepEntry1 = {
      userID: 1,
      date: "2019/06/15",
      hoursSlept: 6.1,
      sleepQuality: 2.2
      };
    sleepEntry2 = {
      userID: 2,
      date: "2019/06/15",
      hoursSlept: 7,
      sleepQuality: 4.7
      };
    sleepEntry3 = {
      userID: 1,
      date: "2019/06/16",
      hoursSlept: 4.1,
      sleepQuality: 3.8
      };
    sleepEntry4 = {
      userID: 1,
      date: "2019/06/17",
      hoursSlept: 8,
      sleepQuality: 2.6
      };
    sleepEntry5 = {
      userID: 1,
      date: "2019/06/18",
      hoursSlept: 10.4,
      sleepQuality: 3.1
      };
    sleepEntry6 = {
      userID: 1,
      date: "2019/06/19",
      hoursSlept: 10.7,
      sleepQuality: 1.2
      };
    data = [sleepEntry1, sleepEntry2, sleepEntry3, sleepEntry4, sleepEntry5, sleepEntry6]
    sleep1 = new Sleep(1, data)
  });

  it('should be a function', () => {
    expect(Sleep).to.be.a("function")
  });

  it("should be an instance of sleep", () => {
    expect(sleep1).to.be.an.instanceOf(Sleep)
  });

  it("should have a user id", () => {
    expect(sleep1.id).to.equal(1)
  });

  it("should have an array of sleep data", () => {
    expect(sleep1.sleepHistory).to.be.an("array")
  });

  it("should have a method that filters the sleep data by user id", () => {
    expect(sleep1.sleepHistory).to.deep.equal([sleepEntry1, sleepEntry3, sleepEntry4, sleepEntry5, sleepEntry6])
  });

  it('should have a method that returns the average hours slept per day', () => {
    expect(sleep1.calculateDailyAverage()).to.equal(7.9)
  });

  it('should have a method that returns the average sleep quality per day', () => {
    expect(sleep1.calculateDailyQuality()).to.equal(2.6)
  });

  it('should have a method that returns the hours slept for a single date', () => {
    expect(sleep1.totalDailyHours("2019/06/15")).to.equal(6.1)
  });

  it('should have a method that returns the sleep quality for a single date', () => {
    expect(sleep1.totalDailyQuality("2019/06/15")).to.equal(2.2)
  });

  it.skip('should have a method that returns the total hours slept each day over the course of a week', () => {
    expect(sleep1.totalWeeklyHours()).to.equal()
  });

  it.skip('should have a method that returns the total sleep quality each day over the course of a week', () => {
    expect(sleep1.totalWeeklyQuality()).to.equal()
  });

  it('should have a method that returns the average sleep quality across all users', () => {
    expect(sleep1.averageAllUsersQuality()).to.equal()
  });


})