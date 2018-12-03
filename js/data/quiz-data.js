import {getRandomInteger} from './../utils.js';

export const GAME_KIND = {
  PICK: `pick`,
  FIND: `find`
};

const IMG_TYPE = {
  PHOTO: `photo`,
  PAINT: `paint`
};

const quiz = {
  'game-1': {
    kind: GAME_KIND.PICK,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    options: new Set([
      {
        source: `https://k42.kn3.net/CF42609C8.jpg`,
        type: IMG_TYPE.PHOTO
      },
      {
        source: `http://i.imgur.com/1KegWPz.jpg`,
        type: IMG_TYPE.PHOTO
      }
    ]),
    answerSelector: `.game__answer input`,

    get answers() {
      return [...this.options].map((it) => it.type);
    }
  },
  'game-2': {
    kind: GAME_KIND.PICK,
    task: `Угадай, фото или рисунок?`,
    options: new Set([
      {
        source: `https://k42.kn3.net/CF42609C8.jpg`,
        type: IMG_TYPE.PHOTO
      }
    ]),
    answerSelector: `.game__answer input`,

    get answers() {
      return [...this.options].map((it) => it.type);
    }
  },
  'game-3': {
    kind: GAME_KIND.FIND,
    task: `Найдите рисунок среди изображений`,
    options: new Set([
      {
        source: `https://k42.kn3.net/CF42609C8.jpg`,
        type: IMG_TYPE.PHOTO
      },
      {
        source: `http://i.imgur.com/1KegWPz.jpg`,
        type: IMG_TYPE.PAINT
      },
      {
        source: `http://i.imgur.com/DKR1HtB.jpg`,
        type: IMG_TYPE.PHOTO
      }
    ]),
    answerSelector: `.game__option`,

    get answers() {
      return [[...this.options].map((it) => it.type).indexOf(IMG_TYPE.PAINT)];
    }
  },

  get 'random'() {
    return this[`game-` + (1 + (getRandomInteger(Object.keys(quiz).length - 1)))];
  }
};

export {quiz};
