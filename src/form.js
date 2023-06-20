'use strict';

const sliders = document.querySelectorAll('.msf-slider');
const slidersValues = document.querySelectorAll('.slider-value');

sliders.forEach((slider, ind) => {
 slider.addEventListener('input', function () {
  slidersValues[ind].textContent = slider.value;
 });
});

// Form progressing
const buttonsGroup = document.querySelectorAll('.btns-group');
addArrows();

const prevBtns = document.querySelectorAll('.msf-btn-prev');
const nextBtns = document.querySelectorAll('.msf-next-btn');
const formSteps = document.querySelectorAll('.form-step');
const progressSteps = document.querySelectorAll('.progress-step');
const progressBar = document.querySelector('#progress');
const formStepCounter = document.querySelectorAll('.form-step-counter');
const radioBtns = document.querySelectorAll('.radio-btn-input');

const radiobtnsGroup = groupBy(radioBtns, (btns) => btns.name);
//console.log(radioBtns);

//console.log(formSteps[1].childNodes[2]);

const changeRadiobuttonGroupstatus = function () {
 radiobtnsGroup.forEach((group) => {
  group[0] = true;
 });
};

//console.log(changeRadiobuttonGroupstatus())

let formStepsNum = 0;
updateFormStepCounter();
updateProgressbar();

radioBtns.forEach((radio) => {
 radio.addEventListener(
  'click',
  () => {
   if (radio.checked) {
    setTimeout(() => {
     //radioBtns.querySelector('.input').disabled = true;
     formStepsNum++;
     updateFormSteps();
     updateProgressbar();
     updateFormStepCounter();
     // radioBtns.querySelector('.input').disabled = false;
    }, 1000); //wait 2 seconds
   }
  },
  { once: true }
 );
});

nextBtns.forEach((btn) => {
 btn.addEventListener('click', () => {
  /*
  let childrenElement = formSteps[formStepsNum].children;
  console.log(formStepsNum+2);
  console.log(childrenElement);

  //console.log(childrenElement[3]);

  if (childrenElement[3].classList.contains("radio-btn")) {
   console.log("Itt egy radio btn");
  }
*/
  formStepsNum++;
  updateFormSteps();
  updateProgressbar();
  updateFormStepCounter();
 });
});

prevBtns.forEach((btn) => {
 btn.addEventListener('click', () => {
  formStepsNum--;
  updateFormSteps();
  updateProgressbar();
  updateFormStepCounter();
 });
});

function updateFormSteps() {
 formSteps.forEach((formStep) => {
  formStep.classList.contains('form-step-active') && formStep.classList.remove('form-step-active');
 });

 formSteps[formStepsNum].classList.add('form-step-active');
}

function updateProgressbar() {
 progressBar.style.width = (formStepsNum + 1) * (100 / formSteps.length) + '%';
}

function updateFormStepCounter() {
 formStepCounter[formStepsNum].innerText = `${formStepsNum + 1} / ${formSteps.length}`;
}

function addArrows() {
 const buttonPrev = `
  <a href="#" class="msf-btn-prev">
  <div class="arrow">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentcolor">
      <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
      <path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z" />
    </svg>
  </div>
  </a>
  `;
 const formsStepCounter = `<div class="form-step-counter"></div>`;

 const buttonNext = `
  <a href="#" class="msf-next-btn">
  <div class="arrow right">
    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px"
      viewBox="0 0 24 24" width="24px" fill="currentcolor">
      <g>
        <path d="M0,0h24v24H0V0z" fill="none" />
      </g>
      <g>
        <polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12" />
      </g>
    </svg>
  </div>
</a>
  `;
 buttonsGroup.forEach((group, ind) => {
  if (ind > 0 && ind < buttonsGroup.length - 1) {
   group.innerHTML = buttonPrev + formsStepCounter + buttonNext;
  }
 });
}

function groupBy(list, keyGetter) {
 const map = new Map();
 list.forEach((item) => {
  const key = keyGetter(item);
  const collection = map.get(key);
  if (!collection) {
   map.set(key, [false, item]);
  } else {
   collection.push(item);
  }
 });
 return map;
}
