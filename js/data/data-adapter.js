const GameKind = {
  PICK: `pick`,
  FIND: `find`
};


const ImgType = {
  PHOTO: `photo`,
  PAINT: `paint`,
  PAINTING: `paint`
};


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
    kind: GameKind.PICK,
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
    kind: GameKind.PICK,
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
    kind: GameKind.FIND,
    task: question.question,
    options: adaptOptions(question.answers),
    answerSelector: `.game__option`,

    get answers() {
      return [this.options.map((it) => it.type).indexOf(ImgType.PAINT)];
    }
  };
};


export {adaptServerData, GameKind, ImgType};
