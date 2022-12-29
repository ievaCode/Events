import Form from './form.js';

export default class Modal {
  constructor(props){
    this.props = props;
    return this.render();
  }
  render = () => {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    let newForm = new Form(this.props);
    this.modal.append(newForm);
    return this.modal;
  }
}


