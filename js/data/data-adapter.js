import {ImgType, GameKind} from './game-data.js';


const AnswerSelector = {
  GAME_FIND: `.game__option`,
  GAME_PICK: `.game__answer input`
};


const getPickGameAnswers = (options) => {
  return options.map((it) => it.type);
};


const getFindGameAnswers = (options) => {
  const answer = options.reduce((accumulator, current, index) => {
    return Object.assign(accumulator, {
      [current.type]: {
        count: ((accumulator[current.type] || {}).count || 0) + 1,
        index
      }
    });
  }, {});
  return [Object.values(answer).find((i) => i.count === 1).index];
};


const adaptOptions = (serverAnswers) => {
  return serverAnswers.map((answer) => {
    return {
      image: {
        source: answer.image.url,
        size: {
          width: answer.image.width,
          height: answer.image.height
        }
      },
      type: ImgType[answer.type.toUpperCase()]
    };
  });
};


const adaptServerData = (data) => {
  return data.map((it) => {
    const options = adaptOptions(it.answers);
    const gameTypeOneOfThree = it.type === GameKind.ONE_OF_THREE;

    return {
      kind: it.type,
      task: it.question,
      options,
      answerSelector: gameTypeOneOfThree ? AnswerSelector.GAME_FIND : AnswerSelector.GAME_PICK,
      answers: gameTypeOneOfThree ? getFindGameAnswers(options) : getPickGameAnswers(options)
    };
  });
};


export {adaptServerData, AnswerSelector};
