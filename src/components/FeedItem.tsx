
import { useFlags } from 'flagsmith/react';

import { lazy } from 'react';

import './FeedItem.css';

const FeedContent = lazy(() => import('./FeedContent'));

const FeedItem: React.FC<any> = ({ item: { image, name, ingredients, instructions } }) => {
  const flags = useFlags(['feed_image_visible', 'feed_content_visible']);

  return (
    <div
      className="item-content"
      style={{ backgroundImage: flags.feed_image_visible.enabled ? `url(${image})` : ``, backgroundSize: 'cover' }}
    >
      <div className='text-content'>
        {name}
      </div>

      {flags.feed_content_visible.enabled &&
        <FeedContent ingredients={ingredients} instructions={instructions} />
      }
    </div>
  );
};

export default FeedItem;
