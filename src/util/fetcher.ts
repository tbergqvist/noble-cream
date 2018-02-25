export namespace fetcher {
  export async function get(uri: string): Promise<any> {
    let response = await fetch(uri, {
      method: "GET"
    });

    return response.json();
  }

  export async function post(uri: string, body: any): Promise<any> {
    return await fetch(uri, {
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }
}