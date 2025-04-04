import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';
import moment from 'moment/src/moment.js';
import 'moment/src/locale/es.js';
import 'moment/src/locale/ca.js';
import {formatMoney} from 'accounting-js';

/* @polymerMixin */
let ncDocWBehavior = (base) =>
  class extends base {
    constructor() {
      super();
    }

    static get properties() {
      return {
        language: {
          type: String,
          observer: '_languageChanged'
        },
        forceUtc: {
          type: Boolean,
          value: false,
          notify: true
        },
      }
    }

    _validate(){
      let inputs = dom(this.root).querySelectorAll("paper-input,paper-textarea");
      let firstInvalid = false;
      let i;
      for (i = 0; i < inputs.length; i++) {
        inputs[i].validate();
      }
      for (i = 0; i < inputs.length; i++) {
        if (!firstInvalid && inputs[i].invalid===true) {
          inputs[i].focus();
          firstInvalid = true;
        }
      }
      return !firstInvalid;
    }

    _formatDate(date, language, format) {
      let lLanguage = (language) ? language : 'es';
      moment.locale(lLanguage);
      let lFormat = (format) ? format : "L";
      let dateText = "";
      if (date) {
        // Check "date" UTC
        if (this.forceUtc)  {
          dateText = moment.utc(date).local().format(lFormat);
          return dateText;
        }
        if (date.substr(-1,1).toUpperCase() === "Z") {
          dateText = moment.utc(date).format(lFormat);
        } else {
          dateText = moment(date).format(lFormat);
        }
      }
      return dateText;
    }
    
    _formatTime(time, language) {
      let lLanguage = (language) ? language : 'es';
      moment.locale(lLanguage);
      let timeText = "";
      if (time) {
        // Check "time" UTC
        if (time.substr(-1,1).toUpperCase() === "Z"){
          timeText = moment.utc(time).format("HH:mm[h]");
        } else {
          timeText = moment(time).format("HH:mm[h]");
        }
      }
      return timeText;
    }

    _formatTimeSec(time, language) {
      let lLanguage = (language) ? language : 'es';
      moment().locale(lLanguage);
      let timeText = "";
      if (time) {
          // Check "time" UTC
          if (time.substr(-1, 1).toUpperCase() === "Z") {
              timeText = moment().utc(time).format("HH:mm:ss");
          } else {
              timeText = moment(time).format("HH:mm:ss");
          }
      }
      return timeText;
    }

    _formatTimeNull(time, language) {
      let lLanguage = (language) ? language : 'es';
      moment.locale(lLanguage);
      let timeText = this._formatTime(time, language);

      if ((moment(time).year() <= 1) && (timeText=="00:00h")) {
        timeText = "--:--";
      }

      return timeText;
    }
    
    _languageChanged(){
      if (typeof(moment)!="undefined") {
        moment.locale(this.language);
      }
    }

    _formatPrice(price) {
      let lPrice = (price) ? price : 0;
      let priceText = ""
      priceText = formatMoney(lPrice, {symbol: "€", precision: 2, thousand: ".", decimal: ",", format: "%v %s"});
      return priceText;
    }

    _formatPriceCur(price, symbol) {
      let priceText = "";
      let lPrice = (price) ? price : 0;
      if (symbol == '' || (typeof symbol == "undefined")) symbol = '€';
      priceText = formatMoney(lPrice, {symbol: symbol, precision: 2, thousand: ".", decimal: ",", format: "%v %s"});
      return priceText;
    }
    
    _getLineActionClass(element){
      let className = '';
      let lineAction = element.action;

      switch (lineAction) {
        case '_addQty':
          className = 'green';
          break;
        case '_removeQty':
        case '_delete':
          className = 'red';
          break;
      }

      if (this.hideLineActionsMultiLevel){
        if (this.line.level > 0 ) className = 'transparent';
      }

      return className;
    }

    _lineHasValue(value){
      return ((value === undefined) || (value == '')) ? false : true;
    }

    _checkNumberIsZero(number) {
      if (Math.abs(number) < 0.00001){
        return true; 
      } else {
        return false; 
      }
    }
    
  };
  export const MixinDoc = dedupingMixin(ncDocWBehavior);
