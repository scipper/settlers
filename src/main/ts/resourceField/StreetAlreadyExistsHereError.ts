export class StreetAlreadyExistsHereError extends Error {

  constructor() {
    super("Street already exist on this position");
  }

}