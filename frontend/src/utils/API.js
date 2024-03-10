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

export const GetUserCourses = async userToken => {
    const requestParams = {
        path: `http://127.0.0.1:8080/user/${userToken}/courses`,
        method: "GET",
    };
    const responseJSON = await APICall(requestParams);
    const userCourses = [];
    for (let course of responseJSON.data) {
        const requestParams = {
            path: `http://127.0.0.1:8080/course/${course.courseToken}`,
            method: "GET",
        };
        const responseJSON = await APICall(requestParams);
        userCourses.push(responseJSON.data);
    }
    console.log(userCourses);
    return userCourses;
}