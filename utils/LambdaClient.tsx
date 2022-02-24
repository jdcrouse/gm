const LAMBDA_GATEWAY_URL =
  "https://jhhbgeeeu0.execute-api.us-east-1.amazonaws.com/default/gm_button_notify_all";

enum LambdaGatewayRequestType {
  LIST_USERS = "list_users",
  REGISTER_USER = "register_user",
  SEND_GM = "send_gm",
}

type LambdaGatewayRequestBody = {
  type: LambdaGatewayRequestType;
  name: string;
  token: string;
};

export const registerUserToken = (userName: string, userToken: string) => {
  const requestBody = buildLambdaGatewayRequestBody(
    LambdaGatewayRequestType.REGISTER_USER,
    userName,
    userToken
  );
  sendLambdaGatewayRequest(requestBody).then((response) =>
    handleLambdaGatewayResponse(response)
  );
};

export const sendGmToAllUsers = (userName: string, userToken: string) => {
  const requestBody = buildLambdaGatewayRequestBody(
    LambdaGatewayRequestType.SEND_GM,
    userName,
    userToken
  );

  sendLambdaGatewayRequest(requestBody).then((response) =>
    handleLambdaGatewayResponse(response)
  );
};

const buildLambdaGatewayRequestBody = (
  requestType: LambdaGatewayRequestType,
  userName: string,
  userToken: string
): LambdaGatewayRequestBody => {
  return {
    type: requestType,
    name: userName,
    token: userToken,
  };
};

const sendLambdaGatewayRequest = (requestBody: LambdaGatewayRequestBody) => {
  return fetch(LAMBDA_GATEWAY_URL, {
    method: "POST",
    body: JSON.stringify(requestBody),
  });
};

const handleLambdaGatewayResponse = (response: Response): boolean => {
  response.json().then((body) => {
    if (body.errorMessage) {
      console.log(
        `response ok: ${response.ok}\nresponse status: ${response.status}\nresponse error: ${body.errorMessage}`
      );
    } else {
      console.log(
        `response ok: ${response.ok}\nresponse status: ${
          response.status
        }\nresponse body: ${JSON.stringify(body)}`
      );
    }
  });
  return response.ok;
};
