export class NoSettlementToUpdateError extends Error {

  constructor() {
    super("No settlement to upgrade to city available");
  }

}