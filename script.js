class Shop{
    constructor(name, specialization, discount, reviews, image, link, rating, addresses) {
        this._name = name;
        this._specialization = specialization;
        this._discount = discount;
        this._reviews = reviews;
        this._image = image;
        this._link = link;
        this._rating = rating;
        this._addresses = addresses;
    }


    get addresses() {
        return this._addresses;
    }

    set addresses(value) {
        this._addresses = value;
    }

    get reviews() {
        return this._reviews;
    }

    set reviews(value) {
        this._reviews = value;
    }

    get image() {
        return this._image;
    }

    get link() {
        return this._link;
    }

    get rating() {
        return this._rating;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get specialization() {
        return this._specialization;
    }

    set specialization(value) {
        this._specialization = value;
    }

    get discount() {
        return this._discount;
    }

    set discount(value) {
        this._discount = value;
    }
}

const form = document.getElementById("form");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const patronymic = document.getElementById("patronymic");
const city = document.getElementById("city");
const creditCardNumber = document.getElementById("creditCardNumber");
const accountNumber = document.getElementById("accountNumber");
const shopChoice = document.getElementById("shopChoice");
const aboutUs = document.getElementById("aboutUs");
const content = document.getElementById("content");
const body = document.body

let errorForm = document.getElementById("error");
let errorText = document.getElementById("errorText");

const forms = [form, shopChoice, errorForm, aboutUs];

// Получение ссылки на элемент с классом spinner
let spinner = document.getElementById('spinner');
// Получение ссылки на элемент с классом spinner1
let spinner1 = document.getElementById('spinner1');

function closeOtherForms(currentForm){
    for (let i = 0; i < forms.length; i++) {
        if (forms[i] !== currentForm){
            forms[i].hidden = true;
        }
    }
    if (currentForm !== content){
        content.innerHTML = "";
        body.style.overflowY = 'hidden';
    }
}

function pickUpForm() {
    // closeOtherForms(form);

    if (form.hidden){
        if (localStorage["User"]) {
            const user = JSON.parse(localStorage["User"]);
            firstname.value = user.firstname;
            lastname.value = user.lastname;
            patronymic.value = user.patronymic;
            city.value = user.city;
            creditCardNumber.value = user.creditCardNumber;
            accountNumber.value = user.accountNumber;
        }
        form.hidden = !form.hidden;
        form.animate([
            {transform: 'translateY(-150%)'},
            {transform: 'translateY(5%)'},
            {transform: 'translateY(-5%)'},
            {transform: 'translateY(3%)'},
            {transform: 'translateY(-3%)'},
            {transform: 'translateY(1%)'},
            {transform: 'translateY(-1%)'},
            {transform: 'translateY(0)'}], 1000);
    }else {
        form.animate([
            {transform: 'translateY(0)'},
            {transform: 'translateY(-150%)'}], 125);
        setTimeout(function () {form.hidden = !form.hidden}, 125)
    }


}
function pickUpFormsButton() {
    // Показать спиннер
    spinner.classList.remove('d-none');

    // Скрыть спиннер через 1 секунду
    setTimeout(function() {
        spinner.classList.add('d-none');
        pickUpForm();
    }, 1000);


    // Получение данных из формы
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let patronymic = document.getElementById("patronymic").value;
    let city = document.getElementById("city").value;
    let creditCardNumber = document.getElementById("creditCardNumber").value;
    let accountNumber = document.getElementById("accountNumber").value;

    // Создание объекта с данными для отправки на сервер
    let userData = {
        firstname: firstname,
        lastname: lastname,
        patronymic: patronymic,
        city: city,
        creditCardNumber: creditCardNumber,
        accountNumber: accountNumber
    };

    // Сохранение данных в localStorage
    localStorage.setItem("User", JSON.stringify(userData));

    // Отправка данных на сервер
    fetch('add_user.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (response.ok) {
                // Данные успешно отправлены на сервер
                return response.json(); // Преобразование ответа в JSON
            } else {
                // Ошибка при отправке данных пользователя на сервер
                throw new Error(response.status);
            }
        })
        .then(data => {
            // Обработка данных полученных из PHP
            if (data.success) {
                // Данные успешно добавлены
                startError("Данные успешно добавлены");
            } else {
                // Возникла ошибка при добавлении данных
                startError(data.message);
            }
        })
        .catch(error => {
            // Ошибка при отправке запроса или ответ от сервера
            setTimeout(function() {
                // Скрыть спиннер через 1 секунду
                spinner.classList.add('d-none');
                // Отображение сообщения об ошибке после скрытия спиннера
                startError(error.message);
            }, 1000);
        });
}


function pickUpAboutUs() {
    closeOtherForms(aboutUs);
    if (aboutUs.hidden) {
        aboutUs.hidden = !aboutUs.hidden;
        aboutUs.animate([
            {transform: 'translateY(-150%)'},
            {transform: 'translateY(5%)'},
            {transform: 'translateY(-5%)'},
            {transform: 'translateY(3%)'},
            {transform: 'translateY(-3%)'},
            {transform: 'translateY(1%)'},
            {transform: 'translateY(-1%)'},
            {transform: 'translateY(0)'}], 1000);
        // body.style.overflowY = 'hidden';
    } else {
        aboutUs.animate([
            {transform: 'translateY(0)'},
            {transform: 'translateY(-150%)'}], 125);
        setTimeout(function () {aboutUs.hidden = !aboutUs.hidden}, 125)
    }
}

