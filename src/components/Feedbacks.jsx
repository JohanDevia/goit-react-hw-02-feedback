
import React, { Component } from 'react';
import { FeedbackContainer, FeedbackButton } from './Feedbacks.styled';

class Feedbacks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  }

  handleFeedbackClick = Feedback => {
    this.setState(prevState => ({
      [Feedback]: prevState[Feedback] + 1,
    }));
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    const totalFeedback = this.countTotalFeedback();
    if (totalFeedback === 0) {
      return 0;
    }
    return Math.round((good / totalFeedback) * 100);
  };

  render() {
    const totalFeedback = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();

    return (
      <FeedbackContainer>
        <h3>Please leave feedback</h3>
        <div>
          <FeedbackButton onClick={() => this.handleFeedbackClick('good')}>
            Good
          </FeedbackButton>
          <FeedbackButton onClick={() => this.handleFeedbackClick('neutral')}>
            Neutral
          </FeedbackButton>
          <FeedbackButton onClick={() => this.handleFeedbackClick('bad')}>
            Bad
          </FeedbackButton>
        </div>
        <div>
          {totalFeedback === 0 ? (
            <Notification message="There is no feedback" />
          ) : (
            <div>
              <h3>Statistic</h3>
              <p>·Good: {this.state.good}</p>
              <p>·Neutral: {this.state.neutral}</p>
              <p>·Bad: {this.state.bad}</p>
              <p>·Total: {totalFeedback}</p>
              <p>·Positive feedback: {positivePercentage}%</p>
            </div>
          )}
        </div>
      </FeedbackContainer>
    );
  }
}

const Notification = ({ message }) => <p>{message}</p>;

export default Feedbacks;
