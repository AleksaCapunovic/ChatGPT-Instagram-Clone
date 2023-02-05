const form = document.querySelector('form');
const postText = document.querySelector('#post-text');
const postButton = document.querySelector('#post-button');
const postsContainer = document.querySelector('#posts');

// Load posts from local storage if available
const posts = JSON.parse(localStorage.getItem('posts')) || [];

posts.forEach(function(post) {
  addPost(post.text, post.likes);
});

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const post = {
    text: postText.value,
    likes: 0
  };

  posts.push(post);
  localStorage.setItem('posts', JSON.stringify(posts));

  addPost(post.text, post.likes);
});

function addPost(text, likes) {
  const post = document.createElement('div');
  post.classList.add('post');

  const postText = document.createElement('p');
  postText.textContent = text;

  const likeButton = document.createElement('button');
  likeButton.textContent = 'Like';
  likeButton.addEventListener('click', function() {
    post.likes += 1;
    likeCount.textContent = `${post.likes} likes`;
    localStorage.setItem('posts', JSON.stringify(posts));
  });

  const likeCount = document.createElement('p');
  likeCount.classList.add('likes');
  likeCount.textContent = `${likes} likes`;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function() {
    const index = posts.indexOf(post);
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    post.remove();
  });

  post.appendChild(postText);
  post.appendChild(likeButton);
  post.appendChild(likeCount);
  post.appendChild(deleteButton);

  postsContainer.appendChild(post);
}
