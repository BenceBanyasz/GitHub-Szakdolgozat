const {By} = require('selenium-webdriver')
const elements = require('../selectors/main');

class Main {
    constructor(driver) {
        this.driver = driver;
    }
    
    get allButton(){
        return this.driver.findElement(By.xpath(elements.allButton))
    }

    get itemsClass(){
        let myList = this.driver.findElements(By.xpath(elements.itemsClass))    //undefined
        return myList
    }

    get itemsInCategory(){
        let perCategoryList = this.driver.findElements(By.xpath(elements.itemsInCategory))
        return perCategoryList
    }

    get actualButton(){
        return this.driver.findElement(By.xpath(elements.actualButton))
    }

    get totalAmountAndPrice(){
        return this.driver.findElement(By.className(elements.totalAmountAndPrice))
    }

    get backButton(){
        return this.driver.findElement(By.className(elements.backButton))
    }

    get thanksMessage(){
        return this.driver.findElement(By.className(elements.thanksMessage))
    }


    async loadPage(url){
        await this.driver.get(url)
    }

    clickAllButton(){
        return this.allButton.click()
    }

    clickActualButton(string){
        return this.driver.findElement(By.xpath('//button[. = "'+ string +'"]')).click()
    }
    
    clickQuantitySelection(string){
        return this.driver.findElement(By.xpath('(//div[@class = "card-text bg-white p-1"])[' + string + ']/select')).click()
    }

    async quantityOptions(string){
        let options = await this.driver.findElement(By.xpath('(//select[@class = "form-control-inline float-right m-1 bg-info"])["' + string +  '"]')).getText()
        options = options.replace(/(\n)/gm,"")      //removing line breaks
        return parseInt(options)
    }

    async addOneFromAllItem(){
        let myList = await this.itemsInCategory
        let i
        for(i = 1; i < myList.length + 1; i++){
            await this.driver.findElement(By.xpath('(//div[@class = "card-text bg-white p-1"])[' + i + ']/button')).click();
        } 
    }

    async allItemsVisible(){
        let myList = await this.itemsClass
        let counter = myList.length
        return counter
    }

    async itemsDescription(){
        let myList = await this.itemsInCategory
        let i
        let textArray = new Array
        for(i = 1; i < myList.length + 1; i++){     //The list's indexing starts from 1 (MyList)
        let text = await this.driver.findElement(By.xpath('(//div[@class = "card-text bg-white p-1"])[' + i + ']')).getText();
        textArray.push(text)
        }
        return textArray
    }

    async totalAmount(){
        let quantityAndPrice = await this.totalAmountAndPrice.getText()
        let quantityAndPriceList = quantityAndPrice.split(',')
        quantityAndPriceList[1] = quantityAndPriceList[1].replace(/\D/g,'')     //Removing all characters except numbers
        quantityAndPriceList[1] = quantityAndPriceList[1].slice(0,quantityAndPriceList[1].length-2)     //Removing 2 characters because of decimals
        return parseInt(quantityAndPriceList[1])
    }

    async totalNumberOfItems(){
        let quantityAndPrice = await this.totalAmountAndPrice.getText()
        let quantityAndPriceList = quantityAndPrice.split(',')
        quantityAndPriceList[0] = quantityAndPriceList[0].replace(/\D/g,'')
        return parseInt(quantityAndPriceList[0])
    }

    async backButtonVisibility(){
        let visibility = await this.backButton.isDisplayed()
        return visibility
    }

    async thanksMessageVisibility(){
        let visibility = await this.thanksMessage.isDisplayed()
        let message = await this.thanksMessage.getText()
        let array = new Array(visibility,message)
        return array
        
    }

    async allButtonVisibility(){
        let visibility = await this.allButton.isDisplayed()
        return visibility
    }
}

module.exports = Main;