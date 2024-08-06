/**
 * 
 * @param {string} root url root
 * @param {string} type url endpont action (setup/edit)
 */
export function buildTabledUrl(root, type, ...params) {
    let url = `table/${root}`;

    url = updateByAction(url, type);

    if (params) {
        url = addParameters(url, params);
    }

    return url;
}

/**
 * 
 * @param {string} root url root
 * @param {string} type url endpont action (setup/edit)
 */
export function buildViewUrl(root, type, ...params) {
    let url = `view/${root}`;

    url = updateByAction(url, type);

    if (params) {
        url = addParameters(url, params);
    }

    return url;
}

function updateByAction(baseUrl, type) {
    switch (type) {
        case 'display':
            return `${baseUrl}`;
        case 'edit':
            return `${baseUrl}/edit`;
        case 'setup':
            return `api/setup/${baseUrl}`;
        case 'page':
            return `api/${baseUrl}/page`;
        case 'update':
            return `api/${baseUrl}/update`;
        case 'delete':
            return `api/${baseUrl}/delete`;
        case 'dependencies':
            return `api/${baseUrl}/dependencies`;
        default:
            break;
    }

    return baseUrl;
}

/**
 * 
 * @param {string} url 
 * @param {any[]} params 
 */
function addParameters(url, params) {
    return params.reduce((accomulator, value) => `${accomulator}/${value}`, url);
}