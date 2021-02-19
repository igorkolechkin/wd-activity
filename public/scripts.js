const url = 'https://www.strava.com/api/v3';

async function getToken() {
  const data = {
    client_id: '61820',
    client_secret: 'a723b2f67ff391bdf3849509b88cf8a24d209c69',
    refresh_token: '249f15718b34fdd2cb0f64aee34f02467a9cb6e0',
    grant_type: 'refresh_token'
  };

  const response = await fetch('https://www.strava.com/oauth/token', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const json = await response.json();

  return json.access_token;
}

async function authorize() {
  const token = await getToken();

  localStorage.setItem('strava_token', token);
}

authorize();

async function getUserInfo(id) {
  const token = localStorage.getItem('strava_token');

  const response = await fetch(`${url}/athletes/${id}/stats?access_token=${token}&activity:read_all`);
  const json = await response.json();
  console.log(json)
}

getUserInfo(41702587);
//getUserInfo(20643968);