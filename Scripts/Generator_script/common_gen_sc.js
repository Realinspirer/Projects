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
const common_gen = (function () {
    return function (json_path_1, parent_id_1, elements_adder_1) {
        return __awaiter(this, arguments, void 0, function* (json_path, parent_id, elements_adder, count = 4, start = 0) {
            var response = yield fetch(json_path);
            let res_ar = yield response.json();
            elements_adder(res_ar.slice(start, start + count), document.getElementById(parent_id));
        });
    };
})();
