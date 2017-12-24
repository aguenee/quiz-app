import React from 'react';
import PropTypes from 'prop-types';
/* Custom components */
import QuizArithmetic from './components/QuizArithmetic.js';
/* Styles */
import styles from './css/styles.scss';

class App extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <QuizArithmetic timePerQuestion={10} />
    );
  }
}

App.propTypes = {};

App.defaultProps = {};

export default App;
