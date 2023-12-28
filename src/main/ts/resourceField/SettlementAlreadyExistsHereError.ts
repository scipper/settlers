export class SettlementAlreadyExistsHereError extends Error {

  constructor() {
    super("Settlement already exist on this position");
  }

}