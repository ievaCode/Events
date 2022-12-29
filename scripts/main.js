
// json-server --watch data.json --port 5000
//__________________________________________________________________________


import EventCard from './components/eventcard.js';
import Modal from './components/modal.js';

window.addEventListener("load", (e) => { 
  fetch('http://localhost:5000/events') 
  .then(res => res.json())
  .then(data => {
    data.forEach(eventData =>{
      const newEventCard = new EventCard(eventData);
      document.querySelector('.eventDisplay').append(newEventCard);
    });   
  });
});

document.querySelector('.addEventButton')
.addEventListener ('click', ()=>{
  let newModal = new Modal();
  document.querySelector('main').append(newModal);
});





