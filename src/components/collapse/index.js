import "material-design-icons-iconfont";
export default {
    name: 'WCollapsePanel',
    module: {
        prop: 'model',
        event: 'change'
    },
    data() {
        return {
            index: null
        }
    },
    inject: {
        provideDisabled: {
            type: Boolean,
            default: false
        },
        provideValue: {
            type: Array,
            default: () => []
        }
    },

    props: {
        // 双向绑定的值
        value: {
            type: String | Number,
            default: 0
        },
        // 每一个面板对应的key
        collapseKey: {
            type: String | Number,
            default: null
        },
        // 是否有边框
        bordered: {
            type: Boolean,
            default: false
        },
        // 是否禁止点击
        disabled: {
            type: Boolean,
            default: false
        },
        // 是否显示图标
        showArrow: {
            type: Boolean,
            default: true
        },
        // 是否图标位置
        expandIconPosition: {
            type: String,
            default: 'left'
        },
        // header 显示内容
        header: {
            type: String,
            default: 'left'
        },
    },
    render(h) {
        const { value, collapseKey, bordered, disabled, showArrow, expandIconPosition, header, provideValue, provideDisabled } = this

        const child = [
            h(
                'div',
                {
                    class: {
                        'woo-collapse-header': true,
                        'woo-collapse-disabled': disabled || provideDisabled,
                        'woo-collapse-icon-none': !showArrow,
                        'woo-collapse-icon-right': expandIconPosition === 'right'
                    },
                    attrs: {
                        disabled: this.disabled
                    },
                    on: {
                        click: (e) => {
                            if (this.disabled) {
                                return;
                            }
                            e.target.classList.add('woo-collapse-active')
                            const currentCollapse = document.querySelector(`div[collapseindex='${collapseKey}']`)
                            let index = provideValue.value.indexOf(collapseKey)
                            if (provideValue.value.includes(collapseKey)) {
                                currentCollapse.setAttribute('style', `height: 0;`)
                                this.index = null
                                if (index > -1) {
                                    provideValue.value.splice(index, 1)
                                }
                            } else {
                                currentCollapse.setAttribute('style', `height: auto;`)
                                const offsetHeight = currentCollapse.offsetHeight
                                currentCollapse.setAttribute('style', `height: 0;`)

                                setTimeout(() => {
                                    currentCollapse.setAttribute('style', `opacity: 1;height: ${offsetHeight}px;`)
                                    this.index = collapseKey
                                    provideValue.value.push(collapseKey)
                                })
                            }
                            this.$emit('change', provideValue.value)
                        }
                    }
                },
                [
                    h('span', {
                        class: {
                            'material-icons': true,
                            'woo-not-select': true,
                            'woo-collapse-arrow': true,
                            'woo-collapse-icon-rotate': this.index === collapseKey || provideValue.value.includes(collapseKey)
                        },
                    }, 'keyboard_arrow_right'),
                    h('div',
                        {
                            class: {

                            },
                            style: {
                                textAlign: 'left'
                            }
                        },
                        header
                    )
                ]
            ),

            h('div',
                {
                    class: {
                        'woo-collapse-body': true,
                        'woo-collapse-body-open': this.index === collapseKey || provideValue.value.includes(collapseKey)
                    },
                    style: {
                        height: this.index === collapseKey || provideValue.value.includes(collapseKey) ? '100px' : 0
                    },
                    attrs: {
                        collapseIndex: collapseKey
                    }
                },
                [h('div', {
                    style: {
                        padding: '10px 15px'
                    }
                },
                    this.$slots.default
                )]
            ),
        ]
        return h(
            "div",
            {
                class: {
                    "woo-collapse": true,
                    "woo-collapse-border": bordered,
                },
                on: this.$listeners
            },
            [...child]
        );
    }
};