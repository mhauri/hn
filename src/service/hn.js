import "unfetch";

const COMMENTS_LIMIT = 5;

const POSTS_URL = "https://api.hauri.dev/v1/hn/topstories";

const ITEM_URL = "https://api.hauri.dev/v1/hn/item";

export async function getPostIds() {
  const ids = await fetch(`${POSTS_URL}?api_key=${process.env.APIKEY}`).then((res) =>
    res.json()
  );
  return ids.map(function (item) {
    return item.id;
  });
}

export async function getPosts() {
  const data = await fetch(`${POSTS_URL}?api_key=${process.env.APIKEY}`)
    .then((res) => res.json())
    .catch(e => {
      console.error(e);
    });

  if (!data) return null;

  return data;
}

export async function getPostWithComments(id) {
  const data = await fetch(`${ITEM_URL}/${id}?api_key=${process.env.APIKEY}`)
    .then((res) => res.json())
    .catch(e => {
      console.error(e);
    });

  if (!data) return null;

  var comments = [];
  if (data.comments) {
    comments = data.comments.map((comment) => limitComments(comment)).filter(Boolean);
  }

  data.comments = comments;
  return data;
}

function limitComments(comment) {
  if (!comment || comment.level > COMMENTS_LIMIT || comment.deleted) return null;
  comment.comments = comment.comments.map(limitComments).filter(Boolean);
  return comment;
}
