
/* START_TEMPLATE */
define('hbs!nmodule/bmaps/rc/BMapsWidgetTemplate',['Handlebars'], function( Handlebars ){ 
var t = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>\n    <meta name=\"viewport\" content=\"initial-scale=1.0, user-scalable=no\"/>\n    <style type=\"text/css\">\n        body, html, #container {\n            width: 100%;\n            height: 100%;\n            overflow: hidden;\n            margin: 0;\n            font-family: \"微软雅黑\";\n        }\n    </style>\n    <title>地图展示</title>\n</head>\n<body>\n<div id=\"container\"></div>\n</body>\n</html>\n";
},"useData":true});
Handlebars.registerPartial('nmodule/bmaps/rc/BMapsWidgetTemplate', t);
return t;
});
/* END_TEMPLATE */
;
/* START_TEMPLATE */
define('hbs!nmodule/bmaps/rc/PopupTemplate',['Handlebars'], function( Handlebars ){ 
var t = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<a target='new' href='javascript:window.top.niagara.env.hyperlink(\""
    + container.escapeExpression(((helper = (helper = helpers.ord || (depth0 != null ? depth0.ord : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"ord","hash":{},"data":data}) : helper)))
    + "\");'>"
    + container.escapeExpression(((helper = (helper = helpers.displayName || (depth0 != null ? depth0.displayName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"displayName","hash":{},"data":data}) : helper)))
    + "</a>\n<br />\n<br />\n<table border='1'>\n  <tr>\n    <th>"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"name","hash":{},"data":data}) : helper)))
    + "</th>\n    <th>"
    + container.escapeExpression(((helper = (helper = helpers.display || (depth0 != null ? depth0.display : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"display","hash":{},"data":data}) : helper)))
    + "</th>\n  </tr>  \n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.rows : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</table>\n<br />\n<br />\n";
},"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.rows : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <tr>\n      <td>"
    + container.escapeExpression(((helper = (helper = helpers.displayName || (depth0 != null ? depth0.displayName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"displayName","hash":{},"data":data}) : helper)))
    + "</td>\n      <td>"
    + container.escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"value","hash":{},"data":data}) : helper)))
    + "</td>\n    </tr>\n";
},"useData":true});
Handlebars.registerPartial('nmodule/bmaps/rc/PopupTemplate', t);
return t;
});
/* END_TEMPLATE */
;
define('nmodule/bmaps/rc/BMapsWidget',['baja!',
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
  'css!nmodule/bmaps/rc/BMapsWidgetStyle'], function (
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
  console) {

  

  var BMAPS_CLASS = "bMapsWidget",
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

    that.properties()
      .add("ak", "10ccd691b6e47c8c2c3fb84f2395c5a1")
      .add("position", "116.404,39.915")
      .add({
        name: 'zoom',
        value: 15,
        typeSpec: 'baja:Integer'
      })
      .add("footprint", false)
      .add("icon", "");

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
    var position = data.split(",");
    return {
      lng: parseFloat(position.length > 1 ? position[0].trim() : 0),
      lat: parseFloat(position.length > 1 ? position[1].trim() : 0)
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
    console.fine("BMapsWidget initializing");
    dom.addClass(BMAPS_CLASS);
    dom.html(bMapsTemplate({}));

    var mapApi = "https://api.map.baidu.com/api?v=3.0&ak=" + that.properties().getValue("ak");

    return new Promise(function (resolve, reject) {
      // wait for Baidu Map API to load inside the page
      require(['async!' + mapApi], function () {
        resolve();

        console.fine("Baidu Map API initialized");
        // utilize Baidu Map JavaScript
        that.$bmaps = BMap;
        that.$map = new that.$bmaps.Map(getMapContainer(dom));
        var central = decodeLatLong(that.properties().getValue("position"));
        var point = new that.$bmaps.Point(central.lng, central.lat);
        that.$map.centerAndZoom(point, that.properties().getValue("zoom"));

        // create center point icon
        var markerIcon = that.properties().getValue("icon");
        if (markerIcon) {
          var icon = new that.$bmaps.Icon(markerIcon, new that.$bmaps.Size(300, 157));
          var marker = new that.$bmaps.Marker(point, { icon: icon });
          that.$map.addOverlay(marker);
        }
        // attach click event handler
        var attachClickEvent = that.properties().getValue("footprint");
        if (attachClickEvent) {
          that.$map.addEventListener("click", function (e) {
            console.info('lng:{},lat:{}', e.point.lng, e.point.lat);
          });
        }
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
    if (comp.getType().is("baja:IStatus")) {
      var status = baja.Status.getStatusFromIStatus(comp);

      if (status && status.isAlarm()) {
        return ALARM_IMAGE_URI;
      }
    }

    return OK_IMAGE_URI;
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
      latLong = decodeLatLong(comp.get(baja.ComponentTags.idToSlotName("n:geoCoord"))),
      pnt = new bmaps.Point(latLong.lng, latLong.lat),
      icon = new bmaps.Icon(getMarkerIcon(comp), new bmaps.Size(12, 20)),
      marker = new bmaps.Marker(pnt, {
        icon: icon,
        title: comp.getDisplayName()
      }),
      infoWindow = new bmaps.InfoWindow(),
      updateInfoContents;

    // add marker to the map
    map.addOverlay(marker);

    widget.getSubscriber().attach("changed", function () {
      if (this === comp) {
        var icon = new bmaps.Icon(getMarkerIcon(comp), new bmaps.Size(12, 20));
        marker.setIcon(icon);
      }
    });

    marker.addEventListener('click', function () {
      updateInfoContents = function () {
        if (this === comp) {
          var data = {
            ord: comp.getNavOrd().relativizeToSession().toString(),
            displayName: comp.getDisplayName(),
            name: LEX.get("name"),
            display: LEX.get("display")
          };

          comp.getSlots().flags(baja.Flags.SUMMARY).each(function (slot) {
            data.rows = data.rows || [];
            data.rows.push({
              displayName: comp.getDisplayName(slot),
              value: comp.getDisplay(slot) || comp.get(slot)
            });
          });

          infoWindow.setContent(popupTemplate(data));
        }
      };

      updateInfoContents.call(comp);
      map.openInfoWindow(infoWindow, pnt);

      widget.getSubscriber().attach("changed", updateInfoContents);
    });

    infoWindow.addEventListener('close', function () {
      widget.getSubscriber().detach("changed", updateInfoContents);
    });
    infoWindow.addEventListener('clickclose', function () {
      widget.getSubscriber().detach("changed", updateInfoContents);
    });
  }

  BMapsWidget.prototype.doLoad = function (table) {
    var that = this;
    console.fine("BMapsWidget loading");
    // load the results of the query onto the Map.
    return table.cursor()
      .then(function (cursor) {
        var entities = [];
        cursor.each(function () {
          entities.push(this.get());
        });
        return entities;
      })
      .then(function (entities) {
        return Promise.all(_.map(entities, function (entity) {
          return entity.tags();
        }));
      })
      .then(function (tagSets) {
        tagSets = _.filter(tagSets, function (tags) {
          return tags.contains("n:ordInSession") && tags.contains("n:geoCoord");
        });

        var ords = _.map(tagSets, function (tags) {
          return tags.get("n:ordInSession");
        });

        return new baja.BatchResolve(ords)
          .resolve({ subscriber: that.getSubscriber() });
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

