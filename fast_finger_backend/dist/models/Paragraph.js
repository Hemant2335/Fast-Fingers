"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var ItemSchema = new Schema({
    paragraph: { type: String, required: true },
    number_of_words: { type: Number, required: true },
});
var item = mongoose_1.default.model('Item', ItemSchema);
exports.default = item;
//# sourceMappingURL=Paragraph.js.map