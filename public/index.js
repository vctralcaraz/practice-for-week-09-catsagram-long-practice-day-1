// Your code here
let state = {}

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
    scoreSpan.innerHTML = `Popularity Score: <span id='popular-score'>${state.popScore}</span>`;

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

    retrieveFromLocalStorage();
    if(state.pic === "") {
        addToImg(img);
    }

    saveToLocalStorage();
}

const getRandomCatPicture = async () => {
    // console.log(state)
    const apiUrl = 'https://api.thecatapi.com/v1/images/search?size=small';

    const apiResponse = await fetch(apiUrl);

    const responseData = await apiResponse.json();

    return responseData;
}

const addToImg = img => {
    getRandomCatPicture().then(data => {
        state.pic = data[0].url;
        img.setAttribute('src', state.pic);
        saveToLocalStorage();
    }).catch(error => {
        console.log(error)
        state.pic = 'https://placehold.co/600x400/png';
        img.setAttribute('src', state.pic);
        saveToLocalStorage();
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
        state.popScore += 1;
    } else if(value === 'downvote') {
        state.popScore -= 1;
    } else if(value === 'comment-submit') {

        const commentInput = document.getElementById('comment-input');
        const newComment = `${new Date().toLocaleString()} - ${commentInput.value}`;
        state.comments.push(newComment);

        const commentSection = document.getElementById('comment-section');
        let commentP = document.createElement('p');
        commentP.innerText = newComment;
        appendAny(commentSection, commentP);

        commentInput.value = '';
        saveToLocalStorage();
    }

    reRenderById('popular-score', state.popScore);
    saveToLocalStorage();
}

const reRenderById = (id, data) => {
    const el = document.getElementById(id);

    el.innerText = data;
}

const resetData = () => {
    state.popScore = 0;
    reRenderById('popular-score', state.popScore);

    const img = document.getElementById('cat-pic');
    addToImg(img);

    state.comments.length = 0;

    const commentInput = document.getElementById('comment-input');
    const commentSection = document.getElementById('comment-section');

    commentInput.value = '';
    commentSection.innerHTML = '';
    saveToLocalStorage();
}

const saveToLocalStorage = () => {
    localStorage.setItem('myData', JSON.stringify(state));
}

const retrieveFromLocalStorage = () => {
    const myData = JSON.parse(localStorage.getItem('myData'));
    const img = document.getElementById('cat-pic');

    if(myData === null) {
        state = {
            popScore: 0,
            pic: '',
            comments: []
        }
    } else {
        state = myData;
    }
    reRenderById('popular-score', state.popScore);
    if(state.pic !== '') {
        img.setAttribute('src', state.pic);
    }
    if(state.comments.length > 0) {
        retrieveComments();
    }
}

const retrieveComments = () => {
    const commentSection = document.getElementById('comment-section');

    state.comments.forEach(comment => {
        let newComment = document.createElement('p');
        newComment.innerText = comment;
        appendAny(commentSection, newComment);
    });
}
