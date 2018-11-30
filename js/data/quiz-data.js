import {getRandomInteger} from './../utils.js';

export const GAME_KIND = {
  PICK: `pick`,
  FIND: `find`
};

const quiz = {
  'game-1': {
    kind: GAME_KIND.PICK,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    options: new Set([
      {
        source: `https://k42.kn3.net/CF42609C8.jpg`,
        type: `photo`
      },
      {
        source: `http://i.imgur.com/1KegWPz.jpg`,
        type: `photo`
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
        type: `photo`
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
        type: `photo`
      },
      {
        source: `http://i.imgur.com/1KegWPz.jpg`,
        type: `photo`
      },
      {
        source: `http://i.imgur.com/DKR1HtB.jpg`,
        type: `photo`
      }
    ]),
    answerSelector: `.game__option`,

    get answers() {
      return [...this.options].map((it) => it.type);
    }
  },

  get 'random'() {
    return this[`game-` + (1 + (getRandomInteger(Object.keys(quiz).length - 1)))];
  }
};

export {quiz};
