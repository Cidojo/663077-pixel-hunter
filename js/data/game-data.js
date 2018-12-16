import {getRandomInteger} from './../utils.js';

const GameKind = {
  PICK: `pick`,
  FIND: `find`
};

const ImgType = {
  PHOTO: `photo`,
  PAINT: `paint`
};

const game = {
  'game-1': {
    kind: GameKind.PICK,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    options: [
      {
        image: {
          source: `https://k42.kn3.net/CF42609C8.jpg`,
          size: {
            width: 600,
            height: 831
          }
        },
        type: ImgType.PHOTO
      },
      {
        image: {
          source: `http://i.imgur.com/1KegWPz.jpg`,
          size: {
            width: 1080,
            height: 720
          }
        },
        type: ImgType.PHOTO
      }
    ],
    answerSelector: `.game__answer input`,

    get answers() {
      return this.options.map((it) => it.type);
    }
  },
  'game-2': {
    kind: GameKind.PICK,
    task: `Угадай, фото или рисунок?`,
    options: [
      {
        image: {
          source: `https://k42.kn3.net/CF42609C8.jpg`,
          size: {
            width: 600,
            height: 831
          }
        },
        type: ImgType.PHOTO
      }
    ],
    answerSelector: `.game__answer input`,

    get answers() {
      return this.options.map((it) => it.type);
    }
  },
  'game-3': {
    kind: GameKind.FIND,
    task: `Найдите рисунок среди изображений`,
    options: [
      {
        image: {
          source: `https://k42.kn3.net/CF42609C8.jpg`,
          size: {
            width: 600,
            height: 831
          }
        },
        type: ImgType.PHOTO
      },
      {
        image: {
          source: `http://i.imgur.com/1KegWPz.jpg`,
          size: {
            width: 1080,
            height: 720
          }
        },
        type: ImgType.PHOTO
      },
      {
        image: {
          source: `http://i.imgur.com/DKR1HtB.jpg`,
          size: {
            width: 1120,
            height: 2965
          }
        },
        type: ImgType.PAINT
      }
    ],
    answerSelector: `.game__option`,

    get answers() {
      return [this.options.map((it) => it.type).indexOf(ImgType.PAINT)];
    }
  },

  get 'random'() {
    return this[`game-` + (getRandomInteger(Object.keys(game).filter((it) => it.includes(`game-`)).length))];
  }
};

export {game, GameKind};
