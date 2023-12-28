export class SettlementAlreadyExistHereError extends Error {

  constructor() {
    super("Settlement already exist on this position");
  }

}