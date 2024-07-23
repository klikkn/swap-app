import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import useEmblaCarousel from 'embla-carousel-react'

import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [emblaRef] = useEmblaCarousel({
     axis: 'y'
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false} scrollX={false}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>


        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            <div className="embla__slide">Slide 1</div>
            <div className="embla__slide">Slide 2</div>
            <div className="embla__slide">Slide 3</div>
          </div>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;

