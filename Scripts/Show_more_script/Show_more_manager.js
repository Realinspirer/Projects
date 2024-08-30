"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
class project_btn_class {
}
class project_data_class {
    constructor(img_path, title, desc, date, custom_style) {
        this.img_path = img_path;
        this.title = title;
        this.desc = desc;
        this.date = date;
        this.custom_style = custom_style;
    }
}
let show_more_manager = (function () {
    var _loader_element_class_instances, _loader_element_class_last_amount, _loader_element_class_added_children, _loader_element_class_unload_clicked, _loader_element_class_button_checker, _loader_element_class_return_next;
    class loader_element_class {
        constructor(Show_more_btn, Show_less_btn, elements_adder, unload_fnc, parent, req_data, add_amount) {
            _loader_element_class_instances.add(this);
            this.current_index = 0;
            _loader_element_class_last_amount.set(this, 0);
            _loader_element_class_added_children.set(this, []);
            this.Show_less_btn = Show_less_btn;
            this.Show_more_btn = Show_more_btn;
            this.elements_adder = elements_adder;
            this.unload_fnc = unload_fnc;
            this.req_data = req_data;
            this.parent = parent;
            this.add_amount = add_amount;
        }
        initialize_element() {
            // let req_to_add = this.req_data.slice(this.#current_index, this.#current_index + this.add_amount);
            let added = this.elements_adder(__classPrivateFieldGet(this, _loader_element_class_instances, "m", _loader_element_class_return_next).call(this), this.parent);
            __classPrivateFieldSet(this, _loader_element_class_last_amount, added.length, "f");
            this.current_index += __classPrivateFieldGet(this, _loader_element_class_last_amount, "f");
            __classPrivateFieldGet(this, _loader_element_class_added_children, "f").push(...added);
            this.Show_more_btn.addEventListener("click", () => this.load_more_clicked());
            this.Show_less_btn.addEventListener("click", () => __classPrivateFieldGet(this, _loader_element_class_instances, "m", _loader_element_class_unload_clicked).call(this));
            __classPrivateFieldGet(this, _loader_element_class_instances, "m", _loader_element_class_button_checker).call(this);
        }
        load_more_clicked() {
            if (this.current_index >= this.req_data.length) {
                return;
            }
            let added = this.elements_adder(__classPrivateFieldGet(this, _loader_element_class_instances, "m", _loader_element_class_return_next).call(this), this.parent);
            __classPrivateFieldSet(this, _loader_element_class_last_amount, added.length, "f");
            this.current_index += added.length;
            __classPrivateFieldGet(this, _loader_element_class_added_children, "f").push(...added);
            __classPrivateFieldGet(this, _loader_element_class_instances, "m", _loader_element_class_button_checker).call(this);
        }
    }
    _loader_element_class_last_amount = new WeakMap(), _loader_element_class_added_children = new WeakMap(), _loader_element_class_instances = new WeakSet(), _loader_element_class_unload_clicked = function _loader_element_class_unload_clicked() {
        if (__classPrivateFieldGet(this, _loader_element_class_added_children, "f").length <= this.add_amount) {
            return;
        }
        for (let x = 0; x < __classPrivateFieldGet(this, _loader_element_class_last_amount, "f"); x++) {
            let last_ele = __classPrivateFieldGet(this, _loader_element_class_added_children, "f")[__classPrivateFieldGet(this, _loader_element_class_added_children, "f").length - 1];
            if (this.unload_fnc != null) {
                this.unload_fnc(last_ele);
            }
            this.parent.removeChild(last_ele);
            __classPrivateFieldGet(this, _loader_element_class_added_children, "f").pop();
            this.current_index--;
        }
        if (__classPrivateFieldGet(this, _loader_element_class_last_amount, "f") != this.add_amount) {
            __classPrivateFieldSet(this, _loader_element_class_last_amount, this.add_amount, "f");
        }
        __classPrivateFieldGet(this, _loader_element_class_instances, "m", _loader_element_class_button_checker).call(this);
    }, _loader_element_class_button_checker = function _loader_element_class_button_checker() {
        if (__classPrivateFieldGet(this, _loader_element_class_added_children, "f").length <= this.add_amount) {
            this.Show_less_btn.classList.add("hidden");
        }
        else {
            this.Show_less_btn.classList.remove("hidden");
        }
        if (__classPrivateFieldGet(this, _loader_element_class_added_children, "f").length >= this.req_data.length) {
            this.Show_more_btn.classList.add("hidden");
        }
        else {
            this.Show_more_btn.classList.remove("hidden");
        }
    }, _loader_element_class_return_next = function _loader_element_class_return_next() {
        let last_index = this.current_index + this.add_amount;
        last_index = last_index > this.req_data.length ? this.req_data.length : last_index;
        return this.req_data.slice(this.current_index, last_index);
    };
    function manage_show_more(json_path_1, show_more_btn_id_1, show_less_btn_id_1, parent_of_items_1, elements_adder_1) {
        return __awaiter(this, arguments, void 0, function* (json_path, show_more_btn_id, show_less_btn_id, parent_of_items, elements_adder, unload_fnc = null, load_amount = 4) {
            var response = yield fetch(json_path);
            let res_ar = yield response.json();
            let show_more_btn = document.getElementById(show_more_btn_id);
            let show_less_btn = document.getElementById(show_less_btn_id);
            let parent = document.getElementById(parent_of_items);
            let manager_class = new loader_element_class(show_more_btn, show_less_btn, elements_adder, unload_fnc, parent, res_ar, load_amount);
            manager_class.initialize_element();
        });
    }
    return {
        manage_show_more: manage_show_more
    };
})();
