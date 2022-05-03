console.log('hi')

const washCarBtn = document.getElementById('wash_car_btn');
const washLawnBtn = document.getElementById('wash_lawn_btn');
const washWeedsBtn = document.getElementById('wash_weeds_btn');
const renderInformation = document.getElementById('render_information');
const totalPrice = document.getElementById("total_price");
const totalAmountDiv = document.querySelector('.total_amount');
const sendBtn = document.getElementById('send_invoice');


let total = [];
const services = [
    { "Wash Car": 10 },
    { "Mow Lawn": 20 },
    { "Pull Weeds": 30 }
]

const servicesWorking = services;

washCarBtn.addEventListener('click', () => {
    render(servicesWorking[0])
    washCarBtn.disabled = true;
})

washLawnBtn.addEventListener('click', () => {
    render(servicesWorking[1])
    washLawnBtn.disabled = true;
})
washWeedsBtn.addEventListener('click', () => {
    render(servicesWorking[2])
    washWeedsBtn.disabled = true;
})

sendBtn.addEventListener('click', () => {
    washCarBtn.disabled = false;
    washLawnBtn.disabled = false;
    washWeedsBtn.disabled = false;
    total = [];
    renderInformation.innerHTML='';
    totalPrice.innerHTML='$0';
    totalPrice.classList.remove('total_amount_calcul');
    totalAmountDiv.classList.remove('total_amount_add');
    const notesDes= document.querySelector(".notes_description")
    notesDes.remove();
})

function render(array) {

    let element = document.createElement('div');
    let name = document.createElement('span')
    let price = document.createElement('span')
    let priceDoll = document.createElement('span');
    let divPrice = document.createElement('div')

    element.classList.add('info-render-list');
    renderInformation.append(element);

    name.classList.add('name-render')
    name.textContent = Object.keys(array);
    element.append(name)

    divPrice.classList.add('price-div-wrapper-render');
    element.append(divPrice)

    priceDoll.classList.add('price-doll');
    priceDoll.textContent = '$';
    divPrice.append(priceDoll)

    price.classList.add('price-render');
    price.textContent = Object.values(array);
    divPrice.append(price)
    total.push(Object.values(array));
    renderDescription()

    let totalPriceAmount = calculateTotal(total);
    renderTotal(totalPriceAmount)
}

function calculateTotal(array) {
    let sum = 0

    for (let i = 0; i < array.length; i++) {
        sum += parseInt(array[i])
    }
    return sum;
}

function renderDescription() {
    if (!document.querySelector('.notes_description')) {
        const notesDescription = document.createElement('p');
        notesDescription.classList.add('notes_description')
        notesDescription.innerText = 'We accept cash, credit card, or PayPal';
        totalPrice.parentNode.insertBefore(notesDescription, totalPrice);
        totalAmountDiv.classList.add('total_amount_add');
    }
}

function renderTotal(number) {
    totalPrice.textContent = `$${number}`;
    totalPrice.classList.add('total_amount_calcul')
}