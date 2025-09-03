const webdriver = require('selenium-webdriver');
const chai = require('chai');  

describe('View Spec UI Test', async () => {

  it('should follow path of job spec to sharepoint from job roles page', async () => {

    var driver = new webdriver.Builder().
      withCapabilities(webdriver.Capabilities.chrome()).
      build();

      await driver.get(process.env.UI_TEST_URL);

      await driver.findElement(webdriver.By.id('jobRolesButton')).click()
      
      await driver.findElement(webdriver.By.id('name')).getText().then(function(value) {
        chai.assert.equal(value, 'Name')
      });
      await driver.findElement(webdriver.By.id('spec')).getText().then(function(value) {
        chai.assert.equal(value, 'Specification')
      });
      await driver.findElement(webdriver.By.id('viewButton')).getText().then(function(value){
        chai.assert.equal(value, 'View Details')
      });
      
      await driver.findElement(webdriver.By.id('viewButton')).click()

      await driver.findElement(webdriver.By.id('closeButton')).click()

      await driver.findElement(webdriver.By.id('viewButton')).click()
   
      await driver.findElement(webdriver.By.id('myModalLabel')).getText().then(function(value){
        chai.assert.include(value, 'Specification Summary')
      })

      await driver.findElement(webdriver.By.id('moreInfoButton')).click()

  await driver.quit();
});
});