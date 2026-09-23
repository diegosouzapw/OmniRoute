import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createValidateAndAddHandler } from "@/lib/modelValidation/http";
import { validateAndAddModel } from "@/lib/modelValidation/service";

export const dynamic = "force-dynamic";
export const POST = createValidateAndAddHandler({
  authorize: (request) => requireManagementAuth(request, { alwaysRequireAuth: true }),
  validateAndAdd: validateAndAddModel,
});
