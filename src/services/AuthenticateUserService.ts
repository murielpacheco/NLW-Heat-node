import axios from 'axios';

/*
- Receber o code(string)
  - Recuperar o acess_token no github
- Veriricar se o user existe no DB
  -SIM: Gerar um token
  -NAO: Cria no DB, gerar um token
- Retornar o token com as infos do user 
*/

interface IAccessTokenResponse {
  access_token: string;
}

class AuthenticateUserService {  
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    const response = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        "Accept": "application/json"
      }
    })

    return response.data;
  }
}

export { AuthenticateUserService };