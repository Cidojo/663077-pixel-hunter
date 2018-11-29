export const KIND = {
  PICK: `pick`,
  FIND: `find`
};

const quiz = {
  'game-1': {
    kind: KIND.PICK,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    options: new Set([
      {
        order: 1,
        source: `https://k42.kn3.net/CF42609C8.jpg`,
        type: `photo`
      },
      {
        order: 2,
        source: `http://i.imgur.com/1KegWPz.jpg`,
        type: `photo`
      }
    ]),
    answer: {
      selector: `.game__answer input`
    }
  },
  'game-2': {
    kind: KIND.PICK,
    task: `Угадай, фото или рисунок?`,
    options: new Set([
      {
        order: 1,
        source: `https://k42.kn3.net/CF42609C8.jpg`,
        type: `photo`
      }
    ]),
    answer: {
      selector: `.game__answer input`
    }
  },
  'game-3': {
    kind: KIND.PICK,
    task: `Найдите рисунок среди изображений`,
    options: new Set([
      {
        order: 1,
        source: `https://k42.kn3.net/CF42609C8.jpg`,
        type: `photo`
      },
      {
        order: 2,
        source: `http://i.imgur.com/1KegWPz.jpg`,
        type: `photo`
      },
      {
        order: 3,
        source: `http://i.imgur.com/DKR1HtB.jpg`,
        type: `photo`
      }
    ]),
    answer: {
      selector: `.game__option`
    }
  }
};

export {quiz};
