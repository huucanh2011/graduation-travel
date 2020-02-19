(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/permission/PermissionTable.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/permission/PermissionTable.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************/
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
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_2__["mapGetters"])("permission", ["loading", "permissions", "roles"]), {
    columns: function columns() {
      var columns = [{
        title: "Họ tên",
        scopedSlots: {
          customRender: "name"
        }
      }, {
        title: "Email",
        dataIndex: "email",
        sorter: true
      }, {
        title: "Trạng thái",
        dataIndex: "is_active",
        sorter: true,
        scopedSlots: {
          customRender: "status"
        }
      }, {
        title: "Active",
        align: "center",
        scopedSlots: {
          customRender: "active"
        }
      }, {
        title: "Quyền",
        key: "action",
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
    this.fetchRoles();
  },
  methods: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_2__["mapActions"])("permission", ["fetchPermissions", "fetchRoles", "updatePermission"]), {
    retrievePermissions: function retrievePermissions() {
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
      this.retrievePermissions();
      this.keyword = null;
    },
    onChangeActive: function onChangeActive(e) {
      var permission = {
        id: e.target.value,
        values: {
          is_active: e.target.checked
        }
      };
      this.updatePermission(permission);
    },
    onChangeRole: function onChangeRole(e) {
      var roleId = e.target.value;
      var userId = +e.target.name.replace("p__", "");
      var permission = {
        id: userId,
        values: {
          role_id: roleId
        }
      };
      this.updatePermission(permission);
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
                return _this.fetchPermissions(params);

              case 3:
                _ref = _context.sent;
                data = _ref.data;
                config = _ref.config;
                window.history.replaceState("permission", "", config.url);
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
    },
    colorActive: function colorActive(v) {
      return Object(_helpers_tools__WEBPACK_IMPORTED_MODULE_1__["colorActive"])(v);
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/admin/Permission.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/admin/Permission.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_admin_permission_PermissionTable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/admin/permission/PermissionTable */ "./resources/js/components/admin/permission/PermissionTable.vue");
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    PermissionTable: _components_admin_permission_PermissionTable__WEBPACK_IMPORTED_MODULE_0__["default"]
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/permission/PermissionTable.vue?vue&type=template&id=7a0c9b2c&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/permission/PermissionTable.vue?vue&type=template&id=7a0c9b2c& ***!
  \***********************************************************************************************************************************************************************************************************************************/
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
    { attrs: { title: "Phân quyền", bordered: false } },
    [
      _c(
        "div",
        { attrs: { slot: "extra" }, slot: "extra" },
        [
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
          dataSource: _vm.permissions,
          pagination: _vm.pagination
        },
        on: { change: _vm.onChange },
        scopedSlots: _vm._u([
          {
            key: "name",
            fn: function(record) {
              return [
                _c(
                  "span",
                  [
                    _vm._v("\n        " + _vm._s(record.name) + "\n        "),
                    _c(
                      "a-tag",
                      {
                        style: { float: "right" },
                        attrs: { color: _vm.tagColor(record.role) }
                      },
                      [_vm._v(_vm._s(record.role))]
                    )
                  ],
                  1
                )
              ]
            }
          },
          {
            key: "status",
            fn: function(record) {
              return [
                _c("a-tag", { attrs: { color: _vm.colorActive(record) } }, [
                  _vm._v(_vm._s(_vm._f("status")(record)))
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
                  "a-radio-group",
                  {
                    attrs: {
                      name: "p__" + record.id,
                      defaultValue: record.role_id
                    },
                    on: { change: _vm.onChangeRole }
                  },
                  _vm._l(_vm.roles, function(role, index) {
                    return _c(
                      "a-radio",
                      {
                        key: index,
                        style: { margin: "0 4px" },
                        attrs: { value: role.id }
                      },
                      [
                        _c(
                          "a-tag",
                          { attrs: { color: _vm.tagColor(role.role_name) } },
                          [_vm._v(_vm._s(role.role_name))]
                        )
                      ],
                      1
                    )
                  }),
                  1
                )
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/admin/Permission.vue?vue&type=template&id=2ea2fe98&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/admin/Permission.vue?vue&type=template&id=2ea2fe98& ***!
  \**************************************************************************************************************************************************************************************************************/
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
  return _c("permission-table")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/admin/permission/PermissionTable.vue":
/*!**********************************************************************!*\
  !*** ./resources/js/components/admin/permission/PermissionTable.vue ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PermissionTable_vue_vue_type_template_id_7a0c9b2c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PermissionTable.vue?vue&type=template&id=7a0c9b2c& */ "./resources/js/components/admin/permission/PermissionTable.vue?vue&type=template&id=7a0c9b2c&");
/* harmony import */ var _PermissionTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PermissionTable.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/permission/PermissionTable.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PermissionTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PermissionTable_vue_vue_type_template_id_7a0c9b2c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PermissionTable_vue_vue_type_template_id_7a0c9b2c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/permission/PermissionTable.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/permission/PermissionTable.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/admin/permission/PermissionTable.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PermissionTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PermissionTable.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/permission/PermissionTable.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PermissionTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/permission/PermissionTable.vue?vue&type=template&id=7a0c9b2c&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/components/admin/permission/PermissionTable.vue?vue&type=template&id=7a0c9b2c& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PermissionTable_vue_vue_type_template_id_7a0c9b2c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PermissionTable.vue?vue&type=template&id=7a0c9b2c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/permission/PermissionTable.vue?vue&type=template&id=7a0c9b2c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PermissionTable_vue_vue_type_template_id_7a0c9b2c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PermissionTable_vue_vue_type_template_id_7a0c9b2c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/pages/admin/Permission.vue":
/*!*************************************************!*\
  !*** ./resources/js/pages/admin/Permission.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Permission_vue_vue_type_template_id_2ea2fe98___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Permission.vue?vue&type=template&id=2ea2fe98& */ "./resources/js/pages/admin/Permission.vue?vue&type=template&id=2ea2fe98&");
/* harmony import */ var _Permission_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Permission.vue?vue&type=script&lang=js& */ "./resources/js/pages/admin/Permission.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Permission_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Permission_vue_vue_type_template_id_2ea2fe98___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Permission_vue_vue_type_template_id_2ea2fe98___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/admin/Permission.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/admin/Permission.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/pages/admin/Permission.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Permission_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Permission.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/admin/Permission.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Permission_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/admin/Permission.vue?vue&type=template&id=2ea2fe98&":
/*!********************************************************************************!*\
  !*** ./resources/js/pages/admin/Permission.vue?vue&type=template&id=2ea2fe98& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Permission_vue_vue_type_template_id_2ea2fe98___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Permission.vue?vue&type=template&id=2ea2fe98& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/admin/Permission.vue?vue&type=template&id=2ea2fe98&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Permission_vue_vue_type_template_id_2ea2fe98___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Permission_vue_vue_type_template_id_2ea2fe98___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);