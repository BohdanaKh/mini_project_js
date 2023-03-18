// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули
//

let container = document.getElementById('usersContainer');
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        for (const user of users) {
            let div = document.createElement('div');
            div.setAttribute('class','item')
            div.innerHTML = `User: ${user.id}`  +'<br>'+'<br>'+ `${user.name}`;

            let a = document.createElement('a');
            a.innerText = 'show info';
            a.href = '../posts/user-details.html?data=' + JSON.stringify(user);

            div.appendChild(a);
            container.appendChild(div);
        }

    });