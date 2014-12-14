describe('Capture Photo', function() {

  it ('disables all filter and action buttons when open the page', function() {

    browser.get('http://localhost:3000')

    expect(element(by.id('clear_btn')).isEnabled()).toBeFalsy()
    expect(element(by.id('save_btn')).isEnabled()).toBeFalsy()
    expect(element(by.id('reset_btn')).isEnabled()).toBeFalsy()

    var anyEnabledFilterButtons = element.all(by.repeater('filter in filters')).reduce(function(acc, element) {
      return acc || element.isEnabled()
    })
    expect(anyEnabledFilterButtons).toBeFalsy()
    expect(element(by.id('result')).isDisplayed()).toBeFalsy()
  })

  it ('enables filters and action buttons when choose file', function() {

    browser.get('http://localhost:3000')

    element(by.css('input[type="file"]')).sendKeys(__dirname + '/sample.jpg')

    expect(element(by.id('clear_btn')).isEnabled()).toBeTruthy()
    expect(element(by.id('save_btn')).isEnabled()).toBeTruthy()
    expect(element(by.id('reset_btn')).isEnabled()).toBeTruthy()   

    var anyEnabledFilterButtons = element.all(by.repeater('filter in filters')).reduce(function(acc, element) {
      return acc || element.isEnabled()
    })
    expect(anyEnabledFilterButtons).toBeTruthy()
    expect(element(by.id('result')).isDisplayed()).toBeFalsy()

  })

  it ('clears canvas and disables all buttons after click on clear button', function() {

    browser.get('http://localhost:3000')

    element(by.css('input[type="file"]')).sendKeys(__dirname + '/sample.jpg')
    element(by.id('clear_btn')).click()

    expect(element(by.id('clear_btn')).isEnabled()).toBeFalsy()
    expect(element(by.id('save_btn')).isEnabled()).toBeFalsy()
    expect(element(by.id('reset_btn')).isEnabled()).toBeFalsy()

    var anyEnabledFilterButtons = element.all(by.repeater('filter in filters')).reduce(function(acc, element) {
      return acc || element.isEnabled()
    })
    expect(anyEnabledFilterButtons).toBeFalsy()
    expect(element(by.id('result')).isDisplayed()).toBeFalsy()

  })

})