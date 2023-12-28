export class ValueTooHighError extends Error {

  constructor() {
    super("Value for number chip must not be above 12");
  }

}