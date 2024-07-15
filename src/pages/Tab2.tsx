import { useFlags } from 'flagsmith/react';
import { IonContent, IonPage } from '@ionic/react';
import { useEffect, useState } from 'react';
import 'swiper/css';

import './Tab2.css';
import Feed from '../components/Feed';

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

          {recipesList !== null &&
            <Feed
              items={recipesList}
              onLoadMore={({ isEnd }: any) => {
                if (isEnd) {
                  loadMore()
                }
              }}
            />
          }
        </>
      </IonContent>
    </IonPage >
  );
};

export default Tab2;