function pickUpShopChoice(){
    closeOtherForms(shopChoice);

    if (shopChoice.hidden){
        shopChoice.hidden = !shopChoice.hidden;
        shopChoice.animate([
            {transform: 'translateY(-150%)'},
            {transform: 'translateY(5%)'},
            {transform: 'translateY(-5%)'},
            {transform: 'translateY(3%)'},
            {transform: 'translateY(-3%)'},
            {transform: 'translateY(1%)'},
            {transform: 'translateY(-1%)'},
            {transform: 'translateY(0)'}], 1000);
        // body.style.overflowY = 'hidden';
    }else {
        shopChoice.animate([
            {transform: 'translateY(0)'},
            {transform: 'translateY(-150%)'}], 125);
        setTimeout(function () {shopChoice.hidden = !shopChoice.hidden}, 125)

    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function chooseShop() {
// Показать спиннер
    // Показать спиннер
    spinner1.classList.remove("d-none");

    // Пример задержки в 1 секунду для демонстрации спиннера
    await delay(1000);

    // Скрыть спиннер
    spinner1.classList.add("d-none");

    try {
        const specialization = document.getElementById("specialization").value;
        const discount = parseInt(document.getElementById("discountValue").innerText.slice(0, -1));
        const reviews = parseInt(document.getElementById("reviewValue").innerText);

        const isSameCity = document.getElementById("isSameCityYes").checked;
        const profileCity = JSON.parse(localStorage.getItem('User')).city;


        let url = `choose_shop.php?specialization=${specialization}&discount=${discount}&reviews=${reviews}`;

        if (isSameCity) {
            url += `&profileCity=${profileCity}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        const shops = data.map(item => {
            const parsedItem = JSON.parse(item);
            parsedItem.specialization = JSON.parse(parsedItem.specialization);
            parsedItem.addresses = JSON.parse(parsedItem.addresses);
            return parsedItem;
        });

        content.innerHTML = "";
        pickUpShopChoice();

        body.style.overflowY = 'scroll';

        for (let i = 0; i < shops.length; i++) {
            addCards(i);
        }

        if (!content.hasChildNodes()) {
            body.style.overflowY = 'hidden';
            startError("Не найдено магазинов!");
        }

        function addCards(i) {
            let shop = `
            <a href=` + shops[i].link + ` target="_blank">
                <div class="card">
                    <img src="` + shops[i].image + `" alt="">
                    <ul>
                        <center><li><strong>` + shops[i].name + `</strong></li></center>
                        <li>Товары: <ul id="specs" style="list-style: inside"></ul></li>
                        <li>Скидки: ` + shops[i].discount + `%</li>
                        <li>Отзывы: ` + shops[i].reviews + `</li>
                        <li>Рейтинг: ` + "★".repeat(shops[i].rating) + `</li>
                    </ul>
                    <ul>
                        <li>Города: <ul id="addresses" style="list-style: inside"></ul></li>
                    </ul>
                </div>
            </a>
        `;
            const myFragment = document.createRange().createContextualFragment(shop);
            let list = myFragment.getElementById("specs");
            for (let j = 0; j < shops[i].specialization.length; j++) {
                let point = `<li>` + shops[i].specialization[j] + `</li>`
                list.insertAdjacentHTML("beforeend", point)
            }
            let listAddresses = myFragment.getElementById("addresses");
            for (let j = 0; j < shops[i].addresses.length; j++) {
                if (j < 7) {
                    let point = `<li>` + shops[i].addresses[j] + `</li>`
                    listAddresses.insertAdjacentHTML("beforeend", point)
                } else {
                    let point = `<li> ... </li>`
                    listAddresses.insertAdjacentHTML("beforeend", point)
                    break
                }

            }
            content.appendChild(myFragment)
            let lastElementChild = content.lastElementChild;
            if (i % 2 === 0) {
                lastElementChild.animate([
                    {transform: 'translateX(-150%)'},
                    {transform: 'translateX(0)'}], 300)
            } else {
                lastElementChild.animate([
                    {transform: 'translateX(150%)'},
                    {transform: 'translateX(0)'}], 300)
            }
        }
    } catch (error){
        console.error('Ошибка при загрузке данных:', error);
    }

}

function startError(some_error) {
    // closeOtherForms(errorForm);
    errorText.innerText = some_error;
    errorForm.hidden = !errorForm.hidden;
    errorForm.animate([
        {transform: 'translateY(150%)'},
        {transform: 'translateY(0)'}
    ], 250);
}

function finishError(){
    closeOtherForms(errorForm);
    errorForm.animate([
        {transform: 'translateY(0)'},
        {transform: 'translateY(-150%)'}
    ], 125);
    setTimeout(function () {errorForm.hidden = !errorForm.hidden}, 125);
}

const button = document.getElementById("button");

creditCardNumber.addEventListener("keydown", function(e) {
    const txt = this.value;
    // prevent more than 12 characters, ignore the spacebar, allow the backspace
    if ((txt.length === 19 || e.which === 32) && e.which !== 8) e.preventDefault();
    // add spaces after 3 & 7 characters, allow the backspace
    if ((txt.length === 4 || txt.length === 9 || txt.length === 14) && e.which !== 8)
        this.value = this.value + " ";
});

accountNumber.addEventListener("keydown", function(e) {
    const txt = this.value;
    // prevent more than 12 characters, ignore the spacebar, allow the backspace
    if ((txt.length === 25 || e.which === 32) && e.which !== 8) e.preventDefault();
    // add spaces after 3 & 7 characters, allow the backspace
    if ((txt.length === 3 || txt.length === 6 || txt.length === 10 || txt.length === 12 || txt.length === 17) && e.which !== 8)
        this.value = this.value + " ";
});




