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

})