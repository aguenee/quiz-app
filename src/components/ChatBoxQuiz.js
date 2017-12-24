import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
/* Custom components */
import CountdownTimer from './CountdownTimer.js';
import Bubble from './Bubble.js';

const STATUS_NEW = "new";
const STATUS_CURRENT = "current";
const STATUS_ERROR = "error";
const STATUS_TIME_ELAPSED = "time-elapsed";
const STATUS_SUCCESS = "success";

class ChatBoxQuiz extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      history: [],
      timePerQuest: this.props.timePerQuestion,
      currQuest: "",
      currQuestAnswer: "",
      currQuestUserAnswer: "",
      currQuestStatus: STATUS_SUCCESS
    };

    this.handleChange = this.handleChange.bind(this);
  };

  componentWillMount() {
    let $this = this;
    setTimeout(function() {$this.startChat(); }, 1300);
    //this.initializeQuestion();
  };

  startChat() {
    let history = this.state.history;
    let $this = this;

    history.push(
      <Bubble
        key={new Date().getTime()}
        bot={true}
        message={
          <p>
            Chat-lut toi !
          </p>
        }
      />
    );
    this.setState({ history: history }, this.scrollToBottom);

    setTimeout(function() {
      history.push(
        <Bubble
          key={new Date().getTime()}
          bot={true}
          message={
            <p>
              Alors, comme ça, tu veux t'améliorer en calcul mental ?
            </p>
          }
        />
      );
      $this.setState({ history: history }, $this.scrollToBottom);

        setTimeout(function() {
          history.push(
            <Bubble
              key={new Date().getTime()}
              bot={true}
              message={
                <p>
                  Et bien tu as frappé à la bonne porte !&nbsp;&nbsp;😀<br />
                  Je vais t'interroger sur une opération (ex. : 2 x 3 ?) et tu auras {$this.props.timePerQuestion} secondes pour répondre.
                </p>
              }
            />
          );
          $this.setState({ history: history }, $this.scrollToBottom);

          setTimeout(function() {
            history.push(
              <Bubble
                key={new Date().getTime()}
                bot={true}
                message={
                  <p>Prêt ?</p>
                }
              />
            );
            $this.setState({ history: history }, $this.scrollToBottom);

            setTimeout(function() {
              history.push(
                <Bubble
                  key={new Date().getTime()}
                  bot={false}
                  message={
                    <p>
                      Je suis au taquet !&nbsp;&nbsp;😁
                      <a href="#" onClick={$this.goToNextQuestion.bind($this)} className="button button--next-question">
                        Vas-y balance !
                      </a>
                    </p>
                  }
                />
              );
              $this.setState({ history: history }, $this.scrollToBottom);

            }, 2000);

          }, 6500);

        }, 3100);

    }, 1700);


    //this.initializeQuestion();
  };

  triggerNextQuestion() {
    this.setState({currQuestStatus: STATUS_NEW}, this.initializeQuestion);
  };

  initializeQuestion() {
    let data = { question: "", answer: "" };
    let history = this.state.history;
    let $this = this;

    if (this.props.initializeQuestion) {
      data = this.props.initializeQuestion();
    };

    setTimeout(function() {
      history.push(
        <Bubble
          key={new Date().getTime()}
          bot={true}
          message={<p>{data.question} ?</p>}
        />
      );

      $this.setState({
        history: history,
        currQuest: data.question,
        currQuestAnswer: data.answer,
        currQuestUserAnswer: "",
        currQuestStatus: STATUS_CURRENT
      }, $this.scrollToBottom);
    }, 1000);
  };

  scrollToBottom() {
    let chatboxContent = document.getElementById("chatbox-content");
    if (chatboxContent) {
      let anchor = chatboxContent.lastChild;
      let topPos = anchor.offsetTop;
      chatboxContent.scrollTop = topPos;
    }

    let answerInput = document.getElementById("user-answer");
    if (answerInput) {
      answerInput.focus();
    }
  };

  handleChange(event) {
    this.setState({
      currQuestUserAnswer: event.target.value,
      currQuestStatus: STATUS_CURRENT
    });
  };

  handleKeyPress(event) {
    switch (event.key) {
      case "Enter":
        this.handleSubmit(event);
        break;
      default:
        break;
    };
  };

  handleSubmit(event) {
    event.preventDefault();
    if (event.target.value) {
      return this.submitAnswer(event.target.value);
    } else {
      let answerInput = document.getElementById("user-answer");
      return this.submitAnswer(answerInput.value);
    }
  };

  handleTimeElapsed() {
    let history = this.state.history;
    let answerMsg = this.props.rightAnswerTemplate ?
            this.props.rightAnswerTemplate
                .replace("{currQuest}", this.state.currQuest)
                .replace("{currQuestAnswer}", this.state.currQuestAnswer)
            : this.state.currQuest + " = " + this.state.currQuestAnswer;

    history.push(
      <Bubble
        key={new Date().getTime()}
        bot={true}
        message={
          <p>{answerMsg}&nbsp;&nbsp;😉</p>
        }
      />
    );

    this.setState({
      history: history,
      currQuestStatus: STATUS_TIME_ELAPSED
    }, this.scrollToBottom);

    history.push(
      <Bubble
        key={new Date().getTime()}
        bot={true}
        message={<p>Es-tu prêt pour le calcul suivant ?&nbsp;&nbsp;🙂</p>}
      />
    );

    let $this = this;
    setTimeout(function() { $this.setState({ history: history }, $this.scrollToBottom); }, 2300);

    setTimeout(function() {
      history.push(
        <Bubble
          key={new Date().getTime()}
          bot={false}
          message={
            <p>
              <a href="#" onClick={$this.goToNextQuestion.bind($this)} className="button button--next-question">
                  Carrément !&nbsp;&nbsp;💪
              </a>
            </p>
          }
        />
      );
      $this.setState({ history: history }, $this.scrollToBottom);
    }, 4000);
  };

  submitAnswer(value) {
    let isValid = this.checkAnswer(value);

    this.setState({ currQuestStatus: isValid ? STATUS_SUCCESS : STATUS_ERROR });

    if (isValid) {
      this.saveAnswer(value);
      this.triggerNextQuestion();
    }
  };

  saveAnswer(answer) {
    let history = this.state.history;

    history.push(
      <Bubble
        key={new Date().getTime()}
        bot={false}
        message={<p>{answer} !</p>}
      />
    );
    this.setState({ history: history }, this.scrollToBottom);
  };

  checkAnswer(value) {
    return value == this.state.currQuestAnswer;
  };

  goToNextQuestion(event) {
    event.preventDefault();
    if (!event.target.classList.contains("disabled")) {
      event.target.classList.add("disabled");
      this.triggerNextQuestion();
    };
  };

  render() {
    return (
      <form id="quiz-form" onSubmit={this.handleSubmit.bind(this)} className="chatbox">
        <fieldset>
          <legend>{this.props.title}</legend>

          <ReactCSSTransitionGroup
            id="chatbox-content"
            className="chatbox-content"
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {this.state.history}
          </ReactCSSTransitionGroup>

          <div className={"chatbox-answer chatbox-answer--" + this.state.currQuestStatus}>
            <input
              className="chatbox-input"
              id="user-answer"
              name="user-answer"
              type="text"
              placeholder="Ta réponse..."
              value={this.state.currQuestUserAnswer}
              onChange={this.handleChange.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
              disabled={this.state.currQuestStatus == STATUS_SUCCESS || this.state.currQuestStatus == STATUS_TIME_ELAPSED}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              autoFocus
            />

            <button type="submit">
              <i className="material-icons">{this.state.currQuestStatus == STATUS_ERROR ? "cancel" : "send"}</i>
            </button>
          </div>

          <CountdownTimer
            duration={this.state.timePerQuest}
            onTimeElapsed={this.handleTimeElapsed.bind(this)}
            start={this.state.currQuestStatus == STATUS_NEW}
            stop={this.state.currQuestStatus == STATUS_SUCCESS}
          />
        </fieldset>
      </form>
    );
  }
}

ChatBoxQuiz.propTypes = {
  timePerQuestion: PropTypes.number
};

ChatBoxQuiz.defaultProps = {
  timePerQuestion: 10
};

export default ChatBoxQuiz;
