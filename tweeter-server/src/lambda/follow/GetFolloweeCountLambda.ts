import { GetCountResponse, GetIsFollowerStatusRequest, GetIsFollowerStatusResponse, UserInfoRequest } from "tweeter-shared";
import { UserInfoService } from "../../model/service/UserInfoService";

export const handler = async (request: UserInfoRequest): Promise<GetCountResponse> => {
    const userInfoService = new UserInfoService();
    const followeeCount = await userInfoService.getFolloweeCount(request.token, request.user)
    return {
        success: true,
        message: null,
        count: followeeCount
    }
}