import {adaptServerData, AnswerSelector} from './../data/data-adapter.js';
import {ImgType, GameKind} from './../data/game-data.js';
import {assert} from 'chai';


const serverData = [
  {
    answers: [
      {
        image: {
          width: 705,
          height: 455,
          url: `http://i.imgur.com/rY9u55S.jpg`
        },
        type: ImgType.PHOTO
      }
    ],
    question: `Угадай, фото или рисунок?`,
    type: GameKind.TINDER_LIKE
  },
  {
    answers: [
      {
        image: {
          width: 468,
          height: 458,
          url: `http://i.imgur.com/zHRZW1C.jpg`
        },
        type: ImgType.PHOTO
      },
      {
        image: {
          width: 468,
          height: 458,
          url: `https://k42.kn3.net/D660F0768.jpg`
        },
        type: ImgType.PAINT
      }
    ],
    question: `Угадайте для каждого изображения фото или рисунок?`,
    type: GameKind.TWO_OF_TWO
  },
  {
    answers: [
      {
        image: {
          width: 455,
          height: 304,
          url: `https://i.redd.it/bj70zjl196kx.jpg`
        },
        type: ImgType.PHOTO
      },
      {
        image: {
          width: 455,
          height: 304,
          url: `http://i.imgur.com/eSlWjE7.jpg`
        },
        type: ImgType.PHOTO
      },
      {
        image: {
          width: 455,
          height: 304,
          url: `https://k37.kn3.net/51254FE87.jpg`
        },
        type: ImgType.PAINTING
      }
    ],
    question: `Найдите рисунок среди изображений`,
    type: GameKind.ONE_OF_THREE
  }
];


const localData = [
  {
    kind: GameKind.TINDER_LIKE,
    task: `Угадай, фото или рисунок?`,
    options: [
      {
        image: {
          source: `http://i.imgur.com/rY9u55S.jpg`,
          size: {
            width: 705,
            height: 455
          }
        },
        type: ImgType.PHOTO
      }
    ],
    answerSelector: AnswerSelector.GAME_PICK,

    get answers() {
      return this.options.map((it) => it.type);
    }
  },
  {
    kind: GameKind.TWO_OF_TWO,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    options: [
      {
        image: {
          source: `http://i.imgur.com/zHRZW1C.jpg`,
          size: {
            width: 468,
            height: 458
          }
        },
        type: ImgType.PHOTO
      },
      {
        image: {
          source: `https://k42.kn3.net/D660F0768.jpg`,
          size: {
            width: 468,
            height: 458
          }
        },
        type: ImgType.PAINT
      }
    ],
    answerSelector: AnswerSelector.GAME_PICK,

    get answers() {
      return this.options.map((it) => it.type);
    }
  },
  {
    kind: GameKind.ONE_OF_THREE,
    task: `Найдите рисунок среди изображений`,
    options: [
      {
        image: {
          source: `https://i.redd.it/bj70zjl196kx.jpg`,
          size: {
            width: 455,
            height: 304
          }
        },
        type: ImgType.PHOTO
      },
      {
        image: {
          source: `http://i.imgur.com/eSlWjE7.jpg`,
          size: {
            width: 455,
            height: 304
          }
        },
        type: ImgType.PHOTO
      },
      {
        image: {
          source: `https://k37.kn3.net/51254FE87.jpg`,
          size: {
            width: 455,
            height: 304
          }
        },
        type: ImgType.PAINT
      }
    ],
    answerSelector: AnswerSelector.GAME_FIND,

    get answers() {
      return [this.options.slice().reduce((accumulator, current, index, array) => {
        return array.some((it, itIndex) => it.type === current.type && itIndex !== index) ? accumulator : index;
      }, 0)];
    }
  }
];


describe(`Adapt server data`, () => {

  it(`should have several format remote and local data`, () => {
    assert.deepEqual(localData, adaptServerData(serverData));
  });

});
