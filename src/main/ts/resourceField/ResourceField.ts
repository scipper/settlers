import {NumberChip} from "./numberChip/NumberChip";
import {NoSettlementToUpdateError} from "./NoSettlementToUpdateError";
import {SettlementAlreadyExistsHereError} from "./SettlementAlreadyExistsHereError";
import {SettlementsTooCloseError} from "./SettlementsTooCloseError";
import {StreetAlreadyExistsHereError} from "./StreetAlreadyExistsHereError";
import {StreetCantBePlacedHereError} from "./StreetCantBePlacedHereError";

export class ResourceField {

  private readonly settlements: { [key: number]: number };
  private readonly streets: { [key: number]: number };
  private readonly cities: number[];
  private numberChip?: NumberChip;

  constructor() {
    this.settlements = {};
    this.streets = [];
    this.cities = [];
  }

  addSettlementToPosition(position: number) {
    if(typeof this.settlements[position] !== "undefined") {
      throw new SettlementAlreadyExistsHereError();
    }
    if(typeof this.settlements[position - 1] !== "undefined" ||
      typeof this.settlements[position + 1] !== "undefined") {
      throw new SettlementsTooCloseError();
    }
    this.settlements[position] = 0;
  }

  getSettlements(): number[] {
    return Object.values(this.settlements);
  }

  addStreetToPosition(position: number) {
    if(typeof this.streets[position] !== "undefined") {
      throw new StreetAlreadyExistsHereError();
    }

    if(typeof this.settlements[position] !== "undefined") {
      this.streets[position] = 0;
    } else if(typeof this.settlements[this.previousPosition(position)] !== "undefined") {
      this.streets[position] = 0;
    } else if(typeof this.streets[this.previousPosition(position)] !== "undefined") {
      this.streets[position] = 0;
    } else if(typeof this.streets[this.nextPosition(position)] !== "undefined") {
      this.streets[position] = 0;
    } else {
      throw new StreetCantBePlacedHereError();
    }
  }

  getStreets() {
    return Object.values(this.streets);
  }

  setNumberChip(numberChip: NumberChip) {
    this.numberChip = numberChip;
  }

  getResourcesForRoll(roll: number) {
    if(this.numberChip?.getValue() === roll) {
      return Object.values(this.settlements).length + (this.cities.length * 2);
    } else {
      return 0;
    }
  }

  upgradeSettlementAtPositionToCity(position: number) {
    if(typeof this.settlements[position] === "undefined") {
      throw new NoSettlementToUpdateError();
    }
    delete this.settlements[position];
    this.cities.push(0);
  }

  getCities() {
    return this.cities;
  }

  private previousPosition(position: number) {
    let previousPosition = position - 1;
    if(previousPosition < 1) {
      previousPosition = 6;
    }

    return previousPosition;
  }

  private nextPosition(position: number) {
    let previousPosition = position + 1;
    if(previousPosition > 6) {
      previousPosition = 1;
    }

    return previousPosition;
  }
}