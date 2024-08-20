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
const game_cover_changer = (function () {
    class just_img {
        constructor() {
            this.image_cover = null;
            this.image_url = "";
        }
    }
    let cover_img = document.querySelector(".game_discover .image_cover");
    let index = 0;
    let res_ar;
    function hook_cover_fader(json_path_1) {
        return __awaiter(this, arguments, void 0, function* (json_path, interval = 5000) {
            var response = yield fetch(json_path);
            res_ar = yield response.json();
            changer();
            setInterval(() => {
                changer();
            }, interval);
        });
    }
    function changer() {
        if (index >= res_ar.length) {
            index = 0;
        }
        cover_img.style.opacity = "0";
        cover_img.addEventListener("transitionend", change_img);
    }
    function change_img() {
        let current_instance = res_ar[index];
        let custom_cover = current_instance.image_cover;
        if (custom_cover != null) {
            cover_img.src = custom_cover;
        }
        else {
            cover_img.src = current_instance.image_url;
        }
        cover_img.style.opacity = "1";
        cover_img.removeEventListener("transitionend", change_img);
        index++;
    }
    return {
        hook_cover_fader: hook_cover_fader
    };
})();
