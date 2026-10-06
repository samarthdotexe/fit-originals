export function scrollPageToTop(scroll = window.scrollTo.bind(window)) {
  scroll({ top: 0, behavior: "instant" });
}

