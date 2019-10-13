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
        btnCreate.addEventListener('click', () => {
            var allInputCheck = document.querySelectorAll('.input-check'),
                countInputChecked = 0,
                object = {};

            allInputCheck.forEach(input => {
                if (!input.value) console.warn('Поле свойства объекта не может быть пустым!!!')
                else input.classList.add('input-checked')
                // console.log(input.value)
            });

            allInputCheck.forEach(input => {
                if (input.classList.contains('input-checked')) countInputChecked++
            });

            if (allInputCheck.length == countInputChecked) {
                let allInputValue = document.querySelectorAll('.input-value');

                for (let i = 0; i < allInputValue.length; i++) {
                    debugger
                    object[allInputCheck[i].value] = allInputValue[i].value
                }

                fetch('https://my-json-server.typicode.com/typicode/demo/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(object)
                }).then(() => console.log('Данные успешно отправлены на демо-сервер'))
                    .catch(() => console.error('В данный момент демо-сервер не доступен!!'));
            }
        })
        btnRemove.addEventListener('click', () => {
            let cardItems = document.getElementsByClassName('card-item');

            if (cardItems.length > 3) removeCardItem(btnRemove)
        })
        btnAdd.addEventListener('click', () => {
            let cardItems = document.querySelectorAll('.card-item'),
                countCardItems = cardItems.length;

            addCardItem(btnRemove, countCardItems);
        })
    }

    function removeCardItem(btnRemove) {
        let form = document.querySelector('.card-items form'),
            lastChildForm = form.lastChild;
        
        form.removeChild(lastChildForm);
        if (form.children.length == 3) btnRemove.style.opacity = 0
    }

    function addCardItem(btnRemove, countCardItems) {
        let cardItems = document.getElementsByClassName('card-item'),
            form = document.querySelector('.card-items form'),
            patternItem = `<div class="card-item row">
                                <div class="col-12 col-md-6 form-group bmd-form-group">
                                    <label class="bmd-label-floating">Свойство</label>
                                    <input class="form-control input-check" id="prop${countCardItems + 1}" type="text" />
                                </div>
                                <div class="col-12 col-md-6 form-group bmd-form-group">
                                    <label class="bmd-label-floating">Значение</label>
                                    <input class="form-control" id="value${countCardItems + 1}" type="text" />
                                </div>
                            </div>`

        form.insertAdjacentHTML('beforeend', patternItem);
        countCardItems = cardItems.length;
        btnRemove.style.opacity = 1;
    }

    function bindEventsTaskThree() {
        let _fetch = document.getElementById('fetch');

        _fetch.addEventListener('click', () => {
            fetch('http://localhost:8080/bd.json')
                .then(response => response.json())
                .then(result => transformToSet(result))
                .then(set => {
                    let _amount = countAmountAllItem(set);
                    let newSet = createNewSet(set, _amount);

                    return filterNewSet(newSet)
                })
                .then(_items => {
                    let setTransform = Array.from(_items);

                    console.table(setTransform)

                    createTable(setTransform)
                    // for (let [key, value] of _items.entries()) console.log(key);
                })
            
            function transformToSet(result) {
                let setItems = new Set(result['taskThree']);
                return setItems
            }

            function countAmountAllItem(items) {
                let amount = 0;
                items.forEach(item => {
                    amount += item['Трафик'];
                });
                return amount
            }

            function createNewSet(items, amount) {
                let newSet = new Set();
                items.forEach(item => {
                    newSet.add({
                        'Трафик': item['Трафик'],
                        '%': Math.ceil(item['Трафик'] / amount * 100)
                    })
                });
                return newSet
            }

            function filterNewSet(items) {
                items.forEach(item => {
                    if (item['%'] <= 2 ) items.delete(item)
                });
                return items
            }

            function createTable(array) {
                let tableBody = document.querySelector('.table tbody');
                    
                for (let i = 0; i < array.length; i++) {
                    let pattern = `<tr>
                                        <th scope="row">${i + 1}</th>
                                        <td>${array[i]["Трафик"]}</td>
                                        <td>${array[i]["%"]}</td>
                                    </tr>`;
                    tableBody.insertAdjacentHTML('beforeend', pattern);
                }

                document.querySelector('.table').style.opacity = 1;
            }
        });
    }
});