"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expansion = exports.away = void 0;

// 展开
const expansion = _this => {
  const {
    collapseKey,
    provideValue,
    provideAccordion
  } = _this;
  const currentCollapse = document.querySelector("div[collapseindex='".concat(collapseKey, "']"));
  currentCollapse.setAttribute('style', "height: auto;");
  _this.bodyOffsetHeight = currentCollapse.offsetHeight;
  currentCollapse.setAttribute('style', "height: 0;");
  setTimeout(() => {
    if (provideAccordion) {
      provideValue.value.filter(item => item !== collapseKey).map((item, index) => {
        const itemCollapse = document.querySelector("div[collapseindex='".concat(item, "']"));
        itemCollapse.setAttribute('style', "height: 0;");
        provideValue.value.splice(index, 1);
      });
    }

    _this.index = collapseKey;
    provideValue.value.push(collapseKey);
    currentCollapse.setAttribute('style', "opacity: 1;height: ".concat(_this.bodyOffsetHeight, "px;"));
  });
}; // 收起


exports.expansion = expansion;

const away = _this => {
  const {
    collapseKey,
    provideValue
  } = _this;
  const currentCollapse = document.querySelector("div[collapseindex='".concat(collapseKey, "']"));
  let index = provideValue.value.indexOf(collapseKey);
  currentCollapse.setAttribute('style', "height: auto;");
  _this.bodyOffsetHeight = currentCollapse.offsetHeight;
  currentCollapse.setAttribute('style', "opacity: 1;height: ".concat(_this.bodyOffsetHeight, "px;"));
  setTimeout(() => {
    if (index > -1) {
      _this.index = null;
      provideValue.value.splice(index, 1);
      currentCollapse.setAttribute('style', "height: 0;");
    }
  });
};

exports.away = away;