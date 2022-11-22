import { UserModel } from "./user.model";

export class TokenResponse {
    access_token: string;
    user: UserModel;
}