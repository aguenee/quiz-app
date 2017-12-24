import React from 'react';
import PropTypes from 'prop-types';
/* Custom components */
import ChatBoxQuiz from './ChatBoxQuiz.js';


var operators = ['+', '-', 'x'];

var calculator = {
  '+': function(a, b) { return a + b; },
  '-': function(a, b) { return a - b; },
  'x': function(a, b) { return a * b; },
  '/': function(a, b) { return a / b; }
};

class QuizArithmetic extends React.Component {

  constructor(props) {
    super(props);
  };

  initializeQuestion() {
    let $this = this;

    let number1 = Math.floor((Math.random() * 10) + 1);
    let number2 = Math.floor((Math.random() * 10) + 1);
    let operator = operators[Math.floor(Math.random() * operators.length)];

    let question = number1 + ' ' + operator + ' ' + number2;
    let answer = calculator[operator](number1, number2);

    return {
      question: question,
      answer: answer
    };
  };

  render() {
    return (
      <ChatBoxQuiz
        title="Quiz : calcul mental"
        timePerQuestion={this.props.timePerQuestion}
        initializeQuestion={this.initializeQuestion.bind(this)}
        rightAnswerTemplate="{currQuest} = {currQuestAnswer}"
      />
    );
  }
}

QuizArithmetic.propTypes = {
  timePerQuestion: PropTypes.number
};

QuizArithmetic.defaultProps = {
  timePerQuestion: 10
};

export default QuizArithmetic;
