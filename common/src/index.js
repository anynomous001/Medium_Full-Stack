"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentInput = exports.updateBlogInput = exports.createBlogInput = exports.signinInput = exports.updateUserInput = exports.signupInput = void 0;
var zod_1 = require("zod");
exports.signupInput = zod_1.default.object({
    name: zod_1.default.string().min(1, "Name is required"),
    email: zod_1.default.string().email("Please enter a valid email address"),
    password: zod_1.default.string().min(6, "Password must be at least 6 characters long"),
    about: zod_1.default.string().optional()
});
exports.updateUserInput = zod_1.default.object({
    name: zod_1.default.string().optional(),
    email: zod_1.default.string().email().optional(),
    password: zod_1.default.string().min(6).optional(),
    about: zod_1.default.string().optional()
});
exports.signinInput = zod_1.default.object({
    email: zod_1.default.string().email("Please enter a valid email address"),
    password: zod_1.default.string().min(6, "Password must be at least 6 characters long"),
});
exports.createBlogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
exports.updateBlogInput = zod_1.default.object({
    id: zod_1.default.number(),
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
exports.commentInput = zod_1.default.object({
    content: zod_1.default.string()
});
