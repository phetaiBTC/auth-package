export interface PermissionService {
    getPermissions(userId: string): Promise<{
        permissions: string[];
    }>;
}
