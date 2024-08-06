import request from '../features/http/request';
import * as urlBuilder from '../features/url/builder';

const GeneService = {
    getSetupInfo(requestBody) {
        let url;

        if (requestBody.tableType.includes('view.')) {
            url = urlBuilder.buildViewUrl(requestBody.root, 'setup');
        } else {
            url = urlBuilder.buildTabledUrl(requestBody.root, 'setup');
        }

        return request('GET', url);
    },

    getItems(requestBody) {
        let url;

        if (requestBody.tableType.includes('view.')) {
            url = urlBuilder.buildViewUrl(requestBody.root, 'page', requestBody.pageId);
        } else {
            url = urlBuilder.buildTabledUrl(requestBody.root, 'page', requestBody.pageId);
        }

        return request('GET', url);
    },

    delete(requestBody) {
        const url = urlBuilder.buildTabledUrl(requestBody.root, 'delete');

        return request('POST', url, requestBody.body.ids);
    },

    saveChanges(requestBody) {
        const url = urlBuilder.buildTabledUrl(requestBody.root, 'update');

        return request('POST', url, requestBody.body.items);
    },

    getDependencies(requestBody) {
        const url = urlBuilder.buildTabledUrl(requestBody.root, 'dependencies');

        return request('GET', url);
    }
};

export default GeneService;