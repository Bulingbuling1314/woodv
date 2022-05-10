import "material-design-icons-iconfont";
export default {
    name: 'WCollapsePanel',
    module: {
        prop: 'model',
        event: 'change'
    },
    data() {
        return {
            index: null,
            bodyOffsetHeight: 0
        }
    },
    inject: {
        provideDisabled: {
            type: Boolean,
            default: false
        },
        provideAccordion: {
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
        const { value, collapseKey, bordered, disabled, showArrow, expandIconPosition, header, provideValue, provideAccordion, provideDisabled } = this
        // 如果开启手风琴模式
        if(provideAccordion) {
            if(provideValue.value.length > 1) {
                provideValue.value.splice(1)
                setTimeout(() => {
                    const currentCollapse = document.querySelector(`div[collapseindex='1']`)
                    this.bodyOffsetHeight = currentCollapse.offsetHeight
                    currentCollapse.setAttribute('style', `opacity: 1;height: ${this.bodyOffsetHeight}px;`)
                    provideValue.value.filter(item => item !== collapseKey).map((item, index) => {
                        const itemCollapse = document.querySelector(`div[collapseindex='${item}']`)
                        itemCollapse.setAttribute('style', `height: 0;`)
                        provideValue.value.splice(index, 1)
                    })
                })
            }
        }
        const child = [
            h(
                'div',
                {
                    class: {
                        'woo-collapse-header': true,
                        'woo-collapse-disabled': disabled || provideDisabled,
                        'woo-collapse-icon-none': !showArrow,
                        'woo-collapse-icon-right': expandIconPosition === 'right',
                        
                    },
                    attrs: {
                        disabled: this.disabled
                    },
                    on: {
                        click: (e) => {
                            if (this.disabled || !provideValue) {
                                return;
                            }
                            if(!collapseKey) {
                                throw new Error('the w-collapse-panel is should a collapseKey!')
                            }
                            e.target.classList.add('woo-collapse-active')
                            const currentCollapse = document.querySelector(`div[collapseindex='${collapseKey}']`)
                            let index = provideValue.value.indexOf(collapseKey)
                            if (provideValue.value.includes(collapseKey)) {
                                currentCollapse.setAttribute('style', `height: auto;`)
                                this.bodyOffsetHeight = currentCollapse.offsetHeight
                                currentCollapse.setAttribute('style', `opacity: 1;height: ${this.bodyOffsetHeight}px;`)
                                setTimeout(() => {
                                    if (index > -1) {
                                        this.index = null
                                        provideValue.value.splice(index, 1)
                                        currentCollapse.setAttribute('style', `height: 0;`)
                                    }
                                })
                            } else {
                                currentCollapse.setAttribute('style', `height: auto;`)
                                this.bodyOffsetHeight = currentCollapse.offsetHeight
                                currentCollapse.setAttribute('style', `height: 0;`)

                                setTimeout(() => {
                                    if(provideAccordion) {
                                        provideValue.value.filter(item => item !== collapseKey).map((item, index) => {
                                            const itemCollapse = document.querySelector(`div[collapseindex='${item}']`)
                                            itemCollapse.setAttribute('style', `height: 0;`)
                                            provideValue.value.splice(index, 1)
                                        })
                                    }
                                    this.index = collapseKey
                                    provideValue.value.push(collapseKey)
                                    currentCollapse.setAttribute('style', `opacity: 1;height: ${this.bodyOffsetHeight}px;`)
                                })
                            }
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
                                textAlign: 'left',
                                'user-select': 'none'
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
                        height: this.index === collapseKey || provideValue.value.includes(collapseKey) ? `${this.bodyOffsetHeight > 0  ? this.bodyOffsetHeight + 'px' : 'auto'}` : 0
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