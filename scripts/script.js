const toggleButton = document.querySelector('.nav-toggle');
const nav = document.querySelector('#nav');
const navItems = document.querySelectorAll('.nav-item');
const name = document.querySelector('#username');
const email = document.querySelector('#email');
const message = document.querySelector('#message');
const form = document.querySelector('form');
const messageError = document.querySelector('#message-error');
const emailError = document.querySelector('#email-error');
const nameError = document.querySelector('#username-error');
const submitButton = document.querySelector('#form-button');
const submitStateMessage = document.querySelector("#form-status");
const projectItems = document.querySelectorAll('.project-item');
let categories = [];
const filterContainer = document.querySelector('.filter-container');
const buttons = [];
const filterButton = document.querySelector('.filter-button');

function onFormSucess () {
  submitStateMessage.textContent = 'Thanks for reaching out! We have received your message and will get back to you';
  submitStateMessage.classList.remove('error-status-message');
  submitStateMessage.classList.add('success-message');
}

function onFormFailure (){
  submitStateMessage.textContent = 'Something went wrong on our end. Try again, or reach out directly using the links below.';
  submitStateMessage.classList.remove('success-message');
  submitStateMessage.classList.add('error-status-message');
}


function changeAttribute(navState) {
  toggleButton.setAttribute('aria-expanded', navState);
    if (navState) {
      toggleButton.setAttribute('aria-label', 'Close menu');
    } else {
      toggleButton.setAttribute('aria-label', 'Open menu');
    }
};

toggleButton.addEventListener("click", (event)=>{
    const isOpen = nav.classList.toggle('nav-style');
    navItems.forEach((item) => {
        item.classList.toggle('nav-item-style');
    });

    changeAttribute(isOpen)
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    nav.classList.remove('nav-style');
    navItems.forEach((navItem) => navItem.classList.remove('nav-item-style'));
    changeAttribute(false);
  });
});

function validate (tag, span) {
  if (tag.value.trim() === "") {
    span.classList.remove('error-message');
    return false
  } else {
    span.classList.add('error-message')
    return true
  }
};

function isEmail() {
  const emailValid = validate(email, emailError);
  const isEmailValid = email.checkValidity();

  if (!(emailValid)) {
    emailError.textContent = 'Email field can not be empty';
    return false
  } else if (emailValid && !(isEmailValid)) {
    emailError.textContent = 'You have to type a valid email';
    emailError.classList.remove('error-message');
    return false
  } else {
    emailError.classList.add('error-message');
    return true
  }
}

async function submitForm() {
  const formData = new FormData(form);
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      onFormSucess ()
      form.reset();
    } else {
      onFormFailure ()
    }
  } catch (error) {
    onFormFailure ()
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nameValid = validate(name, nameError);
  const messageValid = validate(message, messageError);
  const emailValid = isEmail()
  if (nameValid && messageValid && emailValid) {
    submitForm()
  } else {
    submitStateMessage.textContent = "" ;
    submitStateMessage.classList.remove('success-message', 'error-status-message');
  }
});

function getValues (item) {
  const data = item.dataset.category;
  const values = data.split(' ');
  return values
}

projectItems.forEach((item) => {
  const values = getValues (item);
  categories = [...new Set([...categories, ...values])];
});

categories.forEach((category) =>{
  const button = document.createElement('button');
  button.textContent = category;
  button.classList.add('filter-button')
  filterContainer.appendChild(button);
  buttons.push(button);
});

buttons.push(filterButton);
buttons.forEach((button) =>{
  button.addEventListener('click', (event) => {
    const buttonCategory = event.target.textContent;
    projectItems.forEach((item) => {
      const values = getValues (item);
      if (button == filterButton) {
        item.classList.remove('hidden');
      } else if(!(values.includes(buttonCategory))) {
        item.classList.add('hidden');
      } else {
        item.classList.remove('hidden');
      }
    });
  });
});
