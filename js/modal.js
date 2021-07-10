import galleryItems from "./gallery-items.js";
import { refs } from "./gallery.js";

const modalRefs = {
  btnClose: null,
  childNode: null,
  backdrop: null,
  img: null,
};
let curItem = 0;

const getModalMarkup = ({ src, descr }) => `
<div class="lightbox is-open js-lightbox">
    <div class="lightbox__overlay"></div> 
    <div class="lightbox__content">
        <img class="lightbox__image" src="${src}" alt="${descr}" />   
    </div>
    <button type="button" class="lightbox__button" data-action="close-lightbox" >
    X
    </button>
    </div> 
    `;

const addModalRefs = () => {
  modalRefs.btnClose = document.querySelector(".lightbox__button");
  modalRefs.childNode = document.querySelector(".lightbox");
  modalRefs.backdrop = document.querySelector(".lightbox__overlay");
  modalRefs.img = document.querySelector(".lightbox__image");
};

const openModal = ({ src, descr, idx }) => {
  refs.body.insertAdjacentHTML("afterbegin", getModalMarkup({ src, descr }));
  curItem = idx;
  addModalRefs();
  modalRefs.childNode.addEventListener("click", handleClick);
  window.addEventListener("keydown", handleKeyDown);
};

const closeModal = (e) => {
  refs.body.removeChild(modalRefs.childNode);
  window.removeEventListener("keydown", closeModal);
};

const prevItem = () => {
  if (curItem === 0) {
    curItem = galleryItems.length - 1;
  } else {
    curItem -= 1;
  }
};
const nextItem = () => {
  if (curItem === galleryItems.length - 1) {
    curItem = 0;
  } else {
    curItem += 1;
  }
};

const updateDataImg = () => {
  const { largeImageURL, tags } = galleryItems[curItem];
  modalRefs.img.src = largeImageURL;
  modalRefs.img.alt = tags;
};

const handleKeyDown = (e) => {
    if (e.code === "ArrowLeft") {
      prevItem();
      updateDataImg();
    } else if (e.code === "ArrowRight") {
      nextItem();
      updateDataImg();
    } else if (e.code === "Escape") {
      closeModal();
    }
  };

const handleClick = (e) => {
  if (e.target === modalRefs.backdrop || e.target === modalRefs.btnClose) {
    closeModal();
  }
};

export default openModal;
