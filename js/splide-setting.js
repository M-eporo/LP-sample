const firstViewSplide = new Splide(".first-view .splide", {
  autoplay: true,
  type: "fade",
  rewind: true,
  rewindByDrag: true,
  interval: 1000,
  speed: 1000,
  pauseOnHover: true,
  pauseOnFocus: true,
}).mount();

document.addEventListener("DOMContentLoaded", () => {
  const worksSplide = new Splide(".works .container .splide", {
    label: "スライダー",
    type: "loop",
    autoplay: true,
    speed: 2000,
    interval: 3000,
    rewind: true,
    rewindSpeed: 2000,
    rewindByDrag: true,
    perPage: 2,
    perMove: 2,
    pauseOnHover: true,
    pauseOnFocus: true,
    gap: "1rem",
    resetProgress: true,
    classes: {
      arrow: 'splide__arrow custom__arrow__color',
      page: "splide__pagination__page custom__pagination__page"
    },
    breakpoints: {
      768: {
        perPage: 1,
      }
    }
  }).mount();
});