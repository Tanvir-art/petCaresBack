import { Router } from "express";
import { userRoute } from "../modules/user/user.route";
import { postRoute } from "../modules/post/post.route";
import { paymentRoute } from "../modules/payment/payment.route";
import { commentRoute } from "../modules/comment/comment.route";

const router = Router();

const moduleRoute = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/posts",
    route: postRoute,
  },
  {
    path: "/payment",
    route: paymentRoute,
  },
  {
    path: "/comment",
    route: commentRoute,
  },
];

moduleRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
