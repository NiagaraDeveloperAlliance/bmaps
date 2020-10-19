define([
  'baja!',
  'baja!baja:IStatus',
  'bajaux/Widget',
  'bajaux/mixin/subscriberMixIn',
  'jquery',
  'Promise',
  'underscore',
  'hbs!nmodule/bmaps/rc/BMapsWidgetTemplate',
  'hbs!nmodule/bmaps/rc/PopupTemplate',
  'lex!bmaps',
  'log!bmaps',
  // 'nmodule/js/rc/log/Log',
  'css!nmodule/bmaps/rc/BMapsWidgetStyle',
  // '!nmodule/vrf/rc/bootstrap/js/bootstrap.bundle',
  // 'css!nmodule/vrf/rc/bootstrap/css/bootstrap',
  // 'css!nmodule/vrf/rc/fontawesome/css/fontawesome-all',
], function (
  baja,
  types,
  Widget,
  subscriberMixIn,
  $,
  Promise,
  _,
  bMapsTemplate,
  popupTemplate,
  lexicons,
  console
  // Log
) {
  'use strict';

  var BMAPS_CLASS = 'bMapsWidget',
    OK_IMAGE_URI = '/module/bmaps/rc/ok.png',
    ALARM_IMAGE_URI = '/module/bmaps/rc/alarm.gif',
    LEX = lexicons[0];

  /**
   * Loads a map into a widget. Queries the station to display live data.
   *
   * @private
   * @class
   * @alias module:nmodule/bmaps/rc/BMapsWidget
   */
  var BMapsWidget = function () {
    var that = this;
    Widget.apply(that, arguments);

    var // => '12.0pt sans-serif'
      DEFAULT_FONT_VALUE = 'null',
      DEFAULT_FONT_SIZE = 12;
    that
      .properties()
      .add('ak', 'ZwiEh3WHhKnNRX8Kb9i56NrBBk1VkwDq')
      .add('position', '116.404,39.915')
      .add({
        name: 'zoom',
        value: 15,
        typeSpec: 'baja:Integer',
      })
      .add('footprint', false)
      .add({
        name: 'show3D',
        value: true,
        typeSpec: 'baja:Boolean',
        metadata: { trueText: 'show3D', falseText: 'hide3D' },
      })
      .add('icon', '')
      .add('childRelation', 'm:child')
      .add({
        name: 'textColor',
        value: '#3a3a3a',
        typeSpec: 'gx:Color',
      })
      .add({
        name: 'font',
        value: DEFAULT_FONT_VALUE,
        typeSpec: 'gx:Font',
      })
      .add('showAlarmIcon', true)
      .add('search3dAnimation', false); // not working yet

    subscriberMixIn(that);
  };

  BMapsWidget.prototype = new Widget();
  BMapsWidget.prototype.constructor = BMapsWidget;

  /**
   * Decode and return the longitude and latitude from a String in the form of
   * '116.404,39.915',
   *
   * @private
   * @inner
   *
   * @param {String} data The data to decode.
   * @returns {Object} An object that contains a lng and lat property.
   */
  function decodeLatLong(data) {
    var position = data.split(',');
    return {
      lng: parseFloat(position.length > 1 ? position[0].trim() : 0),
      lat: parseFloat(position.length > 1 ? position[1].trim() : 0),
    };
  }

  /**
   * Retrieve the first Baidu map container element matched by the jQuery object.
   *
   * @private
   * @inner
   *
   * @param {jQuery} jq The element in which this Widget should build its HTML.
   * @returns {HTMLElement} The first Baidu map container html element
   */
  function getMapContainer(jq) {
    var jObj = getDomBy(jq, 'div#container');
    return jObj.get(0);
  }

  /**
   * Get the descendants of each element in the current set of matched elements,
   * filtered by a selector, jQuery object, or element.
   *
   * @private
   * @inner
   *
   * @param {jQuery} jq The element in which this Widget should build its HTML.
   * @param {jQuery|HTMLElement} selector A string containing a selector expression to match elements against.
   * @returns {jQuery} jQuery object
   */
  function getDomBy(jq, selector) {
    return jq.find(selector);
  }

  BMapsWidget.prototype.doInitialize = function (dom) {
    var that = this;
    console.fine('BMapsWidget initializing');
    dom.addClass(BMAPS_CLASS);
    dom.html(bMapsTemplate({}));

    // todo remove this
    var mapApi = 'https://api.map.baidu.com/api?v=3.0&ak=' + that.properties().getValue('ak');

    var mapGLApi =
      'https://api.map.baidu.com/api?type=webgl&v=1.0&ak=' + that.properties().getValue('ak');
    return new Promise(function (resolve, reject) {
      // wait for Baidu Map API to load inside the page
      require(['async!' + mapApi, 'async!' + mapGLApi], function () {
        console.fine('Baidu Map API initialized');
        that.points = {};
        // utilize Baidu Map JavaScript
        that.$bmaps = BMapGL;
        that.$map = new that.$bmaps.Map(getMapContainer(dom));
        var central = decodeLatLong(that.properties().getValue('position'));
        var point = new that.$bmaps.Point(central.lng, central.lat);
        that.$map.centerAndZoom(point, that.properties().getValue('zoom'));
        that.$map.enableScrollWheelZoom(true);
        that.$map.addControl(new that.$bmaps.NavigationControl3D());
        that.$map.addControl(new that.$bmaps.ScaleControl());
        that.$map.addControl(new that.$bmaps.MapTypeControl());

        // create center point icon
        var markerIcon = that.properties().getValue('icon');
        if (markerIcon) {
          var icon = new that.$bmaps.Icon(markerIcon, new that.$bmaps.Size(300, 157));
          var marker = new that.$bmaps.Marker(point, { icon: icon });
          that.$map.addOverlay(marker);
        }
        // attach click event handler
        var attachClickEvent = that.properties().getValue('footprint');
        if (attachClickEvent) {
          that.$map.addEventListener('click', function (e) {
            console.info('lng:{},lat:{}', e.point.lng, e.point.lat);
          });
        }

        //! api for search
        function G(id) {
          return document.getElementById(id);
        }
        var ac = new that.$bmaps.Autocomplete({ input: 'suggestId', location: that.$map }); //建立一个自动完成的对象

        ac.addEventListener('onhighlight', function (e) {
          //   //鼠标放在下拉列表上的事件
          var str = '';
          var _value = e.fromitem.value;
          var value = '';
          if (e.fromitem.index > -1) {
            value =
              _value.province + _value.city + _value.district + _value.street + _value.business;
          }
          str = 'FromItem<br />index = ' + e.fromitem.index + '<br />value = ' + value;

          value = '';
          if (e.toitem.index > -1) {
            _value = e.toitem.value;
            value =
              _value.province + _value.city + _value.district + _value.street + _value.business;
          }
          str += '<br />ToItem<br />index = ' + e.toitem.index + '<br />value = ' + value;
          G('searchResultPanel').innerHTML = str;
        });

        var myValue;
        ac.addEventListener('onconfirm', function (e) {
          //鼠标点击下拉列表后的事件
          var _value = e.item.value;
          myValue =
            _value.province + _value.city + _value.district + _value.street + _value.business;
          G('searchResultPanel').innerHTML =
            'onconfirm<br />index = ' + e.item.index + '<br />myValue = ' + myValue;

          setPlace();
        });

        function setPlace() {
          // that.$map.clearOverlays(); //清除地图上所有覆盖物
          function myFun() {
            var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果

            if (that.properties().getValue('search3dAnimation')) {
              that.$map.setTilt(50); // 设置地图初始倾斜角
              // console.fine(JSON.stringify(local.getResults().getPoi(0)));
              // console.fine(point);
              var keyFrames = [
                {
                  center: point,
                  zoom: 18,
                  // tilt: 50,
                  // heading: 0,
                  percentage: 0,
                },
                {
                  center: new that.$bmaps.Point(pp.lng, pp.lag),
                  zoom: 19,
                  // tilt: 70,
                  // heading: 0,
                  percentage: 1,
                },
              ];
              var opts = {
                // duration: 3000,
                // delay: 1000,
                // interation: 'INFINITE',
              };

              // 声明动画对象
              var animation = new BMapGL.ViewAnimation(keyFrames, opts);
              // 监听事件
              animation.addEventListener('animationstart', function (e) {
                console.fine('start');
              });
              animation.addEventListener('animationiterations', function (e) {
                console.fine('onanimationiterations');
              });
              animation.addEventListener('animationend', function (e) {
                console.fine('end');
              });
              // 开始播放动画
              setTimeout(that.$map.startViewAnimation(animation), 0);
            } else {
              that.$map.centerAndZoom(pp, 18);
            }
            that.$map.addOverlay(new that.$bmaps.Marker(pp)); //添加标注
          }
          var local = new that.$bmaps.LocalSearch(that.$map, {
            //智能搜索
            onSearchComplete: myFun,
          });
          local.search(myValue);
        }
        //! api for search
        resolve();
      });
    });
  };

  /**
   * Return the icon to use for a component. If the component is deemed to be in alarm then
   * return an alarm icon.
   *
   * @private
   * @inner
   *
   * @param  comp The target component.
   * @returns {String} The icon to use for the marker.
   */
  function getMarkerIcon(comp) {
    return isAlarm(comp) ? ALARM_IMAGE_URI : OK_IMAGE_URI;
  }

  function isAlarm(comp) {
    if (comp.getType().is('baja:IStatus')) {
      var status = baja.Status.getStatusFromIStatus(comp);

      if (status && status.isAlarm()) {
        return true;
      }
    }
    return false;
  }

  /**
   * Add a marker to the map.
   *
   * @private
   * @inner
   *
   * @param widget The widget that contains the map.
   * @param comp The component that will be added to the map.
   */
  function addMarker(widget, comp) {
    var bmaps = widget.$bmaps,
      map = widget.$map,
      latLong = decodeLatLong(comp.get(baja.ComponentTags.idToSlotName('n:geoCoord'))),
      pnt = new bmaps.Point(latLong.lng, latLong.lat),
      // todo : size global macro, now init with ok
      icon = new bmaps.Icon(OK_IMAGE_URI, new bmaps.Size(12, 20)),
      marker = new bmaps.Marker(pnt, {
        icon: icon,
        title: comp.getDisplayName(),
      }),
      infoWindow = new bmaps.InfoWindow(),
      updateInfoContents;
    var compSub = new baja.Subscriber();
    var childComps;
    var updateInfoContentsWrapper;
    var updateInfoContentsWrapperDebounce;
    var hasAlarm = false;
    var title = comp.getDisplay('title') || comp.getDisplayName();
    // console.fine(title);
    // this requires constantly subscribe all the points, so performance is
    // bad, ony enable this when user enables
    var showAlarmIcon = widget.properties().getValue('showAlarmIcon');

    // add marker to the map
    map.addOverlay(marker);
    widget.points[title] = latLong;
    
    
    var compOrd = comp.getNavOrd().relativizeToSession().toString();
    var ordATag =
      "<a target='new' href='javascript:window.top.niagara.env.hyperlink(\"" +
        compOrd +
        '");\'>' +
        title+ '</a>';
    infoWindow.setTitle(ordATag);
    infoWindow.setHeight(600);

    // parent component is the one with tag 'geoCoord'
    function isParentComponentStateOK() {
      return _.every(childComps, function (childComp) {
        return !isAlarm(childComp);
      });
    }

    function getParentComponentMarkerIcon() {
      return isParentComponentStateOK() ? OK_IMAGE_URI : ALARM_IMAGE_URI;
    }

    function updateIcon() {
      var newIcon = new bmaps.Icon(getParentComponentMarkerIcon(), new bmaps.Size(12, 20));
      marker.setIcon(newIcon);
    }

    fetchChildren()
      .then(function () {
        updateIcon();
        // since we already subscribe all the points before click
        // the updateIcon function does not seem to a lot of work,
        // it might be ok to run this without the if statement,
        // we just need to unsubscribe after close
        if (showAlarmIcon) {
          compSub.attach('changed', _.debounce(updateIcon, 200));
        }
      })
      .catch(function (err) {
        console.fine('failed: update icon ' + err);
      });

    function fetchChildren() {
      return new Promise(function (resolve, reject) {
        comp
          .relations()
          .then(function (relations) {
            var childOrds = relations
              .getAll() // todo get by id
              .filter(function (relation) {
                return (
                  relation.getId().toString() === widget.properties().getValue('childRelation')
                );
              })
              // .map((relation) => baja.Ord.make('station:|'+relation.getEndpointOrd().toString()));
              .map(function (relation) {
                return relation.getEndpointOrd();
              });

            return new baja.BatchResolve(childOrds).resolve({
              base: comp,
              subscriber: compSub,
            });
          })
          .then(function (batchResolve) {
            childComps = batchResolve.getTargetObjects();
            resolve();
          })
          .catch(function (err) {
            console.fine('failed: fetchChildren: ' + err);
            reject();
          });
      });
    }
    
    updateInfoContents = function () {
      if (this === comp) {
        console.fine('running update');
        var data = {
          ord: comp.getNavOrd().relativizeToSession().toString(),
          displayName: comp.getDisplay('title') || comp.getDisplayName(),
          // name: LEX.get('name'),
          // display: LEX.get('display'),
          rows: [],
          alarmCount: 0,
        };
        _.each(childComps, function (comp) {
          var row = {
            displayName: comp.getDisplayName(),
            value: '',
          };
          if (isAlarm(comp)) {
            data.alarmCount += 1;
            row.alarm = true;
          }
          var outVal = comp.getValueOf('out');
          if (!outVal) {
            data.rows.push(row);
            return;
          }
          var outValString = outVal.toString();
          var index = outValString.indexOf('{'); //!!!!!!!!!! very bad
          var displayValue = outValString.substring(0, index);
          row.value = displayValue;
          data.rows.push(row);
        });
        // console.fine(JSON.stringify(data.rows));

        // ! for componenet itself (run once when click) slot should
        // ! be summary and should not change frequently

        var targetSummarySlots = ['title', 'description', 'imgSrc'];

        comp
          .getSlots()
          .flags(baja.Flags.SUMMARY)
          .each(function (slot) {
            var displayName = comp.getDisplayName(slot);
            // console.fine(slot);
            if (targetSummarySlots.includes(displayName)) {
              data[displayName] = comp.getDisplay(slot);
              // console.fine(data);
              return;
            }
            // data.rows = data.rows || [];
            data.rows.push({
              displayName: comp.getDisplayName(slot),
              value: comp.getDisplay(slot) || comp.get(slot),
            });
          });
        // console.fine(JSON.stringify(data));
        // console.fine(data.title);
        // infoWindow.setTitle(ordATag);

        infoWindow.setContent(popupTemplate(data));
        // infoWindow.setMaxContent(popupTemplate(data));

        // infoWindow.enableMaximize();
        if (infoWindow.isOpen()) {
          // console.info('redraw window');
          // redraw current infowindow
          infoWindow.redraw();
        } else {
          // Log.info('close and draw new window');
          map.openInfoWindow(infoWindow, pnt);
          // infoWindow.maximize();
        }

      }
    };
    updateInfoContentsWrapper = function () {
      // console.fine(comp.getDisplayName())
      return updateInfoContents.call(comp);
    };

    updateInfoContentsWrapperDebounce = _.debounce(updateInfoContentsWrapper, 500);

    marker.addEventListener('click', function () {
      // when click we only attach the updateInfoContentsWrapperDebounce function
      updateInfoContentsWrapper();
      compSub.attach('changed', updateInfoContentsWrapperDebounce);
    });

    infoWindow.addEventListener('close', function () {
      console.fine('close event fired');
      compSub.detach('changed', updateInfoContentsWrapperDebounce);
      if (!showAlarmIcon) {
        compSub.unsubscribeAll();
      }
    });
    infoWindow.addEventListener('clickclose', function () {
      compSub.detach('changed', updateInfoContentsWrapperDebounce);

      if (!showAlarmIcon) {
        compSub.unsubscribeAll();
      }
    });
  }

  BMapsWidget.prototype.doLoad = function (table) {
    var that = this;

    console.fine('BMapsWidget loading');
    // load the results of the query onto the Map.
    return table
      .cursor()
      .then(function (cursor) {
        var entities = [];
        cursor.each(function () {
          entities.push(this.get());
        });
        return entities;
      })
      .then(function (entities) {
        return Promise.all(
          _.map(entities, function (entity) {
            return entity.tags();
          })
        );
      })
      .then(function (tagSets) {
        tagSets = _.filter(tagSets, function (tags) {
          return tags.contains('n:ordInSession') && tags.contains('n:geoCoord');
        });

        var ords = _.map(tagSets, function (tags) {
          return tags.get('n:ordInSession');
        });
        // console.fine(ords);

        return new baja.BatchResolve(ords).resolve({ subscriber: that.getSubscriber() });
      })
      .then(function (batchResolve) {
        var comps = batchResolve.getTargetObjects();

        _.each(comps, function (comp) {
          addMarker(that, comp);
        });
      });
  };

  BMapsWidget.prototype.doDestroy = function () {
    this.jq().removeClass(BMAPS_CLASS);
  };

  return BMapsWidget;
});
