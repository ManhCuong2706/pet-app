'use strict';

const $ = (e) => {
  return document.querySelector(e);
};

const $$ = (e) => {
  return document.querySelectorAll(e);
};

const submitBtn = $('#submit-btn');
const petID = $('#input-id');
const petName = $('#input-name');
const petAge = $('#input-age');
const petType = $('#input-type');
const petWeight = $('#input-weight');
const petLength = $('#input-length');
const petColor = $('#input-color-1');
const petBreed = $('#input-breed');
const vaccinatedInput = $('#input-vaccinated');
const dewormedInput = $('#input-dewormed');
const sterilizedInput = $('#input-sterilized');
const tbBodyElm = $('#tbody');
const deletePetBtn = $('.delete-pet');

const petData = {};
const petDataList = [];

// Get pet data
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

// Validate function
function validateForm() {
  let checked = true;
  for (let i = 0; i < petDataList.length; i++) {
    if (petDataList[i].id === petID.value) {
      alert('ID must unique!');
      checked = false;
      break;
    }
  }

  if (!petID.value) {
    alert(`Please enter ID!`);
    checked = false;
  }
  if (!petName.value) {
    alert(`Please enter name!`);
    checked = false;
  }
  if (!petAge.value) {
    alert(`Please enter age!`);
    checked = false;
  } else if (petAge.value < 1 || petAge.value > 15) {
    alert(`Age must be between 1 and 15'`);
    checked = false;
  } else if (!petWeight.value) {
    alert(`Please enter weight!`);
    checked = false;
  } else if (petWeight.value > 15 || petWeight.value < 1) {
    alert(`Weight must be between 1 and 15`);
    checked = false;
  }
  if (!petLength.value) {
    alert(`Please enter length!`);
    checked = false;
  }
  if (petLength.value > 100 || petLength.value < 1) {
    alert(`Length must be between 1 and 100`);
    checked = false;
  }
  if (!petColor.value) {
    alert(`Please enter color!`);
    checked = false;
  }
  if (petBreed.value === 'Select Breed' || petBreed.value === '') {
    alert(`Please select breed!`);
    checked = false;
  }
  if (petType.value === 'Select Type' || petType.value === '') {
    alert(`Please select type!`);
    checked = false;
  }
  return checked;
}

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
                  <button
                  type="button" 
                  class="btn btn-danger "
                  onclick="deletePet(${petID.value})">
                    Delete
                  </button>
                </td>
    </tr>`;
  });
};

// Clear value function

const clearInput = () => {
  petID.value = '';
  petName.value = '';
  petAge.value = '';
  petType.value = 'Select Type';
  petWeight.value = '';
  petLength.value = '';
  petBreed.value = 'Select Breed';
  petColor.value = '#000000';
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

// Delete pet function

const deletePet = (id) => {
  if (confirm('Are you sure ?')) {
    petDataList.forEach((pet) => {
      petDataList.splice(pet.indexOf(id), 0);
    });
  }
};

// Submit pet to List
submitBtn.addEventListener('click', (e) => {
  if (validateForm()) {
    petDataList.push(getPetData());
    console.log(petDataList);
    tbBodyElm.innerHTML = render(petDataList).join('');
    clearInput();
  }
});
