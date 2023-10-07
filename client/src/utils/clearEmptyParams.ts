export const clearEmptyParams = (oldParams: { [key: string]: any }) => {
    let params = oldParams
    for (const key of Object.keys(params)) {
        if (!params[key]) {
            delete params[key]
        }
    }
    return params
}
