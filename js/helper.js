// convert data
const formatedData = (questionData) => {
  const result = questionData.map((item) => {
    const obj = { question: item.question };

    const index = Math.floor(Math.random() * 3);
    const answers = [...item.incorrect_answers];
    answers.splice(index, 0, item.correct_answer);

    obj.answers = answers;
    obj.correctIndex = index;

    return obj;
  });
  return result;
};

const getDataFromAnotherPage = (dataName) => {
  const data = JSON.parse(sessionStorage.getItem(dataName));
  sessionStorage.removeItem(dataName);
  return data;
};

export { formatedData, getDataFromAnotherPage };
