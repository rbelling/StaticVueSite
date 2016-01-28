import { eventBus } from './utils/eventBus';
import loader from './modules/loader';

global.eventBus = eventBus;

(() => {
  const script = (url) => {
    if(Array.isArray(url)) {
      var self = this, prom = [];
      url.forEach(function(item) {
        prom.push(self.script(item));
      });
      return Promise.all(prom);
    }

    return new Promise(function (resolve, reject) {
      var r = false,
        t = document.getElementsByTagName("script")[0],
        s = document.createElement("script");

      s.type = "text/javascript";
      s.src = url;
      s.async = true;
      s.onload = s.onreadystatechange = function () {
        if (!r && (!this.readyState || this.readyState == "complete")) {
          r = true;
          resolve(this);
        }
      };
      s.onerror = s.onabort = reject;
      t.parentNode.insertBefore(s, t);
    });

  };

  console.log(global.eventBus);
  loader.init('#js-app');
  loader.show();
})();
