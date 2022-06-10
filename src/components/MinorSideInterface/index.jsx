import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { 
  StyledSideMinorInterface,
  StyledChat,
  TopContainer,
} from './styles';

import {
  MinimalistInput,
  Resizer
} from '@components';

import {
  addResizerEventListener,
  resizerCleanup
} from './resize';

function MinorSideInterface() {
  const { t } = useTranslation();

  useEffect(() => {
    addResizerEventListener();
    return resizerCleanup;
  }, []);

  return(
    <StyledSideMinorInterface>
      <TopContainer>
        <p className="card-preview-text">Card Preview</p>
        <img alt="Card Preview" className="single-image-preview hidden" />
        <Resizer />
      </TopContainer>
      <StyledChat className="chat-container">
        <div className="chat-content">
          <p><strong>Fulano:</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias quae, at molestiae nam fugiat, minima error debitis voluptatem laboriosam dolore sed, minus facilis! Quasi omnis totam et enim placeat, beatae laborum impedit deserunt temporibus quaerat autem nulla sunt. Ex nemo dolorum consequatur vel asperiores similique, dicta obcaecati voluptas accusantium, beatae earum vitae. Fugit vero quaerat perferendis asperiores veniam deleniti commodi et assumenda, incidunt ipsam eius dicta quasi. Eius voluptatum itaque, sequi quibusdam officia quidem nisi, delectus soluta minima impedit quo? Dicta soluta molestiae impedit! Eveniet, at sint molestiae maiores aliquid ipsum laudantium! Dicta iure corporis modi hic ipsam necessitatibus perferendis beatae. Quaerat molestiae temporibus totam itaque aperiam adipisci quod deleniti, tempora id delectus quas quia nulla dolores similique odit excepturi quibusdam ex omnis, nobis et rerum ad, tempore sapiente corporis. Recusandae illum laborum sint corrupti necessitatibus. Ducimus, ab eius consectetur inventore voluptatum doloremque maxime. Ratione laboriosam perspiciatis exercitationem iure deserunt adipisci animi quod temporibus incidunt aperiam nisi, soluta doloribus mollitia iste itaque commodi enim, explicabo inventore alias aliquam. Velit eius consectetur nihil reprehenderit hic nulla neque vero quod, fugiat sint odit reiciendis saepe aliquid, ratione, repellendus illum! A temporibus asperiores alias atque saepe recusandae ratione ut nemo veritatis, esse nobis?</p>
        </div>
        <MinimalistInput 
          className="chat-input" 
          placeholder={t('message')} />
      </StyledChat>
    </StyledSideMinorInterface>
  );
}

export default MinorSideInterface;