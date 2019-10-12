document.addEventListener("DOMContentLoaded", function(event) { 
    var placeholder = document.querySelector('.placeholder');

    fetchRequest()

    function fetchRequest(hrefAnchor = '#taskOne') {
        fetch('/content.html')
            .then(response => response.text())
            .then(data => {
                let parser = new DOMParser();
                return parser.parseFromString(data, 'text/html');
            })
            .then((content) => {
                placeholder.append(content.querySelector(hrefAnchor));
            })
            .then(() => {
                if (hrefAnchor === '#taskOne') bindEventsTaskOne()
                else if (hrefAnchor === '#taskTwo') bindEventsTaskTwo()
                else if (hrefAnchor === '#taskThree') bindEventsTaskThree()
            })
    }


    document.querySelector('.nav').addEventListener('click', selectTask)

    function selectTask(event) {
        console.log(event)
        if (event.target.classList.contains('nav-link')) {
            event.preventDefault();
            placeholder.innerHTML = '';

            let hrefAnchor = event.target.getAttribute('href');

            fetchRequest(hrefAnchor)
        }
        
    }

    function bindEventsTaskOne() {
        let form = document.querySelector('form');

        form.addEventListener('focusin', event => {
            if (event.target.classList.contains('form-control'))
                event.target.closest('div.form-group').classList.add('is-focused')
        })
        form.addEventListener('focusout', event => {
            if (event.target.classList.contains('form-control') && !event.target.value)
                event.target.closest('div.form-group').classList.remove('is-focused')
        })

        form.addEventListener('click', event => {
            let name = form.querySelector('#name').value,
                pass = form.querySelector('#pass').value;

            if (event.target.id === 'send' && name && pass) {
                event.preventDefault();
                sendAjaxRequest(name, pass);
            } else if (event.target.id === 'send' && !name) {
                event.preventDefault();
                console.warn('Поле логина не может быть пустым!')
            } else if (event.target.id === 'send' && !pass) {
                event.preventDefault();
                console.warn('Поле пароля не может быть пустым!')
            }
        })
    }

    function sendAjaxRequest(name, pass) {
        

        fetch('bd.json')
            .then(response => {
                if (response.ok) return response.json()
                else if (response.status === 404) console.error(`Сервер временно не доступен! ${response.url} - не достежим`)
            })
            .then(data => {
                let valid, validName, validPass = false;
                    

                data['taskOne'].forEach(element => {
                    if (element['login'] === name && element['password'] === pass) valid = true
                    else if (element['login'] !== name && element['password'] === pass) validName = true
                    else if (element['login'] === name && element['password'] !== pass) validPass = true
                });
                return { valid, validName, validPass }
            })
            .then(({ valid, validName, validPass}) => {
                if (valid) console.log('Авторизация прошла успешно!');
                else if (validName) console.warn('Пользователя с таким логином не существует!');
                else if (validPass) console.warn('Проверьте правильность пароля!');
                else console.warn('Пользователь не найден!');
            })
            .finally(() => console.log('AJAX-запрос завершен!'))
    }

    function bindEventsTaskTwo() {


        let cardItems = document.querySelector('.card-items'),
            card = document.querySelector('.card'),
            btnRemove = document.querySelector('.btnRemove'),
            btnAdd = document.querySelector('.btnAdd'),
            btnCreate = document.querySelector('#create');

        btnRemove.style.opacity = 0;

        cardItems.addEventListener('focusin', event => {
            if (event.target.classList.contains('form-control'))
                event.target.closest('div.form-group').classList.add('is-focused')
        })
        cardItems.addEventListener('focusout', event => {
            if (event.target.classList.contains('form-control') && !event.target.value)
                event.target.closest('div.form-group').classList.remove('is-focused')
        })
        btnCreate.addEventListener('click', event => {
            
        })
        btnAdd.addEventListener('click', event => {
            addCardItem(btnRemove)
            
        })
    }

    function addCardItem(btnRemove) {
        let cardItems = document.querySelectorAll('.card-item')
        // console.log(cardItems.length)
        

        if (cardItems.length > 3) btnRemove.style.opacity = 1
        

    }


    function bindEventsTaskThree() {
        
        console.log('taskThree')
    }
    // placeholder.appendChild(CONTENT.querySelector('#taskOne'));
    // let form = document.querySelector('form');
    // form.addEventListener('focus', (event) => {
    //     console.log(event.target);
    // })
    // console.log(form)
    
});