export const deferFactory = (Promise) => () => {
    const defer = {};
    const extendDefer = (defer) => (resolve, reject) => {defer.resolve = resolve; defer.reject = reject};
    defer.promise = new Promise(extendDefer(defer));

    return defer;
};