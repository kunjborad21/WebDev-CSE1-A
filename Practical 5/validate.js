const patterns = {
  name: /^[A-Za-z\s]{2,50}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  mobile: /^[6-9]\d{9}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};

function showError(inputElement, errorElementId, message) {
  const errorElement = document.getElementById(errorElementId);
  if (errorElement) {
    errorElement.textContent = message;
  }
  inputElement.classList.remove('input-success');
  inputElement.classList.add('input-error');
}

function showSuccess(inputElement, errorElementId) {
  const errorElement = document.getElementById(errorElementId);
  if (errorElement) {
    errorElement.textContent = '';
  }
  inputElement.classList.remove('input-error');
  inputElement.classList.add('input-success');
}

function validateName() {
  const nameInput = document.getElementById('name');
  if(!nameInput) return true;
  const value = nameInput.value.trim();
  if (value === '') {
    showError(nameInput, 'nameError', 'Name is required');
    return false;
  } else if (!patterns.name.test(value)) {
    showError(nameInput, 'nameError', 'Name must contain only letters and spaces (2-50 chars)');
    return false;
  }
  showSuccess(nameInput, 'nameError');
  return true;
}

function validateEmail() {
  const emailInput = document.getElementById('email');
  if(!emailInput) return true;
  const value = emailInput.value.trim();
  if (value === '') {
    showError(emailInput, 'emailError', 'Email is required');
    return false;
  } else if (!patterns.email.test(value)) {
    showError(emailInput, 'emailError', 'Please enter a valid email address');
    return false;
  }
  showSuccess(emailInput, 'emailError');
  return true;
}

function validateMobile() {
  const mobileInput = document.getElementById('mobile');
  if(!mobileInput) return true;
  const value = mobileInput.value.trim();
  if (value === '') {
    showError(mobileInput, 'mobileError', 'Mobile number is required');
    return false;
  } else if (!patterns.mobile.test(value)) {
    showError(mobileInput, 'mobileError', 'Please enter a valid 10-digit Indian mobile number');
    return false;
  }
  showSuccess(mobileInput, 'mobileError');
  return true;
}

function checkPasswordStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/\d/.test(password)) strength += 1;
  if (/[@$!%*?&]/.test(password)) strength += 1;
  return strength;
}

function validatePassword() {
  const pwdInput = document.getElementById('password');
  if(!pwdInput) return true;
  const value = pwdInput.value;
  
  // Update strength meter
  const strengthBar = document.getElementById('strengthBar');
  const strengthText = document.getElementById('strengthText');
  
  if (strengthBar && strengthText) {
    const strength = checkPasswordStrength(value);
    if (value.length === 0) {
      strengthBar.style.width = '0%';
      strengthText.textContent = '';
    } else if (strength < 3) {
      strengthBar.style.width = '33%';
      strengthBar.style.backgroundColor = '#dc3545'; // Weak (red)
      strengthText.textContent = 'Weak';
      strengthText.style.color = '#dc3545';
    } else if (strength < 5) {
      strengthBar.style.width = '66%';
      strengthBar.style.backgroundColor = '#ffc107'; // Medium (orange)
      strengthText.textContent = 'Medium';
      strengthText.style.color = '#ffc107';
    } else {
      strengthBar.style.width = '100%';
      strengthBar.style.backgroundColor = '#28a745'; // Strong (green)
      strengthText.textContent = 'Strong';
      strengthText.style.color = '#28a745';
    }
  }

  if (value === '') {
    showError(pwdInput, 'passwordError', 'Password is required');
    return false;
  } else if (!patterns.password.test(value)) {
    showError(pwdInput, 'passwordError', 'Min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char');
    return false;
  }
  showSuccess(pwdInput, 'passwordError');
  validateConfirmPassword(); // Re-check confirm password
  return true;
}

function validateConfirmPassword() {
  const confirmPwdInput = document.getElementById('confirmPassword');
  const pwdInput = document.getElementById('password');
  if(!confirmPwdInput || !pwdInput) return true;
  
  const value = confirmPwdInput.value;
  if (value === '') {
    showError(confirmPwdInput, 'confirmPasswordError', 'Confirm Password is required');
    return false;
  } else if (value !== pwdInput.value) {
    showError(confirmPwdInput, 'confirmPasswordError', 'Passwords do not match');
    return false;
  }
  showSuccess(confirmPwdInput, 'confirmPasswordError');
  return true;
}

function validateCourse() {
  const courseSelect = document.getElementById('course');
  if(!courseSelect) return true;
  if (courseSelect.value === '' || courseSelect.value === 'Select Course') {
    showError(courseSelect, 'courseError', 'Please select a course');
    return false;
  }
  showSuccess(courseSelect, 'courseError');
  return true;
}

function validateYear() {
  const yearSelect = document.getElementById('year');
  if(!yearSelect) return true;
  if (yearSelect.value === '' || yearSelect.value === 'Select Year') {
    showError(yearSelect, 'yearError', 'Please select a year');
    return false;
  }
  showSuccess(yearSelect, 'yearError');
  return true;
}

function validateGender() {
  const genders = document.getElementsByName('gender');
  if(!genders || genders.length === 0) return true;
  
  let checked = false;
  for (let i = 0; i < genders.length; i++) {
    if (genders[i].checked) {
      checked = true;
      break;
    }
  }
  const errorElement = document.getElementById('genderError');
  if (!checked) {
    if (errorElement) errorElement.textContent = 'Please select your gender';
    return false;
  }
  if (errorElement) errorElement.textContent = '';
  return true;
}

function validateTerms() {
  const termsInput = document.getElementById('terms');
  if(!termsInput) return true;
  if (!termsInput.checked) {
    const errorElement = document.getElementById('termsError');
    if (errorElement) errorElement.textContent = 'You must agree to the Terms and Conditions';
    return false;
  }
  const errorElement = document.getElementById('termsError');
  if (errorElement) errorElement.textContent = '';
  return true;
}

function validateLogin() {
  const emailValid = validateEmail();
  
  const pwdInput = document.getElementById('password');
  let pwdValid = true;
  if(pwdInput) {
    if (pwdInput.value === '') {
      showError(pwdInput, 'passwordError', 'Password is required');
      pwdValid = false;
    } else {
      showSuccess(pwdInput, 'passwordError');
    }
  }
  
  return emailValid && pwdValid;
}

document.addEventListener('DOMContentLoaded', () => {
  // Attach events for registration form
  const nameInput = document.getElementById('name');
  if (nameInput) nameInput.addEventListener('keyup', validateName);

  const emailInput = document.getElementById('email');
  if (emailInput) emailInput.addEventListener('keyup', validateEmail);

  const mobileInput = document.getElementById('mobile');
  if (mobileInput) mobileInput.addEventListener('keyup', validateMobile);

  const passwordInput = document.getElementById('password');
  if (passwordInput) passwordInput.addEventListener('keyup', validatePassword);

  const confirmPasswordInput = document.getElementById('confirmPassword');
  if (confirmPasswordInput) confirmPasswordInput.addEventListener('keyup', validateConfirmPassword);

  const courseSelect = document.getElementById('course');
  if (courseSelect) courseSelect.addEventListener('change', validateCourse);

  const yearSelect = document.getElementById('year');
  if (yearSelect) yearSelect.addEventListener('change', validateYear);

  const genders = document.getElementsByName('gender');
  if (genders) {
    genders.forEach(radio => {
      radio.addEventListener('change', validateGender);
    });
  }

  const termsInput = document.getElementById('terms');
  if (termsInput) termsInput.addEventListener('change', validateTerms);

  const regForm = document.getElementById('registrationForm');
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isMobileValid = validateMobile();
      const isPasswordValid = validatePassword();
      const isConfirmPasswordValid = validateConfirmPassword();
      const isCourseValid = validateCourse();
      const isYearValid = validateYear();
      const isGenderValid = validateGender();
      const isTermsValid = validateTerms();
      
      if (isNameValid && isEmailValid && isMobileValid && isPasswordValid && 
          isConfirmPasswordValid && isCourseValid && isYearValid && 
          isGenderValid && isTermsValid) {
        
        const successModal = document.getElementById('successModal');
        if (successModal) {
          successModal.style.display = 'block';
        } else {
          alert('Registration Successful!');
        }
        regForm.reset();
        
        // Reset styles
        document.querySelectorAll('.input-success, .input-error').forEach(el => {
          el.classList.remove('input-success', 'input-error');
        });
        const strengthBar = document.getElementById('strengthBar');
        if(strengthBar) strengthBar.style.width = '0%';
        const strengthText = document.getElementById('strengthText');
        if(strengthText) strengthText.textContent = '';
      } else {
        // Focus first invalid element
        const firstInvalid = document.querySelector('.input-error');
        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
    });
  }
  
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateLogin()) {
        const successModal = document.getElementById('successModal');
        if (successModal) {
          document.getElementById('modalMessage').textContent = 'Login Successful!';
          successModal.style.display = 'block';
        } else {
          alert('Login Successful!');
        }
        loginForm.reset();
      } else {
        const firstInvalid = document.querySelector('.input-error');
        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
    });
  }
});
