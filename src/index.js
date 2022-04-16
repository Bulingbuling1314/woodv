import "./style/base.less";

import Input from "./components/input";
import Checkbox from "./components/checkbox";
import Icon from "./components/icon";
import Button from "./components/button";
import CollapseGroup from "./components/collapse-group";
import CollapsePanel from "./components/collapse";
const components = [Input, Icon, Button, Checkbox, CollapsePanel, CollapseGroup];

export default (Vue) => {
    components.map(item => {
        Vue.component(item.name, item);
    });
};
