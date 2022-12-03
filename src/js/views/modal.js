import { SELECTOR } from "../utils/constants.js";
import { $} from '../utils/dom.js';

let template;

const createNewModalNode = () => {
    if(!template) {
        template = $(SELECTOR.LOTTO_MODAL);
    }
    return template.content.firstElementChild.cloneNode(true);
}

const getModalElement = () => {
    const element = createNewModalNode();
    return element;
}

export default (targetElement, {modalOn}) => {
    const newModal = targetElement.cloneNode(true);
    newModal.innerHTML = '';

    if(modalOn){
        newModal.insertAdjacentElement('beforeend', getModalElement());
        newModal.classList.add('open');
    }
    return newModal;
}