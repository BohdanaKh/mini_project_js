//     На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
//


let url = new URL(location.href);
let data = url.searchParams.get('data');
let post = JSON.parse(data);

let postsContainer = document.getElementById('postsContainer');

let postInfo = document.createElement('div');
postInfo.setAttribute('class','bigBlock');
let title = document.createElement('div');
title.setAttribute('id','posttarget1');
let id = document.createElement('div');
id.setAttribute('id','posttarget2');
let textBody = document.createElement('div');
textBody.setAttribute('id','posttarget3');
title.innerText = `${post.title}`;
id.innerText = `Post ID: ${post.id}  User ID: ${post.userId}`;
textBody.innerText = `${post.body}`;
postInfo.append(title,id,textBody);
postsContainer.appendChild(postInfo);



let postId = post.id;
let url3 = new URL('https://jsonplaceholder.typicode.com/posts/POST_ID/comments');
let url4 = url3.toString().replace('POST_ID', postId);
let newUrl1 = new URL(url4);

let commentsDiv = document.createElement('div');
commentsDiv.setAttribute('id','commentsDiv');
let titleDiv = document.createElement('h4');
titleDiv.setAttribute('id','titleDiv');
titleDiv.innerText='COMMENTS';
commentsDiv.appendChild(titleDiv);
fetch(newUrl1)
    .then(value => value.json())
    .then(comments => {
        for (const comment of comments) {
            let d1 = document.createElement('div');
            d1.setAttribute('class', 'itemCom')
            for (const key in comment) {
                let dIn = document.createElement('div');
                dIn.setAttribute('class','comment');
                dIn.innerText = `${key}: ${comment[key]}`;
                d1.append(dIn);
            }
            commentsDiv.append(d1);
        }
    })
postsContainer.appendChild(commentsDiv);