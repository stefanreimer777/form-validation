'use strict';

const elements = {};

// Show red error outline and message
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
};

// Show green success outline
const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};

// Check if email is valid
const checkEmail = (input) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    console.log(input.value);
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
};

/*
 const checkPasswordReg1 = (input) => {
  const pass_reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;
   if (pass_reg.test(input.value.trim())) {
     showSuccess(input);
   } else {
     showError(input, 'Password is not valid');
   }
 };
 const checkPasswordReg2 = (input) => {
   const pass_reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;
   if (pass_reg.test(input.value.trim())) {
     showSuccess(input);
   } else {
     showError(input, 'Password is not valid');
   }
 };
*/

// Check array of required fields
const checkRequired = (inputArr) => {
  inputArr.forEach((input) => {
    //console.log(input.value);
    if (input.value.trim() === '') {
      //console.log(input.name);
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

// Check input length
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

// Check if passwords match
const checkPasswordsMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
};

// Get fieldname to Uppercase the first Letter
const getFieldName = (input) => {
  return input.name.charAt(0).toUpperCase() + input.name.slice(1);
};

const handleSubmit = (evt) => {
  // preventDefault() prevents page reload
  evt.preventDefault();

  //console.log(elements.username.value);

  checkRequired([
    elements.username,
    elements.email,
    elements.password,
    elements.password2,
  ]);
  checkLength(elements.username, 3, 15);
  checkLength(elements.password, 6, 25);
  checkEmail(elements.email);
  checkPasswordsMatch(elements.password, elements.password2);

  // Post form data in NodeJs backend
  fetch('/formPost', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      username: elements.username.value,
      email: elements.email.value,
      password: elements.password.value,
      password2: elements.password2.value,
    }),
  });
};

const domMapping = () => {
  elements.form = document.querySelector('form');
  elements.form.addEventListener('submit', handleSubmit);

  elements.username = document.querySelector('input[name="username"]');
  elements.email = document.querySelector('input[name="email"]');
  elements.password = document.querySelector('input[name="password"]');
  elements.password2 = document.querySelector('input[name="password2"]');
};

const init = () => {
  domMapping();
};

// INIT
document.addEventListener('DOMContentLoaded', init);
