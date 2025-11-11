import { LogoutService } from "../../model/service/LogoutService";
import { LogoutRequest, TweeterResponse } from "tweeter-shared"

export const handler = async (request: LogoutRequest): Promise<TweeterResponse> => {
    const logoutService = new LogoutService();
    await logoutService.logout(request.token)
    return {
        success: true,
        message: null,
    }
}