import {adaptServerData, GameKind, ImgType} from './../data/data-adapter.js';
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
        type: `photo`
      }
    ],
    question: `Угадай, фото или рисунок?`,
    type: `tinder-like`
  },
  {
    answers: [
      {
        image: {
          width: 468,
          height: 458,
          url: `http://i.imgur.com/zHRZW1C.jpg`
        },
        type: `photo`
      },
      {
        image: {
          width: 468,
          height: 458,
          url: `https://k42.kn3.net/D660F0768.jpg`
        },
        type: `painting`
      }
    ],
    question: `Угадайте для каждого изображения фото или рисунок?`,
    type: `two-of-two`
  },
  {
    answers: [
      {
        image: {
          width: 455,
          height: 304,
          url: `https://i.redd.it/bj70zjl196kx.jpg`
        },
        type: `photo`
      },
      {
        image: {
          width: 455,
          height: 304,
          url: `http://i.imgur.com/eSlWjE7.jpg`
        },
        type: `photo`
      },
      {
        image: {
          width: 455,
          height: 304,
          url: `https://k37.kn3.net/51254FE87.jpg`
        },
        type: `painting`
      }
    ],
    question: `Найдите рисунок среди изображений`,
    type: `one-of-three`
  }
];


const localData = [
  {
    kind: GameKind.PICK,
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
    answerSelector: `.game__answer input`,

    get answers() {
      return this.options.map((it) => it.type);
    }
  },
  {
    kind: GameKind.PICK,
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
    answerSelector: `.game__answer input`,

    get answers() {
      return this.options.map((it) => it.type);
    }
  },
  {
    kind: GameKind.FIND,
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
    answerSelector: `.game__option`,

    get answers() {
      return [this.options.map((it) => it.type).indexOf(ImgType.PAINT)];
    }
  }
];


describe(`Adapt server data`, () => {

  it(`should have several format remote and local data`, () => {
    assert.deepEqual(localData, adaptServerData(serverData));
  });

});
