import { UserDto } from "../../dto/UserDto";
import { UserInfoRequest } from "./UserInfoRequest";

export interface GetIsFollowerStatusRequest extends UserInfoRequest {
    readonly selectedUser: UserDto
}