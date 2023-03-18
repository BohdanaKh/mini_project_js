// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//     6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.
//

let url = new URL(location.href);
let json = url.searchParams.get('data');
let user = JSON.parse(json);
let container = document.getElementById('userPosts');
builder(user);

function builder(object) {

    for (let key in object) {
        let item = object[key];
        let userKey = document.createElement('div');
        userKey.setAttribute('class', 'userItem')
        let userInfo = document.createElement('div');
        userInfo.setAttribute('class', 'userItem')
        if (typeof item !== "object") {
            userKey.innerText = `${key}:`;
            userInfo.innerText = `${item}`;
            container.append(userKey, userInfo);

        } else {

            userKey.innerText = `${key}:`;

            for (let keyKey in item){
                if (typeof item[keyKey] !== "object") {
                    userInfo.innerHTML += `${keyKey}: ${item[keyKey]}`+'<br>';
                    container.append(userKey, userInfo);
                } else{
                    userInfo.innerHTML += `${keyKey}:`+'<br>';
                    for (const keyKeyKey in item[keyKey]) {
                        userInfo.innerHTML += `${keyKeyKey}: ${item[keyKey][keyKeyKey]}`+'<br>';
                        container.append(userInfo);
                    }}
            }
        }
    }
}

let button = document.getElementById('button');

let userId = user.id;
let url1 = new URL('https://jsonplaceholder.typicode.com/users/USER_ID/posts');

let url2 = url1.toString().replace('USER_ID', userId);
let newUrl = new URL(url2);

button.onclick =function (){ fetch(newUrl)
    .then(value => value.json())
    .then(posts => {
        let block = document.createElement('div');
        block.setAttribute('id','postsDiv');
        for (const post of posts) {
            let userPost = document.createElement('div');
            userPost.setAttribute('class','itemPost')

            let a = document.createElement('a');
            a.setAttribute('class','postTitle');
            a.innerHTML = `${post.id}` + '<br>'+  `${post.title}`;
            a.href = '../comments/post-details.html?data=' + JSON.stringify(post);

            userPost.appendChild(a);
            block.appendChild(userPost);
        }
        document.body.appendChild(block);

    })
    button.disabled = true;
};