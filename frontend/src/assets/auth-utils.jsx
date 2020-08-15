// https://medium.com/@SilentHackz/simple-way-to-secure-react-apps-using-jwt-and-react-router-2b4a05d780a3

export const getSession = () => {
    const jwt = localStorage.getItem('access')
    let session
    try {
        if (jwt) {
            const base64Url = jwt.split('.')[1]
            const base64 = base64Url.replace('-', '+').replace('_', '/')
            // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob
            session = JSON.parse(window.atob(base64))
        }
    } catch (error) {
        console.log(error)
    } return session
}

export const logOut = () => {
    localStorage.removeItem('access');
}