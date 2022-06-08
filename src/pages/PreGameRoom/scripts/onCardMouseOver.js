function onCardMouseOver(cardObject) {
  const singleImagePreview = document.querySelector('.single-image-preview');

  // Se não houver ainda nenhuma imagem sendo exibida
  if (!singleImagePreview.src) {
    const imagePreviewText = document.querySelector('.single-image-preview-container p');
    
    imagePreviewText.classList.add('hidden');
    singleImagePreview.classList.remove('hidden');
  }

  // Exibe a imagem da carta no single image preview
  singleImagePreview.src = cardObject.image_uris.border_crop;
}

export default onCardMouseOver;