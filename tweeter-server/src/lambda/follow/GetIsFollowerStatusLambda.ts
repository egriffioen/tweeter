import { GetIsFollowerStatusRequest, GetIsFollowerStatusResponse } from "tweeter-shared";
import { UserInfoService } from "../../model/service/UserInfoService";

export const handler = async (request: GetIsFollowerStatusRequest): Promise<GetIsFollowerStatusResponse> => {
    const userInfoService = new UserInfoService();
    const isFollower = await userInfoService.getIsFollowerStatus(request.token, request.user, request.selectedUser)
    return {
        success: true,
        message: null,
        isFollower: isFollower
    }
}