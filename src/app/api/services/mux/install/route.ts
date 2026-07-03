import { install } from "@/lib/services/installers/mux";
import { handleServiceInstall } from "@/app/api/services/_shared/installRoute";

export async function POST(request: Request): Promise<Response> {
  return handleServiceInstall(request, install);
}
