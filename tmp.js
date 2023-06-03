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
const shops = [
    new Shop("DNS", ["Комплектующие", "для стационарных ПК", "для ноутбуков", "Периферия", "Аксессуары"], 30, 890,"DNS.png", "https://www.dns-shop.ru/", 5, ["Казань", "Ижевск", "Альметьевск"]),
    new Shop("Ситилинк", ["Комплектующие", "для стационарных ПК", "для ноутбуков,", "Периферия", "Аксессуары"], 25, 700,"citilink.png", "https://www.citilink.ru/", 4, ["Казань", "Ижевск", "Альметьевск", "Нижний Новгород", "Мамадыш", "Севастополь", "Игра", "Москва", "Санкт-Петербург"]),
    new Shop("М.Видео", ["Периферия", "Аксессуары"], 15, 700,"mvideo.png", "https://www.mvideo.ru/?utm_source=yandex&utm_medium=cpc&utm_campaign=ipr_Kazan_Image_Name_Pure_search_desktop&utm_content=pid%7C21914395475_21914395475%7Ccid%7C54501802%7Cgid%7C4285490299%7Caid%7C9547801467%7Cpos%7Cpremium1%7Ckey%7Cmvideo%7Caddphrases%7Cno%7Cdvc%7Cdesktop%7Cregion%7C43%7Cregion_name%7CКазань%7Ccoef_goal%7C11820399%7Cdesktop&utm_term=mvideo&reff=yandex_cpc_ipr_Kazan_Image_Name_Pure_Search&_openstat=ZGlyZWN0LnlhbmRleC5ydTs1NDUwMTgwMjs5NTQ3ODAxNDY3O3lhbmRleC5ydTpwcmVtaXVt&yclid=11257096028205350911", 2, ["Ижевск", "Челябинск"]),
    new Shop("Parts direct", ["Комплектующие", "для стационарных ПК", "для ноутбуков", "для телефонов/планшетов"], 10, 300,"partsdirect.png", "https://kazan.partsdirect.ru/", 4, ["Казань", "Мамадыш"]),
]

function chooseShop(){
    content.innerHTML = "";
    pickUpShopChoice();
    let specialization = document.getElementById("specialization").value;
    let discountValue = document.getElementById("discountValue").innerText.slice(0, -1);
    let reviewValue = document.getElementById("reviewValue").innerText;
    let yes = document.getElementById("isSameCityYes").checked;
    let no = document.getElementById("isSameCityNo").checked;
    console.log(yes);
    console.log(no);

    body.style.overflowY = 'scroll';
    for (let i = 0; i < shops.length; i++) {
        if (no){
            addCards(i);
            console.log(shops[i].addresses)
        } else {
            let city = "";
            if (localStorage["User"]) {
                const user = JSON.parse(localStorage["User"]);
                city = user.city;
            }
            if (shops[i].addresses.includes(city)) addCards(i);
        }

    }
    if (!content.hasChildNodes()){
        body.style.overflowY = 'hidden';
        startError("Не найдено магазинов!");
    }
    function addCards(i){
        if (shops[i].specialization.includes(specialization) && discountValue <= shops[i].discount && reviewValue <= shops[i].reviews) {
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
                if (j < 7){
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
    }
}