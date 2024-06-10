import fetch from 'cross-fetch';

export class ApiFunctions {
    async doPost(endpoint: string, headers: Record<string, string>, body: any): Promise<any> {
        return this.makeRequest('POST', endpoint, headers, body);
    }

    async doGet(endpoint: string, headers: Record<string, string>): Promise<any> {
        return this.makeRequest('GET', endpoint, headers);
    }

    async doPut(endpoint: string, headers: Record<string, string>, body: any): Promise<any> {
        return this.makeRequest('PUT', endpoint, headers, body);
    }

    async doDelete(endpoint: string, headers: Record<string, string>): Promise<any> {
        return this.makeRequest('DELETE', endpoint, headers);
    }

    async makeRequest(method: string, endpoint: string, headers: Record<string, string>, body?: any): Promise<any> {
        const url = endpoint;
        const options: any = {
            method,
            headers,
        };
        if (body) {
            options.body = JSON.stringify(body);
        }
        const response = await fetch(url, options);
        return response.json();
    }
}
