export default class Env {
    static isProd() {
        return process.env.NODE_ENV && process.env.NODE_ENV === 'production';
    }
}
