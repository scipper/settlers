import {TooMuchSettlementsError} from "./TooMuchSettlementsError";
import {TooMuchStreetsError} from "./TooMuchStreetsError";
import {NumberChip} from "./NumberChip";
import {NoSettlementToUpdateError} from "./NoSettlementToUpdateError";

export class ResourceField {

  private readonly settlements: number[];
  private readonly streets: number[];
  private readonly cities: number[];
  private numberChip?: NumberChip;

  constructor() {
    this.settlements = [];
    this.streets = [];
    this.cities = [];
  }

  addSettlement() {
    if(this.settlements.length < 3) {
      this.settlements.push(0);
    } else {
      throw new TooMuchSettlementsError();
    }
  }

  getSettlements(): number[] {
    return this.settlements;
  }

  addStreet() {
    if(this.streets.length < 6) {
      this.streets.push(0);
    } else {
      throw new TooMuchStreetsError();
    }
  }

  getStreets() {
    return this.streets;
  }

  setNumberChip(numberChip: NumberChip) {
    this.numberChip = numberChip;
  }

  getResourcesForRoll(roll: number) {
    if(this.numberChip?.getValue() === roll) {
      return this.settlements.length + (this.cities.length * 2);
    } else {
      return 0;
    }
  }

  upgradeSettlementToCity() {
    if(this.settlements.length === 0) {
      throw new NoSettlementToUpdateError();
    }
    this.settlements.splice(0, 1);
    this.cities.push(0);
  }

  getCities() {
    return this.cities;
  }
}