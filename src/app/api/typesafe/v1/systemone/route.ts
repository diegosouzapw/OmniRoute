import { withInjectionGuard } from "@/middleware/promptInjectionGuard";
import { typeSafeOptions, typeSafeSystemOnePost } from "@/app/api/v1/_shared/typesafeRoutes";

export const OPTIONS = typeSafeOptions;
export const POST = withInjectionGuard(typeSafeSystemOnePost);
