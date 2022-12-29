import Select from './select.js';
import Input from './input.js';
import Radio from './radio.js';
import EventCard from './eventcard.js';

export default class Form { 
  constructor(){
    return this.render();
  }

  postEvent = (data) => {
    fetch('http://localhost:5000/events', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  updateEvent = (id, data) => {
    fetch(`http://localhost:5000/knygos/${id}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  updateEventPatch = (id, data) => { 
    fetch(`http://localhost:5000/events/${id}`, {
      method: "PATCH",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => console.log(data));
  }

  render = () => {
    this.form = document.createElement('form');
    this.form.classList.add('form');

    this.selectType = new Select({
      label: "Type of event",
      attributes: {id: "type"},
      options: ['--Please choose an option--', 'concert', 'theater', 'film', 'dance', 'street art', 'exhibition', 'party', 'work/learn', 'private', 'other']
    });
    this.form.append(this.selectType);

    this.nameInput = new Input({
      label: 'Name',
      attributes: {
        type: 'text',
        id: 'name'
      },
    });
    this.form.append(this.nameInput);

    this.posterInput = new Input({
      label: 'Poster',
      attributes: {
        type: 'url',
        id: 'poster'
      },
    });
    this.form.append(this.posterInput);

    this.venueInput = new Input({
      label: 'Venue',
      attributes: {
        type: 'text',
        id: 'venue'
      },
    });
    this.form.append(this.venueInput);

    this.townInput = new Input({
      label: 'Town',
      attributes: {
        type: 'text',
        id: 'town'
      },
    });
    this.form.append(this.townInput);

    this.dateInput = new Input({
      label: 'Date',
      attributes: {
        type: 'date',
        id: 'date',
        min: getCurrentDate()
      },
    });
    this.form.append(this.dateInput);

    this.timeInput = new Input({
      label: 'Time',
      attributes: {
        type: 'time',
        id: 'time'
      },
    });
    this.form.append(this.timeInput);

    this.priceInput = new Input({
      label: 'Price',
      attributes: {
        type: 'number',
        id: 'price'
      },
    });
    this.form.append(this.priceInput);

    this.radioElement = new Radio({
      radioOptions: [{
        label: 'No registration needed',
        name: 'registration',
        id: 'registration1',
        value: false
      },
      {
        label: 'Registration needed',
        name: 'registration',
        id: 'registration2',
        value: true
      }]
    });
    this.form.append(this.radioElement);

    this.submitInput = document.createElement('input');
    this.submitInput.setAttribute('type', 'submit');
    this.submitInput.setAttribute('value', 'Add event');
    this.form.append(this.submitInput);
    
   
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      console.dir(e);
      const [type, name, poster, venue, town, date, time, price, registration] = [
        e.target.elements.type.value,
        e.target.elements.name.value,
        e.target.elements.poster.value,
        e.target.elements.venue.value,
        e.target.elements.town.value,
        e.target.elements.date.value,
        e.target.elements.time.value,
        e.target.elements.price.value,
        e.target.elements.registration.value
      ];

      if (this.form.classList.contains('update')) {
        console.log(this.props); //kodėl čia negauna?
        let importance = this.props.importance;//????????? Arba Importance reik gati, arba pachinti?
        let updatedEventData = {type, name, poster, venue, town, date, time, price, registration, importance};
        //gavus id reik removinti iš ekrano seną kortelę. Ar geriau iškoti, kas pasikeitę, daryti queryselect atitinkamų laukų ir keisti seną kortelę?   
        let updatedEvent = new EventCard(updatedEventData);     
        this.updateEvent(/*kaip gauti id*/updatedEventData);
        document.querySelector(".eventDisplay").prepend(newEvent) //kaip padaryti, kad įdėtų į tą pačią vietą?  
      } else {
        let importance = false;    
        let newEventData = {type, name, poster, venue, town, date, time, price, registration, importance};   
        let newEvent = new EventCard(newEventData);       
        this.postEvent(newEventData);
        document.querySelector(".eventDisplay").prepend(newEvent) //nevekia tas prepend - deda į galą..
      }
      document.querySelector(".modal").remove();
    });

    return this.form;
  }
}

function getCurrentDate (){
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;
  return `${year}-${month}-${day}`;  
}

  // let orientation = (data) => {
  // var imgOrientation = "landscape";
  // let img = new Image();
  // img.src = data;
  // setTimeout(() => {
  //   console.log(img.src, img.width, img.height);
  //   img.height > img.width ? imgOrientation = 'portret' : imgOrientation = 'landscape'
  // }, 100);
  // return imgOrientation;
  // };

