export function runAsync({ promiseFactory, esriLeafletQuery }, context) {
    const queryPromise = promiseFactory();
    this.queryPromise = queryPromise;
    const httpQueryRequest = esriLeafletQuery.prototype.run.call(context,
    (e, collection, res) => queryPromise.resolve({ e, data: collection, response: res }));

    queryPromise.promise.catch((e) => {
        httpQueryRequest.abort();

        return e;
    });

    return queryPromise.promise;
}

export function cancel({ reason }) {
    return this.queryPromise.reject({ reason: `CANCEL_REQUEST${reason? ": " + reason : ""}` });
}