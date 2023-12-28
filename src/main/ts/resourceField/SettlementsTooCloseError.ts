export class SettlementsTooCloseError extends Error {

  constructor() {
    super("Settlements are too close to each other");
  }

}