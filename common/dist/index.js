"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentInput = exports.updateBlogInput = exports.createBlogInput = exports.signinInput = exports.updateUserInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    name: zod_1.default.string().min(1, "Name is required"),
    email: zod_1.default.string().email("Please enter a valid email address"),
    password: zod_1.default.string().min(6, "Password must be at least 6 characters long"),
    about: zod_1.default.string().optional()
});
exports.updateUserInput = zod_1.default.object({
    name: zod_1.default.string().optional(),
    email: zod_1.default.string().email("Please enter a valid email address").optional(),
    password: zod_1.default.string().min(6, "password must be atleast 6 characters long").optional(),
    about: zod_1.default.string().optional()
});
exports.signinInput = zod_1.default.object({
    email: zod_1.default.string().email("Please enter a valid email address"),
    password: zod_1.default.string().min(6, "Password must be at least 6 characters long"),
});
exports.createBlogInput = zod_1.default.object({
    title: zod_1.default.string().min(10, "title must be atleast 10 characters long"),
    content: zod_1.default.string().min(30, "title must be atleast 30 characters long")
});
exports.updateBlogInput = zod_1.default.object({
    id: zod_1.default.number(),
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
exports.commentInput = zod_1.default.object({
    content: zod_1.default.string()
});
