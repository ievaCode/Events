export default class Radio {
  constructor(props){
    this.props = props;
    return this.render();
  }

  render = () => {
    this.radioElement = document.createElement('div');
    this.radioElement.classList.add('radioWrap');

    this.props.radioOptions.forEach(option => {

      this.input = document.createElement('input');
      this.input.setAttribute('type', 'radio');
      this.input.setAttribute('id', option.id);
      this.input.setAttribute('name', option.name);
      this.input.setAttribute('value', option.value);
      this.radioElement.append(this.input);

      this.label = document.createElement('label');
      this.label.classList.add('radioLabel');
      this.label.setAttribute('for', option.id);
      this.labelText = document.createTextNode(option.label);
      this.label.append(this.labelText);
      this.radioElement.append(this.label);  

    });
  
    return this.radioElement;
  }
    // let radio = new Radio({
    //   radioOptions: [{
    //     label: 'No registration needed',
    //     id: 'registration1',
    //     value: 'false'
    //   },
    //   {
    //     label: 'Registration needed',
    //     id: 'registration2',
    //     value: 'true'
    //   }]
    // });
}
