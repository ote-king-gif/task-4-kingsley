const form = document.getElementById('contactform');
const success = document.getElementById('successMessage');
const resetBtn = document.getElementById('resetBtn')
const successText = document.getElementById('successText');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm');
const termsInput = document.getElementById('terms');
const formContain = document.getElementById('formcontainer')


function validateName() {
    const value = nameInput.value.trim();
    
    if(value === '') return 'Please enter your name.';
    if(value.length < 2) return 'Your name should be at least 4 characters';
     if (!/^[A-Za-z\s'-]+$/.test(value)) return 'Name can only contain letters, spaces, hyphens and apostrophes.';
  return '';

}

function validateEmail() {
    const value = emailInput.value.trim();

    if(value === '') return 'Enter a valid email'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email like name@example.com.';
  return '';
}

function validatePhone(){
     const value = phoneInput.value.trim();

     if(value === '') return 'Please enter your phone number'

      const digits = value.replace(/[\s()+-]/g, ''); 

  if (!/^\d{10,15}$/.test(digits)) return 'Phone number must have 10 to 15 digits.';
  return '';
}

function validatePassword() {
  const value = passwordInput.value;             
  if (value === '') return 'Please create a password.';
  if (value.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Za-z]/.test(value)) return 'Password must include at least one letter.';
  if (!/\d/.test(value)) return 'Password must include at least one number.';
  return '';
}

function validateConfirm() {
  if (confirmInput.value === '') return 'Please confirm your password.';
  if (confirmInput.value !== passwordInput.value) return 'Passwords do not match.';
  return '';
}

function validateTerms() {
  if (!termsInput.checked) return 'You must accept the terms to continue.';
  return '';
}

const fields = [
  { input: nameInput,     validate: validateName },
  { input: emailInput,    validate: validateEmail },
  { input: phoneInput,    validate: validatePhone },
  { input: passwordInput, validate: validatePassword },
  { input: confirmInput,  validate: validateConfirm },
  { input: termsInput,    validate: validateTerms },
];

function showError(input, message) {
  document.getElementById(input.id + '-error').textContent = message;
  input.classList.add('invalid');
  input.classList.remove('valid');
}

function showValid(input) {
  document.getElementById(input.id + '-error').textContent = '';
  input.classList.remove('invalid');
  input.classList.toggle('valid', input.type !== 'checkbox' && input.value.trim() !== '');
}

function checkField(field) {
  const message = field.validate();
  if (message) {
    showError(field.input, message);
    return false;
  }
  showValid(field.input);
  return true;
}
fields.forEach((field) => {
  field.input.addEventListener('blur', () => checkField(field));

  const eventName = field.input.type === 'checkbox' ? 'change' : 'input';
  field.input.addEventListener(eventName, () => {
    if (field.input.classList.contains('invalid')) checkField(field);
  });
});
passwordInput.addEventListener('input', () => {
  if (confirmInput.value !== '') checkField(fields[4]);
});
form.addEventListener('submit', (e) => {
  e.preventDefault();

  let firstInvalid = null;
  fields.forEach((field) => {
    const ok = checkField(field);
    if (!ok && !firstInvalid) firstInvalid = field.input;
  });

  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }

  successText.textContent = 'Welcome, ' + nameInput.value.trim() + '!';
  form.hidden = true;
  success.hidden = false;
  resetBtn.focus();
});
resetBtn.addEventListener('click', () => {
  form.reset();
  fields.forEach((field) => {
    document.getElementById(field.input.id + '-error').textContent = '';
    field.input.classList.remove('invalid', 'valid');
  });
  success.hidden = true;
  form.hidden = false;
  nameInput.focus();
});