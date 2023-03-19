import './main.scss';

/*

1. На широком экране 4 карточки. Потом 3, 2 и 1
2. Размер сдвига = 100% / кол-во карточек на экране из п.1
3. Нам известно кол-во карточек. Кликая на кнопки мы можем увеличивать переменную, умножать на размер сдвига и контролировать, когда сбросить ее в 0

*/
const BREAK_POINTS = {
  wide: 1,
  normal: 2,
  tablet: 3,
  mobile: 4,
}

const DIRECTIONS = {
  left: 1,
  right: 2,
}

const SLIDES_ON_SCREEN = {
  [BREAK_POINTS.wide]: 4,
  [BREAK_POINTS.normal]: 3,
  [BREAK_POINTS.tablet]: 2,
  [BREAK_POINTS.mobile]: 1,
}

let bp;

//на сколько слайдов уже листнули
let offset = 0;
function initBp() {
  const w = window.innerWidth;

 if (w > 1190) {
  bp = BREAK_POINTS.wide;
 } else if (w > 900) {
  bp = BREAK_POINTS.normal;
 } else if (w > 610) {
  bp = BREAK_POINTS.tablet;
 } else {
  bp = BREAK_POINTS.mobile;
 }
}

const slides = document.querySelectorAll('.carousel__item');
const carousel = document.querySelector('.carousel__content');
const leftArrow = document.querySelector('.arrow_left');
const rightArrow = document.querySelector('.arrow_right');

function handleSlide(direction) {

  return function() {
    if (direction === DIRECTIONS.left) {
      if (offset === 0) {
        offset = slides.length - SLIDES_ON_SCREEN[bp];  
      } else {
        offset -= 1;
      }
    } else {
      if (offset === slides.length - SLIDES_ON_SCREEN[bp]) {
        offset = 0;
      } else {
        offset += 1;
      }
    }
    setLeft();
  }
}


function setLeft() {
  const style = `left: calc(${offset} * (-300px))`; 
  carousel.setAttribute('style', style);
}

initBp();

leftArrow.addEventListener('click', handleSlide(DIRECTIONS.left));
rightArrow.addEventListener('click', handleSlide(DIRECTIONS.right));