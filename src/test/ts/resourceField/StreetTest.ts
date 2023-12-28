import {Suite} from "../testHelpers/Suite";
import {assert} from "chai";
import {BeforeEach, Test} from "../testHelpers";
import {ResourceField} from "../../../main/ts/resourceField/ResourceField";
import {StreetAlreadyExistsHereError} from "../../../main/ts/resourceField/StreetAlreadyExistsHereError";
import {Ignore} from "../testHelpers/Ignore";


@Suite
export class StreetTest {

  // @ts-ignore
  private resourceField: ResourceField;

  @BeforeEach
  setUp() {
    this.resourceField = new ResourceField();
  }

  @Test
  should_add_1_street_to_a_resource_field() {
    this.resourceField.addStreetToPosition(1);

    assert.equal(this.resourceField.getStreets().length, 1);
  }

  @Test
  should_not_add_multiple_streets_to_the_same_position() {
    this.resourceField.addStreetToPosition(1);

    assert.throws(() => this.resourceField.addStreetToPosition(1), StreetAlreadyExistsHereError);
  }

  @Test
  should_add_up_to_6_streets_to_a_resource_field() {
    this.resourceField.addStreetToPosition(1);
    this.resourceField.addStreetToPosition(2);
    this.resourceField.addStreetToPosition(3);
    this.resourceField.addStreetToPosition(4);
    this.resourceField.addStreetToPosition(5);
    this.resourceField.addStreetToPosition(6);

    assert.equal(this.resourceField.getStreets().length, 6);
  }

  @Ignore
  @Test
  should_place_a_street_next_to_a_settlement() {
    assert.fail();
  }

  @Ignore
  @Test
  should_place_a_street_next_to_a_street() {
    assert.fail();
  }

  @Ignore
  @Test
  should_not_place_a_street_on_an_empty_resource_field() {
    assert.fail();
  }

}