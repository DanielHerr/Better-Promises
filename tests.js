"use strict"

test("any results", function(pass, fail) {
 Promise.any([
  new Promise(function(resolve) {
   setTimeout(resolve, 100)
  }), Promise.resolve("something")
 ]).then(function(result) {
  if(result == "something") {
   pass()
  } else {
   fail('result should be "something" but is ' + result)
} }) })

test("any errors", function(pass, fail) {
 Promise.any([
  new Promise(function(resolve, reject) {
   setTimeout(reject, 100, "something")
  }), Promise.reject("something")
 ]).then(function(result) {
  fail('result should reject but resolves with ' + result)
 }).catch(function(errors) {
   if(errors[0] == "something" && errors[1] == "something") {
    pass()
   } else {
    fail('results should be "something" but are ' + errors)
} }) })

test("any results and errors", function(pass, fail) {
 Promise.any([
  new Promise(function(resolve) {
   setTimeout(resolve, 100, "something")
  }), Promise.reject("something")
 ]).then(function(result) {
  if(result == "something") {
   pass()
  } else {
   fail('result should be "something" but is ' + result)
} }) })

test("some result properties", function(pass, fail) {
 Promise.some([
  new Promise(function(resolve) {
   setTimeout(resolve, 100, "something")
  }), Promise.reject("something")
 ]).then(function(result) {
  if(result.results && result.errors && result[0] && result[1]) {
   pass()
  } else {
   fail('result.keys() should be [ "results, "errors", "0", "1" ] but is' + result)
} }) })

test("some results", function(pass, fail) {
 Promise.some([
  new Promise(function(resolve) {
   setTimeout(resolve, 100, "something")
  }), Promise.resolve("something")
 ]).then(function({ results, errors }) {
  if(results[0] == "something" && results[1] == "something") {
   if(errors[0] == undefined && errors[1] == undefined) {
    pass()
   } else {
    fail('errors should be "undefined" but are ' + errors)
   }
  } else {
   fail('results should be "something" but are ' + results)
} }) })

test("some errors", function(pass, fail) {
 Promise.some([
  new Promise(function(resolve, reject) {
   setTimeout(reject, 100, "something")
  }), Promise.reject("something")
 ]).then(function(results) {
  fail('results should reject but resolve with ' + results)
 }).catch(function(errors) {
  if(errors[0] == "something" && errors[1] == "something") {
   pass()
  } else {
   fail('results should be "something" but are ' + errors)
} }) })

test("some results and errors", function(pass, fail) {
 Promise.some([
  new Promise(function(resolve) {
   setTimeout(resolve, 100, "something")
  }), Promise.reject("something")
 ]).then(function({ results, errors }) {
  if(results[0] == "something" && results[1] == undefined) {
   if(errors[0] == undefined && errors[1] == "something") {
    pass()
   } else {
    fail('errors should be "undefined" and "something" but are ' + errors)
   }
  } else {
   fail('results should be "something" and "undefined" but are ' + results)
} }) })