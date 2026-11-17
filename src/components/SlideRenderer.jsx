import React from 'react';
import SlideWaiting from './slides/SlideWaiting';
import SlideCover from './slides/SlideCover';
import SlideBottomPanel from './slides/SlideBottomPanel';
import SlideFormula from './slides/SlideFormula';
import SlideCzochralski from './slides/SlideCzochralski';
import SlideTable from './slides/SlideTable';
import SlideReferences from './slides/SlideReferences';

export default function SlideRenderer({ slide, isCarouselPaused, preloadState, hidePanels }) {
  if (!slide) return null;

  switch (slide.type) {
    case 'waiting':
      return (
        <SlideWaiting
          slide={slide}
          isCarouselPaused={isCarouselPaused}
          preloadState={preloadState}
          hidePanels={hidePanels}
        />
      );
    case 'cover':
      return <SlideCover slide={slide} hidePanels={hidePanels} />;
    case 'bottom-panel':
    case 'carousel-panel':
    case 'case-panel':
      return (
        <SlideBottomPanel
          slide={slide}
          isCarouselPaused={isCarouselPaused}
          hidePanels={hidePanels}
        />
      );
    case 'formula-panel':
      return <SlideFormula slide={slide} hidePanels={hidePanels} />;
    case 'czochralski':
      return <SlideCzochralski slide={slide} hidePanels={hidePanels} />;
    case 'table-panel':
      return <SlideTable slide={slide} hidePanels={hidePanels} />;
    case 'references':
      return <SlideReferences slide={slide} hidePanels={hidePanels} />;
    default:
      return null;
  }
}
