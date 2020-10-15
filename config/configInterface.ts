/**
 * config interface inly here
 */

interface expSessionInterface {
    secret: string;
    resave: boolean;
    saveUninitialized: boolean;
    cookie: Object;
}

interface jwtConfigInterface {
    dataObj?: Object;
    privateKey?: string;
    expiresIn?: string | number;
}
/**
 * exports interface
 * expSessionInterface
 * jwtConfigInterface
 */
export { expSessionInterface, jwtConfigInterface };
