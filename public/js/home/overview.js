import '@babel/polyfill';
import { timeline, user } from './views/base';

import { getIssues, getCategories } from './models/ImportIssuesList';
import { postComment, updateState } from './models/PostComment';

import * as TimelineView from './views/timelineView';
import { pieChart, graph } from './views/chartsView';

const state = {};

window.addEventListener('load', async (el) => {
  try {
    //1) Import
    await getIssues(state);
    await getCategories(state);
    console.log(state);

    //2) Create the timeline
    TimelineView.displayTimeline(state.issues);

    //3) Create the charts
    pieChart(state.issues);
    graph(state.issues, state.categories);
  } catch (err) {}
});

timeline.timelineSection.addEventListener('click', (e) => {
  let conId,
    container,
    commentData,
    cancelBtn,
    submitBtn,
    textArea,
    commentsContainer,
    commentsLength,
    contentContainer;

  if (e.target.matches('.add--comment')) {
    conId = e.target.parentNode.parentNode.parentNode.parentNode.dataset.id;
    container = timeline.timelineSection.querySelector(`[data-id="${conId}"]`);
    commentData = container.querySelector('.comment__data');
    commentsLength = container.querySelector('.comment--number');
    commentsContainer = timeline.timelineSection.querySelector(
      '.comment__container'
    );
    const username = user.userName.textContent.split(' ')[1];

    //Insert the text area
    TimelineView.textArea(state.issues, conId, commentData);

    //Remove the text area
    cancelBtn = container.querySelector('.comment__cancel');
    submitBtn = container.querySelector('.comment__submit');
    textArea = container.querySelector('.comment__edit--value');

    cancelBtn.addEventListener('click', () => {
      TimelineView.cancelArea(commentData, textArea.value);
    });
    submitBtn.addEventListener('click', () => {
      //POST the comment in the database
      postComment(textArea.value, conId);

      //Save comment in the state
      updateState(state.issues, conId, username, textArea);
      //Clear the text area
      TimelineView.clearArea(textArea);
      //Update the comment length
      TimelineView.commentLength(state.issues, conId, commentsLength);
    });
  }

  if (
    e.target.matches('.expand__comments') ||
    e.target.parentNode.matches('.expand__comments')
  ) {
    //Get the container id
    conId = e.target.parentNode.parentNode.dataset.id;
    if (!conId) conId = e.target.parentNode.parentNode.parentNode.dataset.id;
    container = timeline.timelineSection.querySelector(`[data-id="${conId}"]`);
    commentsContainer = container.querySelector('.comment__container');
    const expand = container.querySelector('#expand');
    submitBtn = container.querySelector('.comment__submit');

    if (expand.classList.contains('expand--symbol')) {
      //Display Comments
      TimelineView.showComments(state.issues, conId, commentsContainer, expand);
      //Update the UI when a new comment is added
      if (submitBtn) {
        submitBtn.addEventListener('click', () => {
          TimelineView.showComments(
            state.issues,
            conId,
            commentsContainer,
            expand
          );
        });
      }
    } else {
      //Hide the comments
      TimelineView.hideComments(commentsContainer, expand);
    }
  }

  if (
    e.target.matches('.timeline__date') ||
    e.target.parentNode.matches('.timeline__date')
  ) {
    conId = e.target.parentNode.dataset.date;
    if (!conId) conId = e.target.parentNode.parentNode.dataset.date;

    container = timeline.timelineSection.querySelector(
      `[data-date="${conId}"]`
    );
    const date = container.querySelector('.timeline__date');
    contentContainer = container.querySelectorAll('.expand');

    //Create a custom trigger
    let triger = false;
    contentContainer.forEach((el) => {
      if (el.classList.contains('timeline__content')) return (triger = true);
      triger = false;
    });
    if (triger) {
      //Hide the content
      TimelineView.hideContent(contentContainer, date);
    } else {
      //Show the content
      TimelineView.showContent(contentContainer, date);
    }
  }
});
