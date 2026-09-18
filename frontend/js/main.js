/**
 * PRAMAN Main Entry Point
 * Bootstraps all core modular JS modules:
 * accessibility, storage, navigation, slider, search, state-selector, standards, and analyzer.
 */

import { initAccessibility } from './accessibility.js';
import { initNavigation } from './navigation.js';
import { initHeroSlider } from './slider.js';
import { initSearch } from './search.js';
import { initStateSelector } from './state-selector.js';
import { initStandardsExplorer } from './standards.js';
import { initAnalyzer } from './analyzer.js';
import { initChatbot } from './components/chatbot.js';

function initGoogleTranslate() {
  const script = document.createElement('script');
  script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);

  window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'en,hi,bn,ta,te,mr,pa,gu,kn,ml',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
  };
}

document.addEventListener('DOMContentLoaded', () => {
  initAccessibility();
  initNavigation();
  initHeroSlider();
  initSearch();
  initStateSelector();
  initStandardsExplorer();
  initAnalyzer();
  initChatbot();
  initGoogleTranslate();
});
