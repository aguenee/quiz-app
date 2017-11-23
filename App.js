import React from 'react';
import PropTypes from 'prop-types';
/* Custom components */
import QuizMultiplications from './components/QuizMultiplications.js';
/* Styles */
import styles from './css/styles.scss';

class App extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <QuizMultiplications timePerQuestion={10} />
    );
  }
}

App.propTypes = {};

App.defaultProps = {};

export default App;
