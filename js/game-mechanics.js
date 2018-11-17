// @param { _answers} nodelist of answers, consequence in pairs (like [photo, paint, photo, paint...])
// $return boolean if all answers has been recieved

const isAllAnswersRecieved = (_answers) => {
  let count = 0;
  let answersRecieved = 0;

  while (count <= _answers.length) {
    if (_answers.slice(count, count + 2).some((it) => it.checked)) {
      answersRecieved++;
    }
    count += 2;
  }

  return answersRecieved === _answers.length / 2 ? true : false;
};

export default isAllAnswersRecieved;
