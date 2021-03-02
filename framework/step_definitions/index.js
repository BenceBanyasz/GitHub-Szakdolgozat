require('chromedriver');
const { Builder, By, until } = require('selenium-webdriver');
const { Given, When, Then, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('chai');
const Main = require('../../po/pages/main');
const urls = require('../data/urls');

let driver;
let main;

setDefaultTimeout(15000);

BeforeAll(async () => {
    driver = new Builder().forBrowser('chrome').build();
    main = new Main(driver);
    await driver.manage().window().maximize();
});

AfterAll(async () => {
    await driver.sleep(2000);
    await driver.quit();
});

    Given('the Local Website is open',async function () {
      await main.loadPage(urls.website);
    });

    When('the all button is clicked', function () {
      return main.clickAllButton();
    });

    Then('every item should be visible, {string} items',async function (string) {
        let result = await main.allItemsVisible()
        expect(result).to.equal(parseInt(string), 'The number of items in the All Category is incorrect! The expected number is: ' + string + ', but it is: ' + result + '.')

    });

    When('the {string} button is clicked', function (string) { 
        return main.clickActualButton(string)
    });

    Then('the items in the current category should contain {string} text',async function (string) {
        let resultArray = await main.itemsDescription()
        let i 
        for(i = 0; i < resultArray.length; i++){
          expect(resultArray[i]).to.contain(string, 'The ' + (i+1) + '. item in this category is incorrect, it does not contain ' + string + '!')
        }
    });

    When('the {string} quantity selection menu is clicked', function (string) {
      return main.clickQuantitySelection(string)
    });
        
    Then('the {string} quantity options should be visible',async function (string) {
      let options = await main.quantityOptions(string)
      expect(options).to.equal(123, 'The quantity options are incorrect at the ' + string + '. item.')
    });

    When('the Add To Cart button is clicked at every item in the All category',async function () {
      await main.addOneFromAllItem()
    });

    Then('the Total Amount should be {int}',async function (int) {
      let result = await main.totalAmount()
      expect(result).to.equal(int, 'The total price in the Cart is incorrect, it should be ' + int + ', but it is ' + result + '.')
    });

    Then('the number of Total Items should be {int}',async function (int) {
      let result = await main.totalNumberOfItems()
      expect(result).to.equal(int, 'The total quantity in the Cart is incorrect, it should be ' + int + ', but it is ' + result + '.')
    });

    Then('the Back button should be visible',async function () {
      let visibility = await main.backButtonVisibility()
      expect(visibility).to.be.true
    });

    Then('the message {string} should be visible',async function (string) {
      let visibility = await main.thanksMessageVisibility()
      expect(visibility[0]).to.be.true
      expect(visibility[1]).to.contain(string, 'The message is incorrect it should contain: ' + string + '.')
    });

    Then('All categories should be visible',async function () {
      let visibility = await main.allButtonVisibility()
      expect(visibility).to.be.true
    });