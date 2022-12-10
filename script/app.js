const products = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: './images/products/burger-1.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: './images/products/burger-2.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: './images/products/burger-3.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: './images/products/burger-4.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    }
}

const productBtn = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    closeBasketModal = document.querySelector('.wrapper__navbar-close'),
    basketChecklist = document.querySelector('.wrapper__navbar-checklist'),
    totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice'),
    basketBtnCount = document.querySelector('.wrapper__navbar-count'),
    btnCard = document.querySelector('.wrapper__navbar-bottom'),
    printBody = document.querySelector('.print__body'),
    printFooter = document.querySelector('.print__footer');


productBtn.forEach(btn => {
    btn.addEventListener('click', function () {
        plusOrMinus(this)
    })
})

function plusOrMinus(btn) {
    let parent = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id')
    products[parentId].amount++
    console.log(products);
    basket()
}

function basket() {
    const productsArray = []
    let totalCount = 0
    for (const key in products) {
        const po = products[key]
        const productsCard = document.querySelector(`#${key}`),
            parentIndecator = productsCard.querySelector('.wrapper__list-count')
        if (po.amount > 0) {
            productsArray.push(po)
            basketBtnCount.classList.add('active')
            totalCount += po.amount
            parentIndecator.classList.add('active')
            parentIndecator.innerHTML = po.amount
        } else {
            parentIndecator.classList.remove('active')
            parentIndecator.innerHTML = 0
        }
        basketBtnCount.innerHTML = totalCount
    }
    basketChecklist.innerHTML = ''
    for (let i = 0; i < productsArray.length; i++) {
        const el = productsArray[i];
        basketChecklist.innerHTML += cardItemBurger(productsArray[i])
    }
    totalPriceBasket.innerHTML = totalSummProduct()
}
basketBtn.addEventListener('click', function(){
    basketModal.classList.add('active')
})
function cardItemBurger(productDate) {
    const {name, totalSumm:price, amount, img} = productDate
    return `
    <div class="wrapper__navbar-product">
    <div class="wrapper__navbar-info">
        <img src="${img}" alt="" class="wrapper__navbar-productImg">
        <div class="wrapper__navbar-infoSub">
            <p class="wrapper__navbar-infoName">${name}</p>
            <p class="wrapper__navbar-infoPrice">${price}</p>
        </div>
    </div>
    <div class="wrapper__navbar-option" id="${name.toLowerCase()}__card">
        <button class="wrapper__navbar-symbol minus" data-symbol="-">-</button>
        <output class="wrapper__basket-count">${amount}</output>
        <button class="wrapper__navbar-symbol plus" data-symbol="+">+</button>
    </div>
    </div>
    `
}


closeBasketModal.addEventListener('click', function () {
    basketModal.classList.remove('active')
})


function totalSummProduct() {
    let total = 0
    for (const key in products) {
        total += products[key].totalSumm
    }
    return total
}

window.addEventListener('click', function(e) {
    const btn = e.target
    if (btn.classList.contains('wrapper__navbar-symbol')) {
        const attribute = btn.getAttribute('data-symbol'),
        parent = btn.closest('.wrapper__navbar-option')
        if (parent) {
            const idProduct = parent.getAttribute('id').split('_')[0]
            attribute == '+' ? products[idProduct].amount++ : products[idProduct].amount--
            basket()
        }
    }
})

btnCard.addEventListener('click', function() {
    printBody.innerHTML = ''
    for (const key in products) {
        const {name, totalSumm, amount} = products[key]
        if (amount > 0) {
            printBody.innerHTML += `
            <div class="print__item">
                <p class="print__name">
                    <span class="name">${name}</span>
                    <span class="count">${amount}</span>
                </p>
                <p class="print__summ">${totalSumm}</p>
            </div>`
        }
    }
    printFooter.innerHTML = totalSummProduct()
    window.print()
})

