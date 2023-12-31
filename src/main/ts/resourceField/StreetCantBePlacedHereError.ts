export class StreetCantBePlacedHereError extends Error {

  constructor() {
    super("Street can't be placed here");
  }

}