export default async function request(method, url, data = null) {
    const body = data && JSON.stringify(data);
    const resourceUrl = process.env.NODE_ENV === "development" ?
        `${process.env.REACT_APP_SERVER_DNS}/${url}` : `/${url}`;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const controller = new AbortController();
    const timeout = process.env.REACT_APP_REQUEST_TIMEOUT;
    const id = setTimeout(() => controller.abort(), timeout);

    const options = {
        method,
        body,
        headers,
        cache: 'no-cache',
        signal: controller.signal
    };

    const response = await fetch(resourceUrl, options);
    clearTimeout(id);

    if (response.ok) {
        const responseParsed = await response.json();

        return responseParsed;
    } else {
        throw new Error('Server error!');
    }
};
