const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }
    const body = await req.json();
    const key = env.GEMINI_KEY;
    const url =
      'https://generativelanguage.googleapis.com' +
      '/v1beta/models/gemini-1.5-flash:generateContent' +
      '?key=' + key;
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const d = await r.json();
    return new Response(JSON.stringify(d), { headers: CORS });
  },
};
