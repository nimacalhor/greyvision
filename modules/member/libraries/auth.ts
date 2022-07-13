import { addClientId, addSecretKey } from "@general/libraries/helper";
import AUTH_SCOPES from "./auth-scopes";
import { Token } from "./member-types";
import axios from "axios";
import {
  REDIRECT_URL,
  DIRECT_URL,
  AUTH_URL,
} from "@main/modules/general/libraries/api-urls";

const directUser = function () {
  const url = addClientId(
    DIRECT_URL +
      `?redirect_uri=${REDIRECT_URL}&response_type=code&scope=${Object.values(
        AUTH_SCOPES
      ).join("+")}`
  );
  window.location.href = url
};

const fetchMemberToken = async function (code: string): Promise<Token> {
  const url = addSecretKey(
    addClientId(
      AUTH_URL +
        `?redirect_uri=${REDIRECT_URL}&${"code"}=${code}&grant_type=authorization_code`
    )
  );
  console.log(url)
  try {
    const { data } = await axios.post(url);
    if (data)
      return {
        access_token: data.access_token,
        created_at: data.created_at,
        scope: data.scope,
        token_type: data.token_type,
      };
  } catch (error: any) {
    return Promise.reject(error.message);
  }
  return Promise.reject();
};

export { directUser, fetchMemberToken };
