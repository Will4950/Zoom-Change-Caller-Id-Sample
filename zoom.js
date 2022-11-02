import axios from "axios";

const zoomAuth = "https://zoom.us/oauth/";
const zoomAPI = "https://api.zoom.us/v2/";

export async function getAccessToken() {
  try {
    let oauthToken = Buffer.from(
      `${process.env.clientID}:${process.env.clientSecret}`
    ).toString("base64");

    let res = await axios({
      method: "post",
      url: `${zoomAuth}token?grant_type=account_credentials&account_id=${process.env.accountID}`,
      headers: { Authorization: `Basic ${oauthToken}` },
    });
    return res.data.access_token;
  } catch (e) {
    return false;
  }
}

export async function getUsers(accessToken, site_id, users, token) {
  try {
    let res = await axios({
      method: "get",
      url: `${zoomAPI}phone/users`,
      params: {
        site_id,
        page_size: 100,
        next_page_token: token ? token : null,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    users = users.concat(res.data.users);
    if (res.data.next_page_token) {
      return await getUsers(accessToken, users, res.data.next_page_token);
    } else {
      return users;
    }
  } catch (e) {
    return false;
  }
}

export async function updateCallerId(accessToken, userId, outbound_caller_id) {
  try {
    await axios({
      method: "patch",
      url: `${zoomAPI}phone/users/${userId}/settings`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: { outbound_caller_id },
    });
    return true;
  } catch (e) {
    return false;
  }
}
