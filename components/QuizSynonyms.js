import React from 'react';
import PropTypes from 'prop-types';
/* Custom components */
import ChatBoxQuiz from './ChatBoxQuiz.js';
/* Data */

class QuizSynonyms extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <ChatBoxQuiz
        title="Let's play with synonyms!"
        timePerQuestion={this.props.timePerQuestion}
        data={}
      />
    );
  }
}

QuizSynonyms.propTypes = {
  timePerQuestion: PropTypes.number
};

QuizSynonyms.defaultProps = {
  timePerQuestion: 10
};

export default QuizSynonyms;
