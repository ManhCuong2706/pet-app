'use strict';

const getElmFunc = (e) => {
  return document.querySelector(e);
};

const submitBtn = getElmFunc('#submit-btn');
const petID = getElmFunc('#input-id');
const petName = getElmFunc('#input-name');
const petAge = getElmFunc('#input-age');
const petType = getElmFunc('#input-type');
const petWeight = getElmFunc('#input-weight');
const petLength = getElmFunc('#input-length');
const petColor = getElmFunc('#input-color');
const petBreed = getElmFunc('#input-breed');
const vaccinatedInput = getElmFunc('#input-vaccinated');
const dewormedInput = getElmFunc('#input-dewormed');
const sterilizedInput = getElmFunc('#input-sterilized');
const errorMessageElm = document.querySelectorAll('.error-message');
const tbBodyElm = getElmFunc('#tbody');

const selectorList = [
  '#input-id',
  '#input-name',
  '#input-age',
  '#input-type',
  '#input-weight',
  '#input-length',
  '#input-breed',
];

const petData = {};
const petDataList = [];

const getPetData = () => {
  return {
    id: petID.value,
    name: petName.value,
    age: parseInt(petAge.value),
    type: petType.value,
    weight: petWeight.value,
    length: petLength.value,
    color: petColor.value,
    breed: petBreed.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };
};
const showError = (selector, message) => {
  const index = selectorList.indexOf(selector);

  return (errorMessageElm[index].textContent = message);
};

const Validator = (selector) => {
  console.log(isRequired(selector), 'isRequired');
  console.log(isInRange(selector), 'isInRange');
  console.log(isUniqueID(selector), 'isUniqueID');
  console.log(hasSelected(selector), 'hasSelected');

  if (
    !isRequired(selector) &&
    isUniqueID(selector) &&
    isInRange(selector) &&
    hasSelected(selector)
  ) {
    return true;
  } else {
    return false;
  }
};
// isRequired function
const isRequired = (selector) => {
  if (selector !== '#input-breed' || selector !== '#input-type') {
    const value = getElmFunc(selector).value;
    if (!value) {
      showError(selector, 'Please input this field !');
      return false;
    }
  }
  return true;
};

// isUniqueID function
const isUniqueID = (selector) => {
  const petID = getElmFunc(selector).value;
  const petIndex = petDataList.findIndex((pet) => pet.id === petID);

  if (selector === '#input-id' && petIndex !== -1) {
    showError(selector, 'ID should be unique!');
    return false;
  }
  return true;
};
// IsAgeArrange function

const isAgeInRange = (selector) => {
  if (selector === '#input-age') {
    const age = parseInt(getElmFunc(selector).value);
    if (age < 1 || age > 15) showError(selector, 'Age must be between 1 and 15');
    return false;
  }
  return true;
};

const isWeightInRange = (selector) => {
  if (selector === '#input-weight') {
    const weight = parseInt(getElmFunc(selector).value);
    if (weight < 1 || weight > 15) showError(selector, 'Weight must be between 1 and 15');
    return false;
  }
  return true;
};

const isLengthInRange = (selector) => {
  if (selector === '#input-length') {
    const length = parseInt(getElmFunc(selector).value);
    if (length < 1 || length > 100) showError(selector, 'Length must be between 1 and 100');
    return false;
  }
  return true;
};

const isInRange = (selector) => {
  switch (selector) {
    case '#input-age':
      return isAgeInRange(selector);
    case '#input-weight':
      return isWeightInRange(selector);
    case '#input-length':
      return isLengthInRange(selector);
    default:
      return true;
  }
};
// hasSelected function

const hasTypeSelected = (selector) => {
  const type = getElmFunc(selector).value;
  if (selector === '#input-type' && !type.trim()) {
    showError(selector, 'Please select Type!');
    return false;
  }
  return true;
};

const hasBreedSelected = (selector) => {
  if (selector) {
    const breed = getElmFunc(selector).value;
    breed.trim() ? breed : showError(selector, 'Please select Breed!');
    return false;
  }
  return true;
};

const hasSelected = (selector) => {
  switch (selector) {
    case '#input-type':
      return hasTypeSelected(selector);
    case '#input-breed':
      return hasBreedSelected(selector);
    default:
      return true;
  }
};

// Render function
const render = (petDataList) => {
  return petDataList.map((pet) => {
    return `<tr>
                <th scope="row">${pet.id}</th>
                <td>${pet.name}</td>
                <td>${pet.age}</td>
                <td>${pet.type}</td>
                <td>${pet.weight}</td>
                <td>${pet.length}</td>
                <td>${pet.breed}</td>
                <td>
                  <i class="bi bi-square-fill" style="color:${pet.color}"></i>
                </td>
                <td><i class="bi ${pet.vaccinated ? 'bi-check-circle-fill' : ''} "></i></td>
                <td><i class="bi ${pet.dewormed ? 'bi-check-circle-fill' : ''}"></i></td>
                <td><i class="bi ${pet.sterilized ? 'bi-check-circle-fill' : ''}"></i></td>
                <td>${pet.date.toLocaleDateString('en-US')}</td>
                <td>
                  <button type="button" class="btn btn-danger">Delete</button>
                </td>
    </tr>`;
  });
};

submitBtn.addEventListener('click', (e) => {
  let result = false;
  selectorList.forEach((selector) => {
    if (Validator(selector)) {
      result = true;
    }
  });
  if (result) petDataList.push(getPetData());

  tbBodyElm.innerHTML = render(petDataList).join('');
});
