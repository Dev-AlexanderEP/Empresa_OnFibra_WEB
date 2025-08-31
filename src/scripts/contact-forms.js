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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initContactForm = initContactForm;
function initContactForm() {
    var _this = this;
    if (typeof document === "undefined")
        return; // 🚨 Previene ejecución en SSR
    document.addEventListener("DOMContentLoaded", function () {
        var form = document.getElementById("contact-form");
        if (!form)
            return;
        var emailjsModPromise = null;
        var loadEmailJS = function () {
            if (!emailjsModPromise) {
                emailjsModPromise = Promise.resolve().then(function () { return require("@emailjs/browser"); }).then(function (mod) {
                    var emailjs = mod.default || mod;
                    emailjs.init("oqAnIa3GmsqHuor-w"); // Public Key
                    return emailjs;
                });
            }
            return emailjsModPromise;
        };
        form.addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
            var telInput, value, emailjs, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        telInput = form.querySelector('input[name="numero"]');
                        if (telInput) {
                            value = telInput.value.trim();
                            if (!/^\d{9}$/.test(value)) {
                                alert("El número de contacto debe tener exactamente 9 dígitos.");
                                telInput.focus();
                                return [2 /*return*/];
                            }
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, loadEmailJS()];
                    case 2:
                        emailjs = _a.sent();
                        return [4 /*yield*/, emailjs.sendForm("service_lpuo854", "template_rpq0f2m", form)];
                    case 3:
                        _a.sent();
                        alert("✅ Mensaje enviado correctamente. Nos pondremos en contacto contigo.");
                        form.reset();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        alert("❌ Error al enviar: " + ((error_1 === null || error_1 === void 0 ? void 0 : error_1.text) || JSON.stringify(error_1)));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    });
}
// No ejecutar en SSR
if (typeof window !== "undefined") {
    initContactForm();
}
