import { BuildMessageUsecase } from "../../usecases/organizers/build-message.usecase";

export function BuildMessageFactory() {
  return new BuildMessageUsecase();
}
