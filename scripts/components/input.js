export default class Input {
  constructor(props){
    this.props = props;
    return this.render();
  }

  render = () => {
    this.inputElement = document.createElement('div');
    this.inputElement.classList.add('inputWrap');

    this.label = document.createElement('label');
    this.label.setAttribute('for', this.props.attributes.id);
    this.labelText = document.createTextNode(this.props.label);
    this.label.append(this.labelText);
    this.inputElement.append(this.label);
    
    this.input = document.createElement('input');
    this.input.classList.add(`${this.props.attributes.id}Input`);
    Object.keys(this.props.attributes).forEach(attribute => {
      this.input.setAttribute(attribute, this.props.attributes[attribute]);
    });
    this.inputElement.append(this.input);
  
    return this.inputElement;
  }
  // let input = new Input({
  //   attributes: {
  //     label: 'Name',
  //     id: 'name'
  //   },
  // });
}
