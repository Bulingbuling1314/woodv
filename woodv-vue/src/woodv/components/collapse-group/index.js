"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default2 = {
  name: "WCollapseGroup",
  module: {
    prop: 'value',
    event: 'change'
  },

  data() {
    return {
      model: {
        value: []
      }
    };
  },

  provide() {
    return {
      provideDisabled: this.disabled,
      provideAccordion: this.accordion,
      provideValue: this.model
    };
  },

  watch: {
    value(value) {
      this.model.value = value;
      this.$emit("change", this.model.value);
    }

  },

  created() {
    this.model.value = this.value;
  },

  props: {
    value: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    accordion: {
      type: Boolean,
      default: false
    }
  },

  render(h) {
    return h("div", {
      class: {
        "woo-collapse-group": true
      },
      on: this.$listeners
    }, this.$slots.default);
  }

};
exports.default = _default2;