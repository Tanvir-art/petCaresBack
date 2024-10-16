"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const post_route_1 = require("../modules/post/post.route");
const payment_route_1 = require("../modules/payment/payment.route");
const comment_route_1 = require("../modules/comment/comment.route");
const router = (0, express_1.Router)();
const moduleRoute = [
    {
        path: "/users",
        route: user_route_1.userRoute,
    },
    {
        path: "/posts",
        route: post_route_1.postRoute,
    },
    {
        path: "/payment",
        route: payment_route_1.paymentRoute,
    },
    {
        path: "/comment",
        route: comment_route_1.commentRoute,
    },
];
moduleRoute.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
