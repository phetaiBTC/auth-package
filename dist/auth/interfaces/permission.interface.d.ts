export interface PermissionService {
    getPermissions(userId: string): Promise<string[]>;
}
