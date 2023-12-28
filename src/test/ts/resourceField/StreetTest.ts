import {Suite} from "../testHelpers/Suite";
import {assert} from "chai";
import {BeforeEach, Test} from "../testHelpers";
import {ResourceField} from "../../../main/ts/resourceField/ResourceField";
import {TooMuchStreetsError} from "../../../main/ts/resourceField/TooMuchStreetsError";


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
    this.resourceField.addStreet();

    assert.equal(this.resourceField.getStreets().length, 1);
  }

  @Test
  should_add_up_to_6_streets_to_a_resource_field() {
    this.resourceField.addStreet();
    this.resourceField.addStreet();
    this.resourceField.addStreet();
    this.resourceField.addStreet();
    this.resourceField.addStreet();
    this.resourceField.addStreet();

    assert.equal(this.resourceField.getStreets().length, 6);
  }

  @Test
  should_not_allow_more_then_6_streets_on_a_resource_field() {
    this.resourceField.addStreet();
    this.resourceField.addStreet();
    this.resourceField.addStreet();
    this.resourceField.addStreet();
    this.resourceField.addStreet();
    this.resourceField.addStreet();

    assert.throws(() => this.resourceField.addStreet(), TooMuchStreetsError);
  }

}