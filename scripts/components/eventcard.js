import Modal from './modal.js';

export default class EventCard {
  constructor(props){
    this.props = props;
    return this.render();
  }
  get = (id) => {
    fetch(`http://localhost:5000/events/${id?id:''}`)
      .then(res => res.json())
      .then(data => {
          console.log(data);
      });
  }

  deleteEvent = (id) => {
    fetch(`http://localhost:5000/events/${id}`, {method: "DELETE"});
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

    this.eventCard = document.createElement('article'); 
    this.eventCard.classList.add('eventCard');
    this.eventCard.classList.add(`${this.props.id}`);

    // Create dateWrap element
    this.dateWrap = document.createElement('div');
    this.dateWrap.classList.add('dateWrap');
    this.eventCard.append(this.dateWrap);

    // Create date
    this.date = document.createElement('time');
    this.date.classList.add('date');
    this.date.setAttribute('datetime', this.props.date);
    this.dateSpan = document.createElement('span');
    this.dateSpan.classList.add('dateSpan');
    this.dateText1 = document.createTextNode(this.props.date.slice(0, this.props.date.length-4));
    this.dateSpan.append(this.dateText1);
    this.date.append(this.dateSpan);
    // this.dateText2 = document.createTextNode(this.props.date.slice(-4));
    // this.date.append(this.dateText2);
    this.dateWrap.append(this.date);

    // Create time
    this.time = document.createElement('time');
    this.time.classList.add('time'); 
    this.time.setAttribute('datetime', this.props.time);
    this.timeText = document.createTextNode(this.props.time);
    this.time.append(this.timeText);
    this.dateWrap.append(this.time);

    // Create buttonsWrap element
    this.buttonsWrap = document.createElement('div');
    this.buttonsWrap.classList.add('buttonsWrap');
    this.eventCard.append(this.buttonsWrap);

    // love
    this.loveWrap = document.createElement('div');
    this.loveWrap.classList.add('loveWrap');        
    this.buttonsWrap.append(this.loveWrap);

    this.loveIcon = document.createElement('img');
    console.log(this.props.importance);
    if (this.props.importance == false) { 
      this.loveIcon.classList.add('noLove');
      this.loveIcon.setAttribute('src', './data/emptyHeart.png');
    } else {
      this.loveIcon.classList.add('love');
      this.loveIcon.setAttribute('src', './data/fullHeart.png');
    };
    this.loveWrap.append(this.loveIcon);   

    // edit
    this.editWrap = document.createElement('div');
    this.editWrap.classList.add('editWrap');        
    this.buttonsWrap.append(this.editWrap);

    this.editIcon = document.createElement('img');
    this.editIcon.classList.add('editIcon');
    this.editIcon.setAttribute('src', './data/edit.png');
    this.editWrap.append(this.editIcon);

    // delete
    this.deleteWrap = document.createElement('div');
    this.deleteWrap.classList.add('deleteWrap');        
    this.buttonsWrap.append(this.deleteWrap);

    this.deleteIcon = document.createElement('img');
    this.deleteIcon.classList.add('deleteIcon');
    this.deleteIcon.setAttribute('src', './data/delete.png');
    this.deleteWrap.append(this.deleteIcon);
    
    // Create imgWrap element
    this.imgWrap = document.createElement('div');
    this.imgWrap.classList.add('imgWrap');
    this.eventCard.append(this.imgWrap);

    // Create poster image
    this.posterImg = document.createElement('img');
    this.posterImg.src = this.props.poster;
    this.posterImg.alt = "event poster";
    this.imgWrap.append(this.posterImg);

    // Create infoWrap element
    this.infoWrap = document.createElement('div');
    this.infoWrap.classList.add('infoWrap');
    this.eventCard.append(this.infoWrap);

    // type
    this.typeWrap = document.createElement('div');
    this.typeWrap.classList.add('typeWrap');        
    this.infoWrap.append(this.typeWrap);

    this.type = document.createElement('p');
    this.type.classList.add('type');
    this.typeText = document.createTextNode(this.props.type);
    this.type.append(this.typeText);
    this.typeWrap.append(this.type);

    // Create name
    this.name = document.createElement('p');
    this.name.classList.add('name');
    this.nameText = document.createTextNode(this.props.name);
    this.name.append(this.nameText);
    this.infoWrap.append(this.name);

    // Create place
    this.place = document.createElement('p');
    this.place.classList.add('place');
    this.venue = document.createElement('a');
    this.venue.classList.add('venue');
    this.venue.href = this.venue;
    this.venueText = document.createTextNode(this.props.venue);
    this.venue.append(this.venueText);
    this.place.append(this.venue);   
    this.townText = document.createTextNode(`, ${this.props.town}`);
    this.place.append(this.townText);
    this.infoWrap.append(this.place);

    // Create ticketWrap element
    this.ticketWrap = document.createElement('div');
    this.ticketWrap.classList.add('ticketWrap');
    this.infoWrap.append(this.ticketWrap);

    // Create price
    this.price = document.createElement('p');
    this.price.classList.add('price');
    this.priceText1 = document.createTextNode(`price - `);
    this.priceSpan = document.createElement('span');
    this.priceSpan.classList.add('priceSpan');
    this.priceText2 = document.createTextNode(this.props.price? `${this.props.price}e` : `Free`);
    this.priceSpan.append(this.priceText2);
    this.price.append(this.priceText1);
    this.price.append(this.priceSpan);
    this.ticketWrap.append(this.price);

    // Create actionButton element
    if (this.props.price > 0 || this.props.registration == "true") {
      this.actionButton = document.createElement('button');
      this.actionButton.classList.add('actionButton');
      let actionText;
      if (this.props.price > 0) {
        actionText = "buy ticket";
      } else {
        if (this.props.registration == "true") {
          actionText = "register";
          } else null;
        }
      this.actionText = document.createTextNode(actionText);
      this.actionButton.append(this.actionText);
      this.ticketWrap.append(this.actionButton);    
    }

    let importance;
    this.loveWrap.addEventListener('click', e => {
      if (this.props.importance == "false") {
        // this.loveIcon.classList.toggle('noLove');
        this.loveIcon.classList.remove('love');
        this.loveIcon.classList.add('noLove');
        this.loveIcon.setAttribute('src', './data/emptyHeart.png'); //atgal nebegrįžta, nors data pasikeičia
        importance = "true";
      } else {
        // this.loveIcon.classList.toggle('love');
        this.loveIcon.classList.remove('noLove');
        this.loveIcon.classList.add('love');
        this.loveIcon.setAttribute('src', './data/fullHeart.png');
        importance = "false";
      }
      this.updateEventPatch(this.props.id, {importance});
    });

    this.deleteWrap.addEventListener('click', e => {
      e.target.parentElement.parentElement.parentElement.remove(); //zr. target path
      this.deleteEvent(this.props.id);
    });

    this.editWrap.addEventListener('click', e => {
      let newModal = new Modal(this.props);
      console.log(this.props);
      document.querySelector('main').append(newModal);
      document.querySelector('form').classList.add('update');
      document.querySelector(`option[value=${this.props.type}`).setAttribute('selected',''); //su vienais options veikia, kai kodo intarpas kabutėse, su kitais, kai ne...
      document.querySelector('.nameInput').setAttribute('value', this.props.name); //ar gerai taip po vieną rankiotis?
      document.querySelector('.posterInput').setAttribute('value', this.props.poster);
      document.querySelector('.venueInput').setAttribute('value', this.props.venue);
      document.querySelector('.townInput').setAttribute('value', this.props.town);
      document.querySelector('.timeInput').setAttribute('value', this.props.time);
      document.querySelector('.priceInput').setAttribute('value', this.props.price);
      document.querySelector(`input[value=${this.props.registration}`).setAttribute('checked', '');
      document.querySelector('input[type=submit]').setAttribute('value', 'Update event');
      // gal šitą gabalą bus galima iškelti į formą??
    });

    return this.eventCard;

  };
}      

//Kaip padaryti, kad neatrodytų taip baisiai persikrovimas visko? Arba.. gal neturi viskas persikrauti per eventus?

