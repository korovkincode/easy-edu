export const APICall = async requestParams => {
    const response = await fetch(requestParams.path, {
        method: requestParams.method,
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: requestParams.body !== null ? JSON.stringify(requestParams.body) : null
    });
    const responseJSON = await response.json();
    return responseJSON;
}