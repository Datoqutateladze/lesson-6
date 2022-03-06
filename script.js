// function davaleba() {

//     let requist = new XMLHttpRequest();

//     requist.addEventListener('load', function() {
//         let response = this.responseText;
//         let responseData = JSON.parse(response);
//         console.log(responseData);

//         let ul = document.createElement('ul');
//         var fragment = document.createDocumentFragment();
//         responseData.data.forEach(element => {
//             let li = document.createElement('li');
//             li.textContent = element.name + ' ' + element.year;

//             fragment.appendChild(li);

//         });
//         ul.appendChild(fragment);
//         document.getElementById('api').appendChild(ul);

//     });

//     requist.addEventListener('error', function() {
//         let p = document.createElement('p');
//         p.textContent = 'Error';

//         document.getElementById('api').appendChild(p);
//     })

//     requist.open('GET', 'https://reqres.in/api/unknown');

//     requist.send();
// }
// davaleba();


let currentPage = 1;
let totalPages;

function getUser(gverdi) {
    fetch('https://reqres.in/api/users?page=' + gverdi, {
        method: 'GET'
    })
    .then(function(response) {
        if (response.status !== 200) {
            throw 'error';
        }
        return response.json();
    })
    .then(function(responseData) {

        var fragment = document.createDocumentFragment();

        responseData.data.forEach(element => {
            let li = document.createElement('li');
            li.textContent = element.email + ' ' + element.first_name;

            fragment.appendChild(li);
        });
        document.getElementById('user-list').innerHTML = ' ';
        document.getElementById('user-list').appendChild(fragment);

        totalPages = responseData.total_pages;
    })
    .catch(function(error) {
       
        if (error == 404) {
            let p = document.createElement('p');
            p.textContent = 'Page not Found';

            document.getElementById('api').appendChild(p)
        } else {
            let p = document.createElement('p');
            p.textContent = 'Server Error';

            document.getElementById('api').appendChild(p)
        }

    })
}


document.getElementById('prev').addEventListener('click', function() {
    if (currentPage === 1){
        return;
    }
    currentPage -= 1;
    getUser(currentPage);
})


document.getElementById('next').addEventListener('click', function() {
    if(currentPage === totalPages){
        return;
    }
    currentPage += 1;
    getUser(currentPage);
})

getUser(currentPage);

