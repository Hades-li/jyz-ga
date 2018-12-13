// import 'bootstrap/dist/css/bootstrap.css'
import './css/main.scss'
import 'popper.js'
import 'bootstrap'
import './js/main'
import './index.temp.html'
import i18next from 'i18next'
import jqueryI18next from 'jquery-i18next'
import LngDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-xhr-backend';

i18next
    .use(XHR)
    .use(LngDetector)
    .init({
        // lng: 'zh', // evtl. use language-detector https://github.com/i18next/i18next-browser-languageDetector
        preload: ['zh', 'en'],
        fallbackLng: false,
        backend: {
            loadPath: function (lng) {
                return '/locales/' + lng + '/' + lng + '.json'
            }
        }
    }, function (err, t) {
        // for options see
        // https://github.com/i18next/jquery-i18next#initialize-the-plugin
        jqueryI18next.init(i18next, $);
        // start localizing, details:
        // https://github.com/i18next/jquery-i18next#usage-of-selector-function
        $('body').localize();
    });


