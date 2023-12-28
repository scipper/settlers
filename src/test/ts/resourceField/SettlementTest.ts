import {Suite} from "../testHelpers/Suite";
import {assert} from "chai";
import {BeforeEach, Test} from "../testHelpers";
import {ResourceField} from "../../../main/ts/resourceField/ResourceField";
import {Ignore} from "../testHelpers/Ignore";
import {SettlementAlreadyExistsHereError} from "../../../main/ts/resourceField/SettlementAlreadyExistsHereError";
import {SettlementsTooCloseError} from "../../../main/ts/resourceField/SettlementsTooCloseError";


@Suite
export class SettlementTest {

  // @ts-ignore
  private resourceField: ResourceField;

  @BeforeEach
  setUp() {
    this.resourceField = new ResourceField();
  }

  @Test
  should_add_1_settlement_to_a_resource_field() {
    this.resourceField.addSettlementToPosition(1);

    assert.equal(this.resourceField.getSettlements().length, 1);
  }

  @Test
  should_not_add_multiple_settlements_to_the_same_position() {
    this.resourceField.addSettlementToPosition(1);

    assert.throws(() => this.resourceField.addSettlementToPosition(1), SettlementAlreadyExistsHereError);
  }

  @Test
  should_add_up_to_3_settlements_to_a_resource_field() {
    this.resourceField.addSettlementToPosition(1);
    this.resourceField.addSettlementToPosition(3);
    this.resourceField.addSettlementToPosition(5);

    assert.equal(this.resourceField.getSettlements().length, 3);
  }

  @Test
  should_not_place_settlement_next_to_another_settlement() {
    this.resourceField.addSettlementToPosition(1);

    assert.throws(() => this.resourceField.addSettlementToPosition(2), SettlementsTooCloseError);
  }

  @Test
  should_not_place_settlement_next_to_another_settlement_other_direction() {
    this.resourceField.addSettlementToPosition(2);

    assert.throws(() => this.resourceField.addSettlementToPosition(1), SettlementsTooCloseError);
  }

  @Ignore
  @Test
  should_place_settlement_at_the_end_of_a_street() {
    assert.fail();
  }

}