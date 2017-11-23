import React from 'react';
import PropTypes from 'prop-types';
/* Custom components */
import ChatBoxQuiz from './ChatBoxQuiz.js';
/* Data */
import MultiplicationTables from '../data/multiplication-tables.json';

class QuizMultiplications extends React.Component {

  constructor(props) {
    super(props);
  };

  initializeQuestion() {
    let $this = this;

    let tableIndex = Math.floor((Math.random() * 9) + 1);
    let question = this.pickRandomQuestion(MultiplicationTables[tableIndex]);
    let answer = MultiplicationTables[tableIndex][question];

    return {
      question: question,
      answer: answer
    };
  };

  pickRandomQuestion(obj) {
    let result;
    let count = 0;

    for (let prop in obj) {
      if (Math.random() < 1/++count) {
        result = prop;
      }
    }

    return result;
  };

  render() {
    return (
      <ChatBoxQuiz
        title="Quiz : tables de multiplication"
        timePerQuestion={this.props.timePerQuestion}
        initializeQuestion={this.initializeQuestion.bind(this)}
        rightAnswerTemplate="{currQuest} = {currQuestAnswer}"
      />
    );
  }
}

QuizMultiplications.propTypes = {
  timePerQuestion: PropTypes.number
};

QuizMultiplications.defaultProps = {
  timePerQuestion: 10
};

export default QuizMultiplications;
