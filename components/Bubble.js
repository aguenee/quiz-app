import React from 'react';
import PropTypes from 'prop-types';

const AVATAR_BOT = "https://robohash.org/9VK.png?set=set4";
const AVATAR_USER = "https://api.adorable.io/avatars/285/abcdef.png"

class Bubble extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'bubble bubble--' + (this.props.bot ? 'bot' : 'user')}>
        <img src={this.props.bot ? AVATAR_BOT : AVATAR_USER} alt="Bot" />
        {this.props.message}
      </div>
    );
  }
}

Bubble.propTypes = {
  bot: PropTypes.bool,
  message: PropTypes.object
};

Bubble.defaultProps = {
  bot: true,
  message: undefined
};

export default Bubble;
