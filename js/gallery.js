import galleryItems from "./gallery-items.js";
import openModal from './modal.js';


export const refs = {
  body: document.body,
  list: document.createElement("ul"),
};

refs.body.prepend(refs.list);

const getItemGalleryMarkup = ({ src, descr, largeImageURL, idx }) =>
  `<li><a href="${largeImageURL}"><img src="${src}" loading="lazy" alt="${descr} width="300" data-id="${idx}"></a></li>`;

const handleOpenModal = e => {
    e.preventDefault();
    if(e.target.nodeName !== "IMG") return;

    const src = e.target.closest("a").href;
    const descr = e.target.alt;
    const idx = Number(e.target.dataset.id);

    openModal({ src, descr, idx });
}  

const galleryItemsMarkup = galleryItems.reduce(
  (acc, { webformatURL, tags, largeImageURL }, idx) =>
    acc + getItemGalleryMarkup({ src: webformatURL, descr: tags, largeImageURL, idx }),
  ""
);

refs.list.insertAdjacentHTML("beforeend", galleryItemsMarkup);



refs.list.addEventListener('click', handleOpenModal)
