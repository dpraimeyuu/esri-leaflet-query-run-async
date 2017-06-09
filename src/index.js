import { deferFactory as defaultDeferFactory } from "./defer-factory.js";
import { runAsync, cancel } from "./methods.js";

function makeQueryRunAsyncFactory({ defaultDeferFactory, runAsync, cancel }) {
    return function makeQueryRunAsync(esriLeafletQuery, { promiseFactory } = {}) {
        const extendedMethods = {
            runAsync: runAsync.bind(esriLeafletQuery.prototype, {
                 promiseFactory: promiseFactory || defaultDeferFactory,
                 esriLeafletQuery
            }),
            cancel
        };
        esriLeafletQuery.prototype.runAsync = function () { return extendedMethods.runAsync(this); };
        esriLeafletQuery.prototype.cancel = function({ reason } = {}) {
            return extendedMethods.cancel.call(this, { reason });
        };
    }
}
const makeQueryRunAsync = makeQueryRunAsyncFactory({defaultDeferFactory: defaultDeferFactory(Promise), runAsync, cancel});
export default makeQueryRunAsync;
const deferFactory = defaultDeferFactory(Promise);
export { deferFactory };

