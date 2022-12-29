import fetch from 'node-fetch';

export class HttpUtils {
  static async get(url: string): Promise<any> {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    if (!response.ok) {
      // throw new Error(`Error! status: ${response.status} on URL ${url}`);
      console.log(`Error! status: ${response.status} on URL ${url}`);
    }
    return await response.json();
  }
}
