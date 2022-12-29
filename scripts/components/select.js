export default class Select {
  constructor(props){
    this.props = props;
    return this.render();
  }

  render = () => {
    this.selectElement = document.createElement('div');
    this.selectElement.classList.add('selectWrap');
    this.selectElement.classList.add('inputWrap');

    this.label = document.createElement('label');
    this.label.setAttribute('for', this.props.id);
    this.labelText = document.createTextNode(this.props.label);
    this.label.append(this.labelText);
    this.selectElement.append(this.label);

    this.select = document.createElement('select');
    this.select.classList.add(`${this.props.attributes.id}Input`);
    Object.keys(this.props.attributes).forEach(attribute => {
      this.select.setAttribute(attribute, this.props.attributes[attribute]);
    });
    this.selectElement.append(this.select);

    this.props.options.forEach(option => {
      this.option = document.createElement('option');
      this.option.classList.add(option.replace(/\s/g, ''));
      this.option.setAttribute("value", option);
      this.optionTextNode = document.createTextNode(option);
      this.option.append(this.optionTextNode);        
      this.select.append(this.option);
    });
    
    return this.selectElement;
  }
  // let select = new Select({
  //   attributes: {
  //   id: 'superUnorderedList'
  //   },
  //   options: ['green', 'blue', 'pink']
  // });
}