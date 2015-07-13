var $ = require('jquery');
var Hammer = require('hammerjs');

// Thanks to http://www.tods.com/en_us/
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };  
var CarouselFull = (function() {
    function CarouselFull($ref, cfg) {
      //bind functions to "this"
      this.onSliderMoved = __bind(this.onSliderMoved, this);
      this.onSwipe = __bind(this.onSwipe, this);
      this.onWaitTimeout = __bind(this.onWaitTimeout, this);
      this.onNavigatorBtnClick = __bind(this.onNavigatorBtnClick, this);
      this.onCounterBulletClick = __bind(this.onCounterBulletClick, this);
      this.hideTitle = __bind(this.hideTitle, this);
      this.showTitle = __bind(this.showTitle, this);
      this.setElements = __bind(this.setElements, this);
      this.setInteractions = __bind(this.setInteractions, this);

      //Carousel configuration: set default parameters or overwrite them
      var cfg = cfg || {};
      this.current = cfg.current || 0;
      this.duration = cfg.duration || 0.75;
      this.wait_timeout = cfg.wait_timeout || 0;
      this.wait_duration = cfg.wait_duration || 5000;
      this.is_enabled = cfg.is_enabled || true;
      this.has_progress = cfg.has_progress || false;
      this.has_counter = cfg.has_counter || true;
      this.has_navigator = cfg.has_navigator || true;
      this.has_autoplay = cfg.has_autoplay || false;

      //Init variables
      this.ref = $ref;
      this.carousel_ref = this.ref.find('.carousel');
      this.items = this.carousel_ref.find('> li');
      this.counter_ref = this.ref.find('.counter-js');
      this.navigator_ref = this.ref.find('.navigator');
      if (this.navigator_ref.length > 0) {
        this.prev_btn = this.navigator_ref.find('.previous');
        this.next_btn = this.navigator_ref.find('.next');
      }
      this.progress_ref = this.navigator_ref.find('.text-counter');
      if (this.progress_ref.length > 0) {
        this.progress_current = this.progress_ref.find('.current');
        this.progress_total = this.progress_ref.find('.total');
      }

      this.setElements(); 
      if (this.counter_ref.length > 0) {
        this.setCounter();
      }
      if (this.navigator_ref.length > 0) {
        this.setNavigator();
      }
      if (this.progress_ref.length > 0) {
        this.setProgress();
      }
      if (this.ref.hasClass('js-autoplay')) { //add this class to start autoplay on page load.
        this.setAutoPlay();
      }
      if (this.ref.hasClass('js-swipe') && this.items.length > 1) {
        var self = this;
        new Hammer(this.ref[0], {})
          .on('swipeleft', function(ev) {
              self.onSwipe(ev, 'left');
          }).on('swiperight', function(ev) {
              self.onSwipe(ev, 'right');
          });
      }
      this.carousel_ref.find("li:eq(" + (this.current + 1) + ")").addClass('current');
    }

    CarouselFull.prototype.setElements = function() {
      //clone slides to create infinite loop effect
      var first_item, i, item, last_item, wText, _i, _ref;
      this.carousel_ref.css({
        width: "" + (this.items.length * 100) + "%"
      });
      for (i = _i = 0, _ref = this.items.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        item = $(this.items[i]);
        item.css({
          width: "" + (100 / this.items.length) + "%"
        });
        wText = item.find('.wrapText');
        if (wText.length === 1) {
          item.find('>a').hover(this.showTitle, this.hideTitle);
        }
      }
      first_item = $(this.items[0]).clone();
      this.carousel_ref.append(first_item);
      last_item = $(this.items[this.items.length - 1]).clone();
      last_item.insertBefore($(this.items[0]));
      return this.carousel_ref.css({
        left: '-100%'
      });
    };

    CarouselFull.prototype.showTitle = function(e) {
      var item, link;
      e.preventDefault();
      link = $(e.currentTarget);
      item = link.parent();
      return item.addClass('canvas-hover');
    };

    CarouselFull.prototype.hideTitle = function(e) {
      var item, link;
      e.preventDefault();
      link = $(e.currentTarget);
      item = link.parent();
      return item.removeClass('canvas-hover');
    };

    CarouselFull.prototype.setCounter = function() {
      var bullet, bullets, i, link, _i, _ref, _results;
      bullets = this.counter_ref.find('li');
      if (bullets.length < 2) {
        return this.counter_ref.hide();
      } else {
        this.has_counter = true;
        _results = [];
        for (i = _i = 0, _ref = bullets.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          bullet = $(bullets[i]);     
          bullets.bind('click', this.onCounterBulletClick);
          link = bullet.find('a');
          if (i == (this.current)) {
            link.addClass('active');
          }               
          _results.push(link.bind('click', (function(e) {
            return e.preventDefault();
          })));
        }
        return _results;
      }
    };

    CarouselFull.prototype.onCounterBulletClick = function(e) {
      var delta, index;
      e.preventDefault();
      if (this.is_enabled) {
        index = $(e.currentTarget).index();
        if (index !== this.current) {
          delta = index - this.current;
          return this.moveSlider(delta);
        }
      }
    };

    CarouselFull.prototype.setNavigator = function() {
      if (this.items.length > 1 && this.prev_btn.length > 0 && this.next_btn.length > 0) {
        this.has_navigator = true;
        this.prev_btn.bind('click', ((function(_this) {
          return function(e) {
            return _this.onNavigatorBtnClick(e, -1);
          };
        })(this)));
        return this.next_btn.bind('click', ((function(_this) {
          return function(e) {
            return _this.onNavigatorBtnClick(e, 1);
          };
        })(this)));
      } else {
        return this.navigator_ref.hide();
      }
    };

    CarouselFull.prototype.onNavigatorBtnClick = function(e, dir) {
      e.preventDefault();
      if (this.is_enabled && !$(e.currentTarget).hasClass('disabled')) {
        return this.moveSlider(dir);
      }
    };

    CarouselFull.prototype.setProgress = function() {
      if (this.progress_current.length > 0 && this.progress_total.length > 0) {
        this.has_progress = true;
        this.progress_current.text(this.current + 1);
        return this.progress_total.text(this.items.length);
      }
    };

    CarouselFull.prototype.setAutoPlay = function() {
      if (this.items.length > 1) {
        this.has_autoplay = true;
        return this.startAutoPlay();
      }
    };

    CarouselFull.prototype.startAutoPlay = function() {
      return this.wait_timeout = window.setTimeout(this.onWaitTimeout, this.wait_duration);
    };

    CarouselFull.prototype.stopAutoPlay = function() {
      return window.clearTimeout(this.wait_timeout);
    };

    CarouselFull.prototype.onWaitTimeout = function() {
      if (this.is_enabled) {
        return this.moveSlider(1);
      }
    };

    CarouselFull.prototype.onSwipe = function(event, direction) {
      var dir;
      if (this.is_enabled) {
        dir = direction === 'left' ? 1 : direction === 'right' ? -1 : void 0;
        return this.moveSlider(dir);
      }
    };

    CarouselFull.prototype.moveSlider = function(delta) {
      this.is_enabled = false;
      if (this.has_counter) {
        this.counter_ref.find('li a.active').removeClass('active');
      }
      if (this.has_navigator) {
        this.navigator_ref.find('li a.disabled').removeClass('disabled');
      }
      if (this.has_autoplay) {
        this.stopAutoPlay();
      }
      this.current = this.current + delta;
      var _li = this.carousel_ref.find("li");
      _li.removeClass('current');
      _li.eq(this.current + 1).addClass('current');
      return TweenLite.to(this.carousel_ref, this.duration, {
        css: {
          'left': "" + (-100 * (this.current + 1)) + "%"
        },
        onComplete: this.onSliderMoved
      });
    };

    CarouselFull.prototype.onSliderMoved = function() {
      //handle the first / last slide
      if (this.current === this.items.length) {
        this.current = 0;
        this.carousel_ref.css({
          left: '-100%'
        });
      } else if (this.current === -1) {
        this.current = this.items.length - 1;
        this.carousel_ref.css({
          left: "" + (-100 * (this.current + 1)) + "%"
        });
      }
      if (this.has_counter) {
        this.counter_ref.find("li:eq(" + this.current + ") a").toggleClass('active');
      }
      if (this.has_navigator) {
        if (this.current === 0) {
          this.prev_btn.addClass('disabled');
        } else if (this.current === this.items.length - 1) {
          this.next_btn.addClass('disabled');
        }
      }
      if (this.has_progress) {
        this.progress_current.text(this.current + 1);
      }
      if (this.has_autoplay) {
        this.startAutoPlay();
      }
      return this.is_enabled = true;
    };

    return CarouselFull;

  })();

module.exports = CarouselFull;