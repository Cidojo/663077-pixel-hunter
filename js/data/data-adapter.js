import {ImgType} from './game-data.js';


const adaptServerData = (data) => {
  return data.map((it) => {
    switch (it.type) {
      case (`tinder-like`):
        return adaptTinderLike(it);
      case (`two-of-two`):
        return adaptTwoOfTwo(it);
      case (`one-of-three`):
        return adaptOneOfThree(it);
      default:
        return null;
    }
  });
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


const adaptTinderLike = (question) => {
  return {
    kind: question.type,
    task: question.question,
    options: adaptOptions(question.answers),
    answerSelector: `.game__answer input`,

    get answers() {
      return this.options.map((it) => it.type);
    }
  };
};


const adaptTwoOfTwo = (question) => {
  return {
    kind: question.type,
    task: question.question,
    options: adaptOptions(question.answers),
    answerSelector: `.game__answer input`,

    get answers() {
      return this.options.map((it) => it.type);
    }
  };
};


const adaptOneOfThree = (question) => {
  return {
    kind: question.type,
    task: question.question,
    options: adaptOptions(question.answers),
    answerSelector: `.game__option`,

    get answers() {
      return [this.options.slice().reduce((accumulator, current, index, array) => {
        return array.some((it, itIndex) => it.type === current.type && itIndex !== index) ? accumulator : index;
      }, 0)];
    }
  };
};


export {adaptServerData, ImgType};
