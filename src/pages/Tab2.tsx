import { useFlags } from 'flagsmith/react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import './Tab2.css';

const Tab2: React.FC = () => {
  const flags = useFlags(['feed_image_visible', 'feed_content_visible']);

  const [recipesList, setRecipesList] = useState<any>(null);
  const [recipesListError, setRecipesListError] = useState<any>(null);
  const [recipesListLoading, setRecipesListLoading] = useState<any>(false);

  const currentLimit = 3
  const [currentSkip, setCurrentSkip] = useState(0)

  useEffect(() => {
    setRecipesListLoading(true);

    fetch(`https://dummyjson.com/recipes?limit=${currentLimit}&skip=${currentSkip}&select=name,image,ingredients,instructions`)
      .then(res => res.json())
      .then(({ recipes, skip }) => {
        setCurrentSkip(skip)
        setRecipesList(recipes)
      })
      .catch(error => {
        setRecipesListError('Error')
      })
      .finally(() => {
        setRecipesListLoading(false)
      })
  }, [])

  const loadMore = () => {
    setRecipesListLoading(true);

    fetch(`https://dummyjson.com/recipes?limit=${currentLimit}&skip=${currentSkip + currentLimit}&select=name,image,ingredients,instructions`)
      .then(res => res.json())
      .then(({ recipes, skip }) => {
        setCurrentSkip(skip)
        setRecipesList([...recipesList, ...recipes])
      })
      .catch(error => {
        setRecipesListError('Error')
      })
      .finally(() => {
        setRecipesListLoading(false)
      })
  }

  return (
    <IonPage>
      <IonContent scrollY={false} scrollX={false}>
        <>
          {recipesListLoading &&
            <div>
              Loading...
            </div>}

          {recipesListError &&
            <div>
              Error
            </div>}

          {recipesList !== null && <Swiper
            className='item-slider'
            direction='vertical'
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={({ isEnd }: any) => {
              if (isEnd) {
                loadMore()
              }
            }}
          >
            {recipesList.map(({ id, image, name, ingredients, instructions }: any) => (
              <SwiperSlide key={id} className="item-slide">

                <div
                  className="item-content"
                  style={{ backgroundImage: flags.feed_image_visible.enabled ? `url(${image})` : ``, backgroundSize: 'cover' }}
                >
                  <div className='text-content'>
                    {name}
                  </div>

                  {flags.feed_content_visible.enabled &&
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
                  }
                </div>
              </SwiperSlide>
            ))}
          </Swiper>}
        </>
      </IonContent>
    </IonPage >
  );
};

export default Tab2;
