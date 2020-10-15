import { Router } from "express";

import UserRoute from "../components/user/routes/user.routes";

const route = Router();

UserRoute(route);

export default route;
