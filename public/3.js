(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/slide/SlideForm.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/slide/SlideForm.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/slide/SlideTable.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/slide/SlideTable.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/helpers/tools */ "./resources/js/helpers/tools.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      pagination: {},
      keyword: null
    };
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_2__["mapGetters"])("slide", ["loading", "slides", "getSlideById"]), {
    columns: function columns() {
      var columns = [{
        title: "#No",
        scopedSlots: {
          customRender: "no"
        }
      }, {
        title: "Tiêu đề",
        dataIndex: "title",
        sorter: true
      }, {
        title: "Hình",
        dataIndex: "image",
        align: "center",
        width: "30%",
        scopedSlots: {
          customRender: "image"
        }
      }, {
        title: "Link",
        dataIndex: "link",
        scopedSlots: {
          customRender: "link"
        }
      }, {
        title: "Active",
        align: "center",
        scopedSlots: {
          customRender: "active"
        }
      }, {
        title: "Created at",
        dataIndex: "created_at",
        sorter: true
      }, {
        title: "Tùy chọn",
        align: "center",
        scopedSlots: {
          customRender: "action"
        }
      }];
      return columns;
    }
  }),
  created: function created() {
    this.fetch();
    eventBus.$on("retrieveSlides", this.retrieveSlides);
  },
  beforeDestroy: function beforeDestroy() {
    eventBus.$off("retrieveSlides", this.retrieveSlides);
  },
  methods: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_2__["mapActions"])("slide", ["fetchSlides", "updateActiveSlide", "deleteSlide"]), {
    retrieveSlides: function retrieveSlides() {
      this.fetch();
    },
    onOpen: function onOpen() {
      eventBus.$emit("openDrawerSlide", true);
    },
    onUpdate: function onUpdate(slideId) {
      var roleUpdate = this.getSlideById(slideId);
      eventBus.$emit("setFormSlide", roleUpdate, slideId, true, true);
    },
    onDelete: function onDelete(slideId) {
      this.deleteSlide(slideId);
      this.fetch();
    },
    onSearch: function onSearch(value, event) {
      if (Object(_helpers_tools__WEBPACK_IMPORTED_MODULE_1__["isNotNull"])(value)) {
        var params = {
          page: this.pagination.current,
          keyword: value
        };
        this.fetch(params);
        this.keyword = value;
      }
    },
    onReset: function onReset() {
      this.retrieveSlides();
      this.keyword = null;
    },
    onChangeActive: function onChangeActive(e) {
      var slide = {
        id: e.target.value,
        values: {
          is_active: e.target.checked
        }
      };
      this.updateActiveSlide(slide);
    },
    fetch: function fetch() {
      var _this = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var pagination, _ref, data, config;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                pagination = _objectSpread({}, _this.pagination);
                _context.next = 3;
                return _this.fetchSlides(params);

              case 3:
                _ref = _context.sent;
                data = _ref.data;
                config = _ref.config;
                window.history.replaceState("slides", "", config.url);
                pagination.total = data.meta.total;
                pagination.pageSize = data.meta.per_page;
                pagination.current = data.meta.current_page;
                _this.pagination = pagination;

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    onChange: function onChange(pagination, filters, sorter) {
      var pager = _objectSpread({}, this.pagination);

      pager.current = pagination.current;
      this.pagination = pager;
      var params = {
        page: pagination.current,
        sortBy: sorter.field,
        orderBy: sorter.order === "ascend" ? "asc" : sorter.order === "descend" ? "desc" : undefined,
        keyword: this.keyword
      };
      this.fetch(params);
    },
    tagColor: function tagColor(v) {
      return Object(_helpers_tools__WEBPACK_IMPORTED_MODULE_1__["tagColor"])(v);
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/admin/Slide.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/admin/Slide.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_admin_slide_SlideTable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/admin/slide/SlideTable */ "./resources/js/components/admin/slide/SlideTable.vue");
/* harmony import */ var _components_admin_slide_SlideForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/admin/slide/SlideForm */ "./resources/js/components/admin/slide/SlideForm.vue");
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    SlideTable: _components_admin_slide_SlideTable__WEBPACK_IMPORTED_MODULE_0__["default"],
    SlideForm: _components_admin_slide_SlideForm__WEBPACK_IMPORTED_MODULE_1__["default"]
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/slide/SlideForm.vue?vue&type=template&id=ffead8c8&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/slide/SlideForm.vue?vue&type=template&id=ffead8c8& ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/slide/SlideTable.vue?vue&type=template&id=bcf96db4&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/slide/SlideTable.vue?vue&type=template&id=bcf96db4& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "a-card",
    { attrs: { title: "Danh sách slide", bordered: false } },
    [
      _c(
        "div",
        { attrs: { slot: "extra" }, slot: "extra" },
        [
          _c(
            "a-button",
            {
              attrs: { type: "primary", icon: "plus" },
              on: { click: _vm.onOpen }
            },
            [_vm._v("Thêm")]
          ),
          _vm._v(" "),
          _c("a-button", {
            style: { marginLeft: "8px" },
            attrs: { icon: "sync" },
            on: { click: _vm.onReset }
          }),
          _vm._v(" "),
          _c("a-input-search", {
            staticStyle: { "margin-left": "8px", width: "250px" },
            attrs: { placeholder: "Tìm kiếm..." },
            on: { search: _vm.onSearch },
            model: {
              value: _vm.keyword,
              callback: function($$v) {
                _vm.keyword = $$v
              },
              expression: "keyword"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("a-table", {
        attrs: {
          columns: _vm.columns,
          loading: _vm.loading,
          rowKey: function(record) {
            return record.id
          },
          dataSource: _vm.slides,
          pagination: _vm.pagination
        },
        on: { change: _vm.onChange },
        scopedSlots: _vm._u([
          {
            key: "no",
            fn: function(text, record, index) {
              return [_c("strong", [_vm._v(_vm._s(++index))])]
            }
          },
          {
            key: "image",
            fn: function(record) {
              return [
                _c("span", [_vm._v("\n        " + _vm._s(record) + "\n      ")])
              ]
            }
          },
          {
            key: "link",
            fn: function(record) {
              return [
                _c("router-link", { attrs: { to: record } }, [
                  _vm._v("\n        Link to description\n      ")
                ])
              ]
            }
          },
          {
            key: "active",
            fn: function(record) {
              return [
                _c("a-checkbox", {
                  attrs: { defaultChecked: record.is_active, value: record.id },
                  on: { change: _vm.onChangeActive }
                })
              ]
            }
          },
          {
            key: "action",
            fn: function(record) {
              return [
                _c(
                  "a-button",
                  {
                    attrs: { type: "dashed", size: "small" },
                    on: {
                      click: function($event) {
                        return _vm.onUpdate(record.id)
                      }
                    }
                  },
                  [_c("a-icon", { attrs: { type: "edit" } })],
                  1
                ),
                _vm._v(" "),
                _c("a-divider", { attrs: { type: "vertical" } }),
                _vm._v(" "),
                _vm.slides.length
                  ? _c(
                      "a-popconfirm",
                      {
                        attrs: { title: "Bạn có chắc chắn?" },
                        on: {
                          confirm: function($event) {
                            return _vm.onDelete(record.id)
                          }
                        }
                      },
                      [
                        _c(
                          "a-button",
                          { attrs: { type: "dashed", size: "small" } },
                          [_c("a-icon", { attrs: { type: "delete" } })],
                          1
                        )
                      ],
                      1
                    )
                  : _vm._e()
              ]
            }
          }
        ])
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/admin/Slide.vue?vue&type=template&id=31371f78&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/admin/Slide.vue?vue&type=template&id=31371f78& ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [_c("slide-table"), _vm._v(" "), _c("slide-form")], 1)
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/admin/slide/SlideForm.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/admin/slide/SlideForm.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SlideForm_vue_vue_type_template_id_ffead8c8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SlideForm.vue?vue&type=template&id=ffead8c8& */ "./resources/js/components/admin/slide/SlideForm.vue?vue&type=template&id=ffead8c8&");
/* harmony import */ var _SlideForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SlideForm.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/slide/SlideForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SlideForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SlideForm_vue_vue_type_template_id_ffead8c8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SlideForm_vue_vue_type_template_id_ffead8c8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/slide/SlideForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/slide/SlideForm.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/admin/slide/SlideForm.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SlideForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./SlideForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/slide/SlideForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SlideForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/slide/SlideForm.vue?vue&type=template&id=ffead8c8&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/admin/slide/SlideForm.vue?vue&type=template&id=ffead8c8& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SlideForm_vue_vue_type_template_id_ffead8c8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./SlideForm.vue?vue&type=template&id=ffead8c8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/slide/SlideForm.vue?vue&type=template&id=ffead8c8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SlideForm_vue_vue_type_template_id_ffead8c8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SlideForm_vue_vue_type_template_id_ffead8c8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/admin/slide/SlideTable.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/admin/slide/SlideTable.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SlideTable_vue_vue_type_template_id_bcf96db4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SlideTable.vue?vue&type=template&id=bcf96db4& */ "./resources/js/components/admin/slide/SlideTable.vue?vue&type=template&id=bcf96db4&");
/* harmony import */ var _SlideTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SlideTable.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/slide/SlideTable.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SlideTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SlideTable_vue_vue_type_template_id_bcf96db4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SlideTable_vue_vue_type_template_id_bcf96db4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/slide/SlideTable.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/slide/SlideTable.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/admin/slide/SlideTable.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SlideTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./SlideTable.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/slide/SlideTable.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SlideTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/slide/SlideTable.vue?vue&type=template&id=bcf96db4&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/admin/slide/SlideTable.vue?vue&type=template&id=bcf96db4& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SlideTable_vue_vue_type_template_id_bcf96db4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./SlideTable.vue?vue&type=template&id=bcf96db4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/slide/SlideTable.vue?vue&type=template&id=bcf96db4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SlideTable_vue_vue_type_template_id_bcf96db4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SlideTable_vue_vue_type_template_id_bcf96db4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/pages/admin/Slide.vue":
/*!********************************************!*\
  !*** ./resources/js/pages/admin/Slide.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Slide_vue_vue_type_template_id_31371f78___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Slide.vue?vue&type=template&id=31371f78& */ "./resources/js/pages/admin/Slide.vue?vue&type=template&id=31371f78&");
/* harmony import */ var _Slide_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Slide.vue?vue&type=script&lang=js& */ "./resources/js/pages/admin/Slide.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Slide_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Slide_vue_vue_type_template_id_31371f78___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Slide_vue_vue_type_template_id_31371f78___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/admin/Slide.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/admin/Slide.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/pages/admin/Slide.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Slide_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Slide.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/admin/Slide.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Slide_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/admin/Slide.vue?vue&type=template&id=31371f78&":
/*!***************************************************************************!*\
  !*** ./resources/js/pages/admin/Slide.vue?vue&type=template&id=31371f78& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Slide_vue_vue_type_template_id_31371f78___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Slide.vue?vue&type=template&id=31371f78& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/admin/Slide.vue?vue&type=template&id=31371f78&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Slide_vue_vue_type_template_id_31371f78___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Slide_vue_vue_type_template_id_31371f78___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);