const cardSwiper = new Swiper(".card-swiper", {
  loop: true,
  slidesPerView: "auto",
  allowTouchMove: false,
  wrapperClass: "card-swiper-wrapper",
  effect: "fade",
  slideClass: "card-slide",
  navigation: {
    nextEl: ".card-button-next",
    prevEl: ".card-button-prev",
  },
});

function getItemsData() {
  let dates = JSON.parse(localStorage.getItem("Корзина"));
  if (dates == undefined) {
    dates = [];
  }
  return dates;
}

function checked() {
  let inputCheckeds = document.querySelectorAll("input:checked");
  inputCheckeds.forEach((input) => {
    input.checked = false;
  });
}
const numCount = document.getElementById("choice-count");
const plusBtn = document.getElementById("button-plus");
const minusBtn = document.getElementById("button-minus");
const choiceCost = document.getElementById("choice-cost");

const cost = choiceCost.textContent.slice(1, -3);
const currency = choiceCost.textContent.slice(0, 1);
function amount() {
  let counter = numCount.textContent;
  plusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    ++counter;
    numCount.textContent = counter;
    choiceCost.innerHTML = `$${numCount.textContent * cost}<span>.00 </span>`;
  });
  minusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (counter > 0) {
      --counter;
    } else {
      counter = counter;
    }
    numCount.textContent = counter;
    choiceCost.innerHTML = `$${numCount.textContent * cost}<span>.00 </span>`;
  });
  return [
    { Количество: counter },
    { Цена: numCount.textContent * cost + " " + currency },
  ];
}

amount();

const choiceOrder = document.getElementById("choice-order");

choiceOrder.addEventListener("click", () => {
  const dates = getItemsData();
  let cart = amount();

  const color = document.choiceColor.color;
  const size = document.choiceSize.size;

  if (color.value) {
    cart.push({ Цвет: color.value });
  } else alert("Выберете цвет");

  if (size.value) {
    cart.push({ Размер: size.value });
  } else alert("Выберете размер");

  cart.unshift({ Название: choiceTitle.textContent });
  cart.unshift({ id: new Date().getTime() });

  if (cart.length == 6) {
    dates.push(cart);
    localStorage.setItem("Корзина", JSON.stringify(dates));
    checked();
  }
});

const buttonPrev = document.querySelector(".card-button-prev");
const buttonNext = document.querySelector(".card-button-next");
const choiceTitle = document.querySelector(".choice__title");

const colorOne = document.querySelector(".choice-color__one");
const colorTwo = document.querySelector(".choice-color__two");
const colorThree = document.querySelector(".choice-color__three");

function colors(className, color) {
  className.classList.add(color);
  className.value = color;
}

buttonPrev.addEventListener("click", () => {
  checked();
  colorOne.classList.remove(
    "olive",
    "lime",
    "sandy",
    "violet",
    "blueshgray",
    "blue"
  );
  colorTwo.classList.remove(
    "olive",
    "lime",
    "sandy",
    "violet",
    "blueshgray",
    "blue"
  );
  colorThree.classList.remove(
    "olive",
    "lime",
    "sandy",
    "violet",
    "blueshgray",
    "blue"
  );
  if (cardSwiper.activeIndex == 0) {
    choiceTitle.textContent = "Lime jacket";
    colors(colorOne, "olive");
    colors(colorTwo, "lime");
    colors(colorThree, "sandy");
  }
  if (cardSwiper.activeIndex == 1) {
    choiceTitle.textContent = "Gussi light coat";
    colors(colorOne, "violet");
    colors(colorTwo, "blueshgray");
    colors(colorThree, "blue");
  }
  if (cardSwiper.activeIndex == 2) {
    choiceTitle.textContent = "Sandy longsleeve";
    colors(colorOne, "sandy");
    colors(colorTwo, "blueshgray");
    colors(colorThree, "olive");
  }
});

buttonNext.addEventListener("click", () => {
  checked();
  colorOne.classList.remove(
    "olive",
    "lime",
    "sandy",
    "violet",
    "blueshgray",
    "blue"
  );
  colorTwo.classList.remove(
    "olive",
    "lime",
    "sandy",
    "violet",
    "blueshgray",
    "blue"
  );
  colorThree.classList.remove(
    "olive",
    "lime",
    "sandy",
    "violet",
    "blueshgray",
    "blue"
  );

  if (cardSwiper.activeIndex == 3) {
    choiceTitle.textContent = "Lime jacket";
    colors(colorOne, "olive");
    colors(colorTwo, "lime");
    colors(colorThree, "sandy");
  }
  if (cardSwiper.activeIndex == 4) {
    choiceTitle.textContent = "Gussi light coat";
    colors(colorOne, "violet");
    colors(colorTwo, "blueshgray");
    colors(colorThree, "blue");
  }
  if (cardSwiper.activeIndex == 2) {
    choiceTitle.textContent = "Sandy longsleeve";
    colors(colorOne, "sandy");
    colors(colorTwo, "blueshgray");
    colors(colorThree, "olive");
  }
});

const accordion = document.querySelector(".choice-accordion");
const headers = accordion.querySelectorAll(".choice-accordion__header");
const texts = accordion.querySelectorAll(".choice-accordion__text");

accordion.addEventListener("click", transfigur);

function transfigur(e) {
  const targ = e.target;
  if (targ.tagName !== "H2") return;
  if (targ.classList.contains("open")) {
    closeText();
  } else {
    closeText();
    targ.classList.add("open");
    targ.nextElementSibling.style.height =
      targ.nextElementSibling.scrollHeight + "px";
  }
}
function closeText() {
  headers.forEach((header) => {
    header.classList.remove("open");
  });
  texts.forEach((text) => {
    text.style.height = "0";
  });
}

const feedback = document.querySelector(".feedback-consent");
const input = document.querySelector(".feedback-details__input");

feedback.addEventListener("click", () => {
  if (input.checked) {
    input.checked = false;
  } else {
    input.checked = true;
  }
});
