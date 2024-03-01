// Your code here
let popScore = 0;

window.onload = () => {

    const h1 = document.createElement('h1');
    const img = document.createElement('img');
    const newButton = document.createElement('button');
    const buttonDiv = document.createElement('div');
    const scoreDiv = document.createElement('div');
    const scoreSpan = document.createElement('span');
    const voteDiv = document.createElement('div');
    const upVoteButton = document.createElement('button');
    const downVoteButton = document.createElement('button');
    const commentDiv = document.createElement('div');
    const commentInput = document.createElement('input');
    const commentSubmitButton = document.createElement('button');
    const commentSection = document.createElement('div');

    newButton.textContent = 'Get a new cat picture!';
    newButton.value = 'new pic';

    scoreDiv.setAttribute('id', 'score-div');
    scoreSpan.innerHTML = `Popularity Score: <span id='popular-score'>${popScore}</span>`;

    upVoteButton.textContent = 'Upvote';
    upVoteButton.value = 'upvote';
    downVoteButton.textContent = 'Downvote';
    downVoteButton.value = 'downvote';

    commentDiv.innerHTML = 'Comment: '
    commentDiv.setAttribute('id', 'comment-div');
    commentInput.setAttribute('placeholder', 'Add a comment...');
    commentInput.setAttribute('id', 'comment-input');
    commentSubmitButton.textContent = 'Submit';
    commentSubmitButton.value = 'comment-submit';

    commentSection.setAttribute('id', 'comment-section');

    h1.innerHTML = 'Catstagram';
    img.setAttribute('id', 'cat-pic');
    addToImg(img);

    appendBody(h1);
    appendBody(buttonDiv);
    appendAny(buttonDiv, newButton);
    appendBody(img);
    appendBody(scoreDiv);
    appendAny(scoreDiv, scoreSpan);
    appendBody(voteDiv);
    appendAny(voteDiv, upVoteButton);
    appendAny(voteDiv, downVoteButton);
    appendBody(commentDiv);
    appendAny(commentDiv, commentInput);
    appendAny(commentDiv, commentSubmitButton);
    appendBody(commentSection);

    listener(newButton, 'click', handleButtonClick);
    listener(upVoteButton, 'click', handleButtonClick);
    listener(downVoteButton, 'click', handleButtonClick);
    listener(commentSubmitButton, 'click', handleButtonClick);
}

const getRandomCatPicture = async () => {
    const apiUrl = 'https://api.thecatapi.com/v1/images/search?size=small';

    const apiResponse = await fetch(apiUrl);

    const responseData = await apiResponse.json();

    return responseData;
}

const addToImg = img => {
    getRandomCatPicture().then(data => {
        img.setAttribute('src', data[0].url);
    }).catch(error => {
        console.log(error)
        img.setAttribute('src', 'https://placehold.co/600x400/png');
    });
}

const appendBody = toAppend => {
    document.body.appendChild(toAppend);
}

const appendAny = (appender, appendee) => {
    appender.appendChild(appendee);
}

const listener = (el, eventType, callback) => {
    el.addEventListener(eventType, callback);
}

const handleButtonClick = e => {
    e.preventDefault();
    const value = e.target.value;

    if(value === 'new pic') {
        const img = document.getElementById('cat-pic');

        addToImg(img);
        resetData();
    } else if(value === 'upvote') {
        popScore += 1;
    } else if(value === 'downvote') {
        popScore -= 1;
    } else if(value === 'comment-submit') {
        const commentInput = document.getElementById('comment-input');

        const commentSection = document.getElementById('comment-section');
        const newComment = document.createElement('p');

        newComment.innerText = `${new Date().toLocaleString()} - ${commentInput.value}`
        appendAny(commentSection, newComment);

        commentInput.value = '';
    }

    reRenderById('popular-score', popScore);
}

const reRenderById = (id, data) => {
    const el = document.getElementById(id);

    el.innerText = data;
}

const resetData = () => {
    popScore = 0;
    reRenderById('popular-score', popScore);

    const commentInput = document.getElementById('comment-input');
    const commentSection = document.getElementById('comment-section');

    commentInput.value = '';
    commentSection.innerHTML = '';
}
