
import { Swiper, SwiperSlide } from 'swiper/react';

import './FeedContent.css';

const FeedContent: React.FC = ({ ingredients, instructions }: any) => {
  return (
      <Swiper
        className="item-content-slider"
        direction='horizontal'
        spaceBetween={0}
        slidesPerView={1}
      >
        <SwiperSlide className="item-content-slide">
          <div className='text-content'>
            <ul>
              {ingredients.map((ingredient: any) => (<li key={ingredient}>{ingredient}</li>))}
            </ul>
          </div>
        </SwiperSlide>
        <SwiperSlide className="item-content-slide">
          <div className='text-content'>
            <ul>
              {instructions.map((instruction: any) => (<li key={instruction}>{instruction}</li>))}
            </ul>
          </div>
        </SwiperSlide>
      </Swiper>
  );
};

export default FeedContent;
