
import { Swiper, SwiperSlide } from 'swiper/react';

import './Feed.css';

import FeedItem from './FeedItem';

const Feed: React.FC<any> = ({ items, onLoadMore }) => {
  return (
    <Swiper
      className='item-slider'
      direction='vertical'
      spaceBetween={0}
      slidesPerView={1}
      onSlideChange={onLoadMore}
    >
      {items.map((item: any) => (
        <SwiperSlide key={item.id} className="item-slide">
          <FeedItem item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Feed;
