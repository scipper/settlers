export class TooMuchSettlementsError extends Error {

  constructor() {
    super("Too much settlements already exist");
  }

}