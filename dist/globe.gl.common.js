'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var three$1 = require('three');
var ThreeGlobe = _interopDefault(require('three-globe'));
var ThreeRenderObjects = _interopDefault(require('three-render-objects'));
var accessorFn = _interopDefault(require('accessor-fn'));
var Kapsule = _interopDefault(require('kapsule'));
var TWEEN = _interopDefault(require('@tweenjs/tween.js'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function linkKapsule (kapsulePropName, kapsuleType) {
  var dummyK = new kapsuleType(); // To extract defaults

  return {
    linkProp: function linkProp(prop) {
      // link property config
      return {
        "default": dummyK[prop](),
        onChange: function onChange(v, state) {
          state[kapsulePropName][prop](v);
        },
        triggerUpdate: false
      };
    },
    linkMethod: function linkMethod(method) {
      // link method pass-through
      return function (state) {
        var kapsuleInstance = state[kapsulePropName];

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var returnVal = kapsuleInstance[method].apply(kapsuleInstance, args);
        return returnVal === kapsuleInstance ? this // chain based on the parent object, not the inner kapsule
        : returnVal;
      };
    }
  };
}

var three = window.THREE ? window.THREE // Prefer consumption from global THREE, if exists
: {
  AmbientLight: three$1.AmbientLight,
  DirectionalLight: three$1.DirectionalLight,
  Vector2: three$1.Vector2
};
// Expose config from ThreeGlobe

var bindGlobe = linkKapsule('globe', ThreeGlobe);
var linkedGlobeProps = Object.assign.apply(Object, _toConsumableArray(['globeImageUrl', 'bumpImageUrl', 'showAtmosphere', 'showGraticules', 'pointsData', 'pointLat', 'pointLng', 'pointColor', 'pointAltitude', 'pointRadius', 'pointResolution', 'pointsMerge', 'pointsTransitionDuration', 'arcsData', 'arcStartLat', 'arcStartLng', 'arcEndLat', 'arcEndLng', 'arcColor', 'arcAltitude', 'arcAltitudeAutoScale', 'arcStroke', 'arcCurveResolution', 'arcCircularResolution', 'arcDashLength', 'arcDashGap', 'arcDashInitialGap', 'arcDashAnimateTime', 'arcsTransitionDuration', 'polygonsData', 'polygonGeoJsonGeometry', 'polygonCapColor', 'polygonSideColor', 'polygonStrokeColor', 'polygonAltitude', 'polygonsTransitionDuration', 'pathsData', 'pathPoints', 'pathPointLat', 'pathPointLng', 'pathPointAlt', 'pathResolution', 'pathColor', 'pathStroke', 'pathDashLength', 'pathDashGap', 'pathDashInitialGap', 'pathDashAnimateTime', 'pathTransitionDuration', 'hexBinPointsData', 'hexBinPointLat', 'hexBinPointLng', 'hexBinPointWeight', 'hexBinResolution', 'hexMargin', 'hexTopColor', 'hexSideColor', 'hexAltitude', 'hexBinMerge', 'hexTransitionDuration', 'hexPolygonsData', 'hexPolygonGeoJsonGeometry', 'hexPolygonColor', 'hexPolygonAltitude', 'hexPolygonResolution', 'hexPolygonMargin', 'hexPolygonsTransitionDuration', 'labelsData', 'labelLat', 'labelLng', 'labelAltitude', 'labelRotation', 'labelText', 'labelSize', 'labelTypeFace', 'labelColor', 'labelResolution', 'labelIncludeDot', 'labelDotRadius', 'labelDotOrientation', 'labelsTransitionDuration', 'customLayerData', 'customThreeObject', 'customThreeObjectUpdate'].map(function (p) {
  return _defineProperty({}, p, bindGlobe.linkProp(p));
})));
var linkedGlobeMethods = Object.assign.apply(Object, _toConsumableArray(['globeMaterial', 'getCoords', 'toGeoCoords'].map(function (p) {
  return _defineProperty({}, p, bindGlobe.linkMethod(p));
}))); // Expose config from renderObjs

var bindRenderObjs = linkKapsule('renderObjs', ThreeRenderObjects);
var linkedRenderObjsProps = Object.assign.apply(Object, _toConsumableArray(['width', 'height', 'backgroundColor', 'backgroundImageUrl', 'enablePointerInteraction'].map(function (p) {
  return _defineProperty({}, p, bindRenderObjs.linkProp(p));
}))); //

var GLOBE_RADIUS = 100;
var globe = Kapsule({
  props: _objectSpread2(_objectSpread2({
    onZoom: {
      triggerUpdate: false
    },
    pointLabel: {
      "default": 'name',
      triggerUpdate: false
    },
    onPointClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onPointRightClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onPointHover: {
      "default": function _default() {},
      triggerUpdate: false
    },
    arcLabel: {
      "default": 'name',
      triggerUpdate: false
    },
    onArcClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onArcRightClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onArcHover: {
      "default": function _default() {},
      triggerUpdate: false
    },
    polygonLabel: {
      "default": 'name',
      triggerUpdate: false
    },
    onPolygonClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onPolygonRightClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onPolygonHover: {
      "default": function _default() {},
      triggerUpdate: false
    },
    pathLabel: {
      "default": 'name',
      triggerUpdate: false
    },
    onPathClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onPathRightClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onPathHover: {
      "default": function _default() {},
      triggerUpdate: false
    },
    hexLabel: {
      triggerUpdate: false
    },
    onHexClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onHexRightClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onHexHover: {
      "default": function _default() {},
      triggerUpdate: false
    },
    hexPolygonLabel: {
      triggerUpdate: false
    },
    onHexPolygonClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onHexPolygonRightClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onHexPolygonHover: {
      "default": function _default() {},
      triggerUpdate: false
    },
    labelLabel: {
      triggerUpdate: false
    },
    onLabelClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onLabelRightClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onLabelHover: {
      "default": function _default() {},
      triggerUpdate: false
    },
    customLayerLabel: {
      "default": 'name',
      triggerUpdate: false
    },
    onCustomLayerClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onCustomLayerRightClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onCustomLayerHover: {
      "default": function _default() {},
      triggerUpdate: false
    }
  }, linkedGlobeProps), linkedRenderObjsProps),
  methods: _objectSpread2({
    pauseAnimation: function pauseAnimation(state) {
      if (state.animationFrameRequestId !== null) {
        cancelAnimationFrame(state.animationFrameRequestId);
        state.animationFrameRequestId = null;
      }

      return this;
    },
    resumeAnimation: function resumeAnimation(state) {
      if (state.animationFrameRequestId === null) {
        this._animationCycle();
      }

      return this;
    },
    _animationCycle: function _animationCycle(state) {
      // Frame cycle
      state.renderObjs.tick();
      state.animationFrameRequestId = requestAnimationFrame(this._animationCycle);
    },
    pointOfView: function pointOfView(state) {
      var geoCoords = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var transitionDuration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var curGeoCoords = getGeoCoords(); // Getter

      if (geoCoords.lat === undefined && geoCoords.lng === undefined && geoCoords.altitude === undefined) {
        return curGeoCoords;
      } else {
        // Setter
        var finalGeoCoords = Object.assign({}, curGeoCoords, geoCoords);

        if (!transitionDuration) {
          // no animation
          setCameraPos(finalGeoCoords);
        } else {
          // Avoid rotating more than 180deg longitude
          while (curGeoCoords.lng - finalGeoCoords.lng > 180) {
            curGeoCoords.lng -= 360;
          }

          while (curGeoCoords.lng - finalGeoCoords.lng < -180) {
            curGeoCoords.lng += 360;
          }

          new TWEEN.Tween(curGeoCoords).to(finalGeoCoords, transitionDuration).easing(TWEEN.Easing.Cubic.InOut).onUpdate(setCameraPos).start();
        }

        return this;
      } //


      function getGeoCoords() {
        return state.globe.toGeoCoords(state.renderObjs.cameraPosition());
      }

      function setCameraPos(_ref4) {
        var lat = _ref4.lat,
            lng = _ref4.lng,
            altitude = _ref4.altitude;
        state.renderObjs.cameraPosition(state.globe.getCoords(lat, lng, altitude));
      }
    },
    scene: function scene(state) {
      return state.renderObjs.scene();
    },
    // Expose scene
    camera: function camera(state) {
      return state.renderObjs.camera();
    },
    // Expose camera
    renderer: function renderer(state) {
      return state.renderObjs.renderer();
    },
    // Expose renderer
    controls: function controls(state) {
      return state.renderObjs.controls();
    },
    // Expose controls
    _destructor: function _destructor() {
      this.pauseAnimation();
      this.pointsData([]);
      this.arcsData([]);
      this.polygonsData([]);
      this.pathsData([]);
      this.hexBinPointsData([]);
      this.hexPolygonsData([]);
      this.labelsData([]);
      this.customLayerData([]);
    }
  }, linkedGlobeMethods),
  stateInit: function stateInit(_ref5) {
    var rendererConfig = _ref5.rendererConfig,
        _ref5$waitForGlobeRea = _ref5.waitForGlobeReady,
        waitForGlobeReady = _ref5$waitForGlobeRea === void 0 ? true : _ref5$waitForGlobeRea,
        globeInitConfig = _objectWithoutProperties(_ref5, ["rendererConfig", "waitForGlobeReady"]);

    return {
      globe: new ThreeGlobe(_objectSpread2({
        waitForGlobeReady: waitForGlobeReady
      }, globeInitConfig)),
      renderObjs: ThreeRenderObjects({
        controlType: 'orbit',
        rendererConfig: rendererConfig,
        waitForLoadComplete: waitForGlobeReady
      }).skyRadius(GLOBE_RADIUS * 500).showNavInfo(false)
    };
  },
  init: function init(domNode, state) {
    var _this = this;

    // Wipe DOM
    domNode.innerHTML = ''; // Add relative container

    domNode.appendChild(state.container = document.createElement('div'));
    state.container.style.position = 'relative'; // Add renderObjs

    var roDomNode = document.createElement('div');
    state.container.appendChild(roDomNode);
    state.renderObjs(roDomNode); // inject renderer size on three-globe

    state.globe.rendererSize(state.renderObjs.renderer().getSize(new three.Vector2())); // set initial distance

    this.pointOfView({
      altitude: 2.5
    }); // calibrate orbit controls

    var controls = state.renderObjs.controls();
    controls.minDistance = GLOBE_RADIUS * 1.01; // just above the surface

    setTimeout(function () {
      return controls.maxDistance = GLOBE_RADIUS * 100;
    }); // apply async  after renderObjs sets maxDistance

    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.3;
    controls.zoomSpeed = 0.3;
    controls.addEventListener('change', function () {
      // adjust controls speed based on altitude
      var pov = _this.pointOfView();

      controls.rotateSpeed = pov.altitude * 0.2; // Math.pow(pov.altitude + 1, 2) * 0.025;

      controls.zoomSpeed = (pov.altitude + 1) * 0.1; // Math.sqrt(pov.altitude) * 0.2;

      state.onZoom && state.onZoom(pov);
    }); // config renderObjs

    var getGlobeObj = function getGlobeObj(object) {
      var obj = object; // recurse up object chain until finding the globe object

      while (obj && !obj.hasOwnProperty('__globeObjType')) {
        obj = obj.parent;
      }

      return obj;
    };

    var dataAccessors = {
      point: function point(d) {
        return d;
      },
      arc: function arc(d) {
        return d;
      },
      polygon: function polygon(d) {
        return d.data;
      },
      path: function path(d) {
        return d;
      },
      hexbin: function hexbin(d) {
        return d;
      },
      hexPolygon: function hexPolygon(d) {
        return d;
      },
      label: function label(d) {
        return d;
      },
      custom: function custom(d) {
        return d;
      }
    };
    state.renderObjs.objects([// Populate scene
    new three.AmbientLight(0xbbbbbb), new three.DirectionalLight(0xffffff, 0.6), state.globe]).hoverOrderComparator(function (a, b) {
      var aObj = getGlobeObj(a);
      var bObj = getGlobeObj(b); // de-prioritize background / non-globe objects

      var isBackground = function isBackground(o) {
        return !o;
      }; // || o.__globeObjType === 'globe' || o.__globeObjType === 'atmosphere';


      return isBackground(aObj) - isBackground(bObj);
    }).lineHoverPrecision(0.2).tooltipContent(function (obj) {
      var objAccessors = {
        point: state.pointLabel,
        arc: state.arcLabel,
        polygon: state.polygonLabel,
        path: state.pathLabel,
        hexbin: state.hexLabel,
        hexPolygon: state.hexPolygonLabel,
        label: state.labelLabel,
        custom: state.customLayerLabel
      };
      var globeObj = getGlobeObj(obj);
      var objType = globeObj.__globeObjType;
      return globeObj && objAccessors.hasOwnProperty(objType) && dataAccessors.hasOwnProperty(objType) ? accessorFn(objAccessors[objType])(dataAccessors[objType](globeObj.__data)) || '' : '';
    }).onHover(function (obj) {
      // Update tooltip and trigger onHover events
      var hoverObjFns = {
        point: state.onPointHover,
        arc: state.onArcHover,
        polygon: state.onPolygonHover,
        path: state.onPathHover,
        hexbin: state.onHexHover,
        hexPolygon: state.onHexPolygonHover,
        label: state.onLabelHover,
        custom: state.onCustomLayerHover
      };
      var hoverObj = getGlobeObj(obj); // ignore non-recognised obj types

      hoverObj && !hoverObjFns.hasOwnProperty(hoverObj.__globeObjType) && (hoverObj = null);

      if (hoverObj !== state.hoverObj) {
        var prevObjType = state.hoverObj ? state.hoverObj.__globeObjType : null;
        var prevObjData = state.hoverObj ? dataAccessors[prevObjType](state.hoverObj.__data) : null;
        var objType = hoverObj ? hoverObj.__globeObjType : null;
        var objData = hoverObj ? dataAccessors[objType](hoverObj.__data) : null;

        if (prevObjType && prevObjType !== objType) {
          // Hover out
          hoverObjFns[prevObjType](null, prevObjData);
        }

        if (objType) {
          // Hover in
          hoverObjFns[objType](objData, prevObjType === objType ? prevObjData : null);
        }

        state.hoverObj = hoverObj;
      }
    }).onClick(function (obj) {
      if (!obj) return; // ignore background clicks
      // Handle click events on objects

      var objFns = {
        point: state.onPointClick,
        arc: state.onArcClick,
        polygon: state.onPolygonClick,
        path: state.onPathClick,
        hexbin: state.onHexClick,
        hexPolygon: state.onHexPolygonClick,
        label: state.onLabelClick,
        custom: state.onCustomLayerClick
      };
      var globeObj = getGlobeObj(obj);
      var objType = globeObj.__globeObjType;

      if (globeObj && objFns.hasOwnProperty(objType) && dataAccessors.hasOwnProperty(objType)) {
        objFns[objType](dataAccessors[objType](globeObj.__data));
      }
    }).onRightClick(function (obj) {
      if (!obj) return; // ignore background clicks
      // Handle right-click events

      var objFns = {
        point: state.onPointRightClick,
        arc: state.onArcRightClick,
        polygon: state.onPolygonRightClick,
        path: state.onPathRightClick,
        hexbin: state.onHexRightClick,
        hexPolygon: state.onHexPolygonRightClick,
        label: state.onLabelRightClick,
        custom: state.onCustomLayerRightClick
      };
      var globeObj = getGlobeObj(obj);
      var objType = globeObj.__globeObjType;

      if (globeObj && objFns.hasOwnProperty(objType) && dataAccessors.hasOwnProperty(objType)) {
        objFns[objType](dataAccessors[objType](globeObj.__data));
      }
    }); //
    // Kick-off renderer

    this._animationCycle();
  }
});

module.exports = globe;
