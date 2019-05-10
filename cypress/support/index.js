/// <reference types="cypress" />

// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your other test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/guides/configuration#section-global
// ***********************************************************

// Import commands.js and defaults.js
// using ES2015 syntax:
// import "./commands"
// import "./defaults"

// Alternatively you can use CommonJS syntax:
require('./commands')
require('./defaults')

// adjust Selector Playground preferences
const getParentLI = ($el) => {
  if (!$el.parent()) {
    return
  }

  if ($el.parent().prop('tagName') === 'LI') {
    return $el.parent()
  }

  if (!$el.parent().parent()) {
    return
  }

  if (
    $el
    .parent()
    .parent()
    .prop('tagName') === 'LI'
  ) {
    return $el.parent().parent()
  }
}

Cypress.SelectorPlayground.defaults({
  onElement ($el) {
    console.log('get selector for element', $el)

    if ($el.prop('tagName') === 'INPUT') {
      // input elements are probably a bad candidate for list
      // selection
      return
    }

    const $parentLi = getParentLI($el)

    if (!$parentLi) {
      // element is "regular" element, not part of the list
      // return defaultSelector($el)
      return
    }

    // the current element is part of the list!
    console.log('element is part of the list', $parentLi)

    // $parentLi points at the <li> elements
    // now we need a good selector for the list itself
    // which can be <ul>, <ol>, etc
    const $list = $parentLi.parent()

    if (!$list) {
      console.log('could not find parent of LI')

      return
    }

    if ($list.prop('class')) {
      const selector =
        $list.prop('tagName') +
        '.' +
        $list.prop('class') +
        ' > ' +
        $parentLi.prop('tagName')

      console.log('list item selector', selector)

      return selector
    }
  }
})
