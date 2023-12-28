import {Suite} from "./testHelpers/Suite";
import {assert} from "chai";
import {BeforeEach, Test} from "./testHelpers";

class ResourceField {

  private readonly settlements: number[];

  constructor() {
    this.settlements = [];
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
}

class TooMuchSettlementsError extends Error {

}

@Suite
export class ResourceFieldTest {

  // @ts-ignore
  private resourceField: ResourceField;

  @BeforeEach
  setUp() {
    this.resourceField = new ResourceField();
  }

  @Test
  should_add_one_settlement_to_a_resource_field() {
    this.resourceField.addSettlement();

    assert.equal(this.resourceField.getSettlements().length, 1)
  }

  @Test
  should_add_up_to_3_settlements_to_a_resource_field() {
    this.resourceField.addSettlement();
    this.resourceField.addSettlement();
    this.resourceField.addSettlement();

    assert.equal(this.resourceField.getSettlements().length, 3)
  }

  @Test
  should_not_allow_more_then_3_settlements_on_a_resource_field() {
    this.resourceField.addSettlement();
    this.resourceField.addSettlement();
    this.resourceField.addSettlement();

    assert.throws(() => this.resourceField.addSettlement(), TooMuchSettlementsError);
  }

}