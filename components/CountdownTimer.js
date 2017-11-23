import React from 'react';
import PropTypes from 'prop-types';

class CountdownTimer extends React.Component {

  constructor(props) {
    super(props);
  };

  initializeInterval(props) {
    this.setState({ secondsRemaining: props.duration });
    if (props.start) {
      this.start();
    }
  };

  componentWillMount() {
    this.initializeInterval(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stop) {
      this.stop();
    }

    if (nextProps.start) {
      clearInterval(this.interval);
      this.initializeInterval(nextProps);
    }
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  };

  tick() {
    this.setState({ secondsRemaining: this.state.secondsRemaining - 1 });

    if (this.state.secondsRemaining < 0) {
      clearInterval(this.interval);
      if (this.props.onTimeElapsed) {
        this.props.onTimeElapsed();
      }
    }
  };

  start() {
    let $this = this;
    this.interval = setInterval(function() { $this.tick(); }, 1000);
  };

  stop() {
    clearInterval(this.interval);
  };

  render() {
    return (
      <progress value={this.state.secondsRemaining} max={this.props.duration}>
        {this.state.secondsRemaining}
      </progress>
    );
  };
}

CountdownTimer.propTypes = {
  duration: PropTypes.number,
  onTimeElapsed: PropTypes.func,
  start: PropTypes.bool,
  stop: PropTypes.bool
};

CountdownTimer.defaultProps = {
  duration: 10,
  onTimeElapsed: undefined,
  start: false,
  stop: false
};

export default CountdownTimer;
