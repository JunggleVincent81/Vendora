const BASE_URL = "http://localhost:5000/api/v1";

export const api = async (url: string, method = "GET", body?: any, token?: string) => {
  const res = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: body ? JSON.stringify(body) : undefined
  });

  return res.json();
};