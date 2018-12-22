import {ImgType, GameKind} from './game-data.js';


const AnswerSelector = {
  GAME_FIND: `.game__option`,
  GAME_PICK: `.game__answer input`
};


const getPickGameAnswers = (options) => {
  return options.map((it) => it.type);
};


const getFindGameAnswers = (options) => {
  return [options.reduce((accumulator, current, index, array) => {
    return array.some((it, itIndex) => it.type === current.type && itIndex !== index) ? accumulator : index;
  }, 0)];
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
    const isFindGame = it.type === GameKind.ONE_OF_THREE;

    return {
      kind: it.type,
      task: it.question,
      options,
      answerSelector: isFindGame ? AnswerSelector.GAME_FIND : AnswerSelector.GAME_PICK,
      answers: isFindGame ? getFindGameAnswers(options) : getPickGameAnswers(options)
    };
  });
};


export {adaptServerData, ImgType};
