let posts = JSON.parse(localStorage.getItem("posts")) || [];

function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function timeAgo(time) {
  const now = new Date();
  const diff = (now - new Date(time)) / 1000;

  if (diff < 60) return "방금 전";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 172800) return "어제";
  return new Date(time).toLocaleDateString("ko-KR");
}

function renderPosts() {
  const list = document.getElementById("postList");
  list.innerHTML = "";

  // 고정된 글은 맨 위로 정렬
  const sortedPosts = [...posts].sort((a, b) => (b.pinned - a.pinned) || (new Date(b.time) - new Date(a.time)));

  sortedPosts.forEach((post, index) => {
    const div = document.createElement("div");
    div.className = "post" + (post.pinned ? " pinned" : "");
    const realIndex = posts.indexOf(post);

    div.innerHTML = `
      <div class="post-header">
        <span>${post.nickname || "익명"}</span>
        <span>${timeAgo(post.time)}</span>
      </div>
      <div class="post-content">${post.content}</div>
      <div class="post-actions">
        <button class="action-btn" onclick="likePost(${realIndex})">❤️ ${post.likes}</button>
        <button class="action-btn" onclick="togglePin(${realIndex})">${post.pinned ? "📍 고정 해제" : "📌 고정"}</button>
        <button class="action-btn" onclick="deletePost(${realIndex})">삭제</button>
      </div>
      <div class="comment-section" id="comments-${realIndex}">
        ${post.comments.map(c => `
          <div class="comment"><strong>${c.nickname || "익명"}</strong>: ${c.text} <small>${timeAgo(c.time)}</small></div>
        `).join("")}
        <div class="comment-input">
          <input id="comment-${realIndex}" placeholder="댓글을 입력하세요..." />
          <button onclick="addComment(${realIndex})">등록</button>
        </div>
      </div>
    `;
    list.appendChild(div);
  });
}

function addPost() {
  const content = document.getElementById("content").value.trim();
  const nickname = document.getElementById("nickname").value.trim();
  if (!content) return alert("내용을 입력해주세요!");

  posts.push({
    nickname: nickname || "익명",
    content,
    likes: 0,
    time: new Date(),
    comments: [],
    pinned: false
  });

  savePosts();
  renderPosts();
  document.getElementById("content").value = "";
  document.getElementById("nickname").value = "";
}

function addComment(index) {
  const input = document.getElementById(`comment-${index}`);
  const text = input.value.trim();
  if (!text) return;

  posts[index].comments.push({
    nickname: "익명",
    text,
    time: new Date()
  });

  savePosts();
  renderPosts();
}

function likePost(index) {
  posts[index].likes++;
  savePosts();
  renderPosts();
}

function deletePost(index) {
  if (confirm("정말 삭제하시겠습니까?")) {
    posts.splice(index, 1);
    savePosts();
    renderPosts();
  }
}

function togglePin(index) {
  posts[index].pinned = !posts[index].pinned;
  savePosts();
  renderPosts();
}

document.getElementById("postBtn").addEventListener("click", addPost);
renderPosts();
