//Burger menu

function toggleMenu() {
    const button = document.getElementById('btn_burger');
    const menu = document.getElementById('list_menu');

    button.classList.toggle('active')
    menu.classList.toggle('active')
}


//Select service
const allServices = ['garden', 'lawn', 'planting'];
let activeServices = [];

function toggleBlur(name) {
  if (activeServices.includes(name)) {
    document.querySelectorAll(`.service-${name}`).forEach(element => {
      element.classList.remove('service-item-blur');
    })
  } else {
    document.querySelectorAll(`.service-${name}`).forEach(element => {
      element.classList.add('service-item-blur');
    })
  }
}

function selectService(event, service) {

  if (activeServices.includes(service)) {
    activeServices = activeServices.filter((elem) => elem != service);
  } else if (activeServices.length === 2) {
    return;
  } else {
    activeServices.push(service);
  }
  
  const button = event.currentTarget;
  button.classList.toggle('service-button-active');

  if (!activeServices.length) {
    document.querySelectorAll('.service-item-blur').forEach(element => {
      element.classList.remove('service-item-blur');
    });
    return;
  }

  allServices.forEach(element => toggleBlur(element));
  
}


//Accordions

let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });

//Dropdown

const optionCity = document.querySelectorAll('.option-city');
const cityHeader = document.querySelectorAll('.input-city');
let addressCard = document.querySelector('.city-address-card');
const titleContacts = document.querySelector('.contacts__title');
const contactsWrapper = document.querySelector('.contacts-wrapper');

const cityCard = {
    'Yonkers, NY': {
        'city': 'Yonkers, NY',
        'phone': '+1 914 678 0003',
        'address': '511 Warburton Ave',
    },
    'Canandaigua, NY': {
        'city': 'Canandaigua, NY',
        'phone': '+1 585 393 0001',
        'address': '151 Charlotte Street',
    },
    'New York City': {
        'city': 'New York City',
        'phone': '+1 212 456 0002',
        'address': '9 East 91st Street',
    },
    'Sherrill, NY': {
        'city': 'Sherrill, NY',
        'phone': '+1 315 908 0004',
        'address': '14 WEST Noyes BLVD',
    }
}

cityHeader.forEach(item => {
    item.addEventListener('click', selectToggle);
});

optionCity.forEach(item => {
    item.addEventListener('click', selectCity);
})

function selectToggle() {
    if (addressCard.classList.contains('show')){
        addressCard.classList.remove('show');
    }
    if (window.matchMedia("(max-width: 460px)").matches) {
        if (this.parentElement.classList.contains('on')) {contactsWrapper.style.minHeight = '420px';
        } else {contactsWrapper.style.minHeight = '580px';
        } 
    } 
    this.parentElement.classList.toggle('on');

}
function selectCity() {
    let textCity = this.innerText;
    let selected = this.closest('.select');
    let currentCity = this.closest('.select').querySelector('.input-city');
    let address = cityCard[textCity].address;
    let phone = cityCard[textCity].phone;
    
    addressCard.classList.remove('show');
    currentCity.classList.remove('selected');
    currentCity.innerText = textCity;
    addressCard.classList.toggle('show');

    if (window.matchMedia("(max-width: 460px)").matches) {
       titleContacts.style.marginBottom = '42px'; 
    };
    
    selected.classList.remove('on');
    currentCity.classList.toggle('selected');

    addressCard.innerHTML = `<table>
                                <tr>
                                    <th>City:</th>
                                    <td>${textCity}</td>
                                </tr>
                                <tr>
                                    <th>Phone:</th>
                                    <td>${phone}</td>
                                </tr>
                                <tr>
                                    <th>Office adress:</th>
                                    <td>${address}</td>
                                </tr>
                            </table>
                            <button href="tel:${phone}" class="call-us">Call us</button>`;
    const callUsBtn = document.querySelector('.call-us');
    callUsBtn.addEventListener('click', () => doCall(phone));
}

function doCall (phoneNumber) {
    window.location = 'tel:' + phoneNumber;
}

}