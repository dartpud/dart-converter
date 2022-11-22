import { UserModel } from "../models/user.model";

export class UserViewModel extends UserModel {
    isEdit: boolean;
    isAdd: boolean;
    changePassword: boolean;
    hidePassword: boolean;
}