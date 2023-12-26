import {Suite} from "./testHelpers/Suite";
import {assert} from "chai";
import {Test} from "./testHelpers/Test";

@Suite
export class ResourceFieldTest {

  @Test
  should_do_nothing() {
    assert.isTrue(true);
  }

}