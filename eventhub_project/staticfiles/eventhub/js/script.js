/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
document.addEventListener("DOMContentLoaded", function () {
  const eventForm = document.getElementById("eventForm");
  const eventList = document.getElementById("eventList");
  let events = [];

  // Função para criar evento
  function createEvent(name, date, location, description, limit) {
    const newEvent = {
      id: Date.now(),
      name,
      date,
      location,
      description,
      limit,
      registered: 0,
      participants: [],
    };
    events.push(newEvent);
    renderEvents();
  }

  // Função para exibir os eventos
  function renderEvents() {
    eventList.innerHTML = "";
    events.forEach((event) => {
      const eventCard = document.createElement("div");
      eventCard.classList.add("col-md-4", "mb-4");
      eventCard.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">Data: ${event.date}</p>
            <p class="card-text">Local: ${event.location}</p>
            <p class="card-text">Descrição: ${event.description}</p>
            <p class="card-text">Inscritos: ${event.registered}/${event.limit}</p>
            <button class="btn btn-primary" onclick="register(${event.id})">Inscrever-se</button>
          </div>
        </div>
      `;
      eventList.appendChild(eventCard);
    });
  }

  // Função para inscrição no evento
  window.register = function (eventId) {
    const event = events.find((e) => e.id === eventId);
    if (event && event.registered < event.limit) {
      event.registered++;
      alert(`Inscrição confirmada para ${event.name}`);
      renderEvents();
    } else {
      alert("Limite de participantes atingido!");
    }
  };

  // Evento de submit do formulário para criar novo evento
  eventForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("eventName").value;
    const date = document.getElementById("eventDate").value;
    const location = document.getElementById("eventLocation").value;
    const description = document.getElementById("eventDescription").value;
    const limit = parseInt(document.getElementById("eventLimit").value);
    
    createEvent(name, date, location, description, limit);

    // Limpa o formulário após a criação do evento
    eventForm.reset();
  });
});
let events = [];

document.getElementById("eventForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const eventName = document.getElementById("eventName").value;
    const eventDate = document.getElementById("eventDate").value;
    const eventLocation = document.getElementById("eventLocation").value;
    const eventDescription = document.getElementById("eventDescription").value;
    const eventLimit = document.getElementById("eventLimit").value;

    const newEvent = {
        name: eventName,
        date: eventDate,
        location: eventLocation,
        description: eventDescription,
        limit: parseInt(eventLimit),
        attendees: []
    };

    events.push(newEvent);
    renderEvents();
    this.reset();
});

function renderEvents() {
    const eventContainer = document.getElementById("eventContainer");
    eventContainer.innerHTML = "";

    events.forEach((event, index) => {
        const eventCard = document.createElement("div");
        eventCard.className = "col-lg-4 col-sm-6 mb-4";
        eventCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${event.date} - ${event.location}</h6>
                    <p class="card-text">${event.description}</p>
                    <p>Limite de Participantes: ${event.limit}</p>
                    <button class="btn btn-primary" onclick="attendEvent(${index})">Inscrever-se</button>
                    <button class="btn btn-danger" onclick="manageEvent(${index})">Gerenciar Inscritos</button>
                </div>
            </div>
        `;
        eventContainer.appendChild(eventCard);
    });
}

function attendEvent(eventIndex) {
    const event = events[eventIndex];
    if (event.attendees.length < event.limit) {
        const name = prompt("Digite seu nome para se inscrever:");
        if (name) {
            event.attendees.push(name);
            alert(`Inscrição feita com sucesso para ${event.name}!`);
        }
    } else {
        alert("Limite de participantes alcançado!");
    }
}

function manageEvent(eventIndex) {
    const event = events[eventIndex];
    alert(`Participantes de ${event.name}: ${event.attendees.join(", ") || "Nenhum inscrito."}`);
}
