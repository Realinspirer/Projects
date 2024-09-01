"use strict";
class project_btn_class {
}
class converter_project_data_class {
    constructor(img_path, title, desc, date, custom_style, buttons, viewer_img, viewer_btns, viewer_custom_style) {
        this.img_path = img_path;
        this.title = title;
        this.desc = desc;
        this.date = date;
        this.custom_style = custom_style;
        this.buttons = buttons;
        this.viewer_img = viewer_img;
        this.viewer_btns = viewer_btns;
        this.viewer_custom_style = viewer_custom_style;
    }
    static converter(data) {
        let im_paths;
        let vi_path = null;
        if (data.img_path.forEach) {
            im_paths = data.img_path;
        }
        else {
            im_paths = [data.img_path];
        }
        if (data.viewer_img != null) {
            if (data.viewer_img.forEach) {
                vi_path = data.viewer_img;
            }
            else {
                vi_path = [data.viewer_img];
            }
        }
        return new project_data_class(im_paths, data.title, data.desc, data.date, data.custom_style, data.buttons, vi_path, data.viewer_btns, data.viewer_custom_style);
    }
}
class project_data_class extends converter_project_data_class {
    constructor(img_path, title, desc, date, custom_style, buttons, viewer_img, viewer_btns, viewer_custom_style) {
        super(img_path, title, desc, date, custom_style, buttons, viewer_img, viewer_btns, viewer_custom_style);
        this.img_path = img_path;
        this.viewer_img = viewer_img;
    }
}
const viewer_manager = (function () {
    const main_viewer = document.getElementById("viewer_main_div");
    const viewer_parent = document.getElementById("viewer_parent");
    const side_panel = document.getElementById("viewer_side_panel");
    const close_btn = viewer_parent.querySelector(".close_btn");
    const title = side_panel.querySelector(".title");
    const desc = side_panel.querySelector(".desc");
    const date = side_panel.querySelector(".date");
    const imgs = [main_viewer.querySelector(".main_img"),
        main_viewer.querySelector(".back_blur_img")];
    const next_btn = side_panel.querySelector("#viewer_next_btn");
    const prev_btn = side_panel.querySelector("#viewer_prev_btn");
    const btns_holder = side_panel.querySelector(".btns");
    let next_data_fnc = null;
    let using_custom_style = false;
    let anim_side_panel = true;
    let current_data;
    close_btn.addEventListener("click", close_viewer);
    next_btn.addEventListener("click", next_btn_clicked);
    prev_btn.addEventListener("click", prev_btn_clicked);
    window.addEventListener("keydown", (ev) => {
        if (ev.key == "Escape") {
            if (document.documentElement.classList.contains("viewer_active")) {
                close_viewer();
            }
        }
    });
    assign_scroll_data_set();
    main_viewer.addEventListener("scroll", assign_scroll_data_set);
    window.addEventListener("resize", assign_scroll_data_set);
    let current_index;
    let total_data;
    let multiple_viewer_current_index = 0;
    function assign_scroll_data_set() {
        if (!(main_viewer.scrollHeight > main_viewer.clientHeight)) {
            viewer_parent.dataset.scroll_current = "-1";
        }
        else {
            viewer_parent.dataset.scroll_current = main_viewer.scrollTop.toString();
        }
    }
    function open_viewer(data, index = 0, data_count = 0, index_next_fnc = null, use_custom_styling = false, multiple_img_index = 0) {
        var _a;
        current_index = index;
        using_custom_style = use_custom_styling;
        total_data = data_count;
        next_data_fnc = index_next_fnc;
        multiple_viewer_current_index = multiple_img_index;
        current_data = data;
        if (next_data_fnc == null
            && (data.viewer_img == null || (data.viewer_img.length <= 1))
            && data.img_path.length <= 1) {
            next_btn.classList.add("hidden");
            prev_btn.classList.add("hidden");
        }
        else {
            next_btn.classList.remove("hidden");
            prev_btn.classList.remove("hidden");
        }
        btns_holder.textContent = "";
        (_a = data.viewer_btns) === null || _a === void 0 ? void 0 : _a.forEach(btn => {
            let normal_button = document.createElement("a");
            let active_action = btn.action;
            if (active_action != null) {
                if (active_action.toLowerCase() == "mail") {
                    normal_button.href = "mailto:realinspirer@outlook.com";
                }
                else {
                    normal_button.href = active_action;
                }
            }
            normal_button.classList.add("normal_button");
            normal_button.textContent = btn.label ? btn.label : "";
            btns_holder.appendChild(normal_button);
        });
        let imgs_src;
        if (data.viewer_img != null) {
            imgs_src = data.viewer_img[multiple_viewer_current_index];
        }
        else {
            imgs_src = data.img_path[multiple_viewer_current_index];
        }
        let custom_styling = null;
        if (using_custom_style) {
            if (data.viewer_custom_style != null) {
                custom_styling = data.viewer_custom_style;
            }
            else if (data.custom_style != null) {
                custom_styling = data.custom_style;
            }
        }
        imgs.forEach((im) => {
            im.src = imgs_src;
            if (custom_styling != null) {
                im.classList.add("set_custom_style");
                im.style.cssText = custom_styling;
            }
            else {
                im.classList.remove("set_custom_style");
                im.style.cssText = "";
            }
        });
        title.textContent = data.title;
        desc.textContent = data.desc;
        date.textContent = `Uploaded date: ${data.date}`;
        viewer_parent.classList.remove("not_visible");
        viewer_parent.classList.remove("hiddens");
        document.documentElement.classList.add("viewer_active");
        main_viewer.scrollTop = 0;
        assign_scroll_data_set();
    }
    function add_not_visible_class() {
        viewer_parent.classList.add("not_visible");
    }
    function close_viewer() {
        viewer_parent.classList.add("hiddens");
        document.documentElement.classList.remove("viewer_active");
        setTimeout(() => {
            add_not_visible_class();
        }, 800);
        // assign_scroll_data_set();
    }
    let on_scroll = false;
    let add_amount = 0;
    function next_btn_clicked() {
        if (on_scroll)
            return;
        on_scroll = true;
        add_amount = 1;
        img_scroll_get_ready();
        if (anim_side_panel) {
            viewer_parent.classList.add("faded");
        }
        else {
            viewer_parent.classList.add("faded_just_img");
        }
        viewer_parent.addEventListener("transitionend", img_scroll_anim);
    }
    let next_data;
    function img_scroll_get_ready() {
        let imgs_list;
        if (current_data.viewer_img != null) {
            imgs_list = current_data.viewer_img.length;
        }
        else {
            imgs_list = current_data.img_path.length;
        }
        if (imgs_list > 1) {
            multiple_viewer_current_index += add_amount;
            if (next_data_fnc != null) {
                if (multiple_viewer_current_index >= 0 &&
                    multiple_viewer_current_index < imgs_list) {
                    anim_side_panel = false;
                    next_data = current_data;
                    return;
                }
            }
            else {
                check_for_overflow_multiple(imgs_list);
                anim_side_panel = false;
                next_data = current_data;
                return;
            }
        }
        if (next_data_fnc == null)
            return;
        current_index += add_amount;
        check_for_overflow();
        let req_data = next_data_fnc(current_index);
        multiple_viewer_current_index = 0;
        if (add_amount < 0) {
            multiple_viewer_current_index = req_data.viewer_img != null ? req_data.viewer_img.length - 1
                : req_data.img_path.length - 1;
            console.log(multiple_viewer_current_index + " sep " + req_data.img_path.length);
        }
        anim_side_panel = true;
        next_data = req_data;
    }
    function img_scroll_anim() {
        open_viewer(next_data, current_index, total_data, next_data_fnc, using_custom_style, multiple_viewer_current_index);
        scroll_end_things();
    }
    function scroll_end_things() {
        viewer_parent.removeEventListener("transitionend", img_scroll_anim);
        viewer_parent.classList.remove("faded");
        viewer_parent.classList.remove("faded_just_img");
        on_scroll = false;
    }
    function prev_btn_clicked() {
        if (on_scroll)
            return;
        on_scroll = true;
        add_amount = -1;
        img_scroll_get_ready();
        if (anim_side_panel) {
            viewer_parent.classList.add("faded");
        }
        else {
            viewer_parent.classList.add("faded_just_img");
        }
        viewer_parent.addEventListener("transitionend", img_scroll_anim);
    }
    function check_for_overflow() {
        let length = total_data;
        if (current_index >= length) {
            current_index = 0;
        }
        if (current_index < 0) {
            current_index = length - 1;
        }
    }
    function check_for_overflow_multiple(length) {
        if (multiple_viewer_current_index >= length) {
            multiple_viewer_current_index = 0;
        }
        if (multiple_viewer_current_index < 0) {
            multiple_viewer_current_index = length - 1;
        }
    }
    return {
        open_viewer: open_viewer,
    };
})();
