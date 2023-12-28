import {beforeEach, describe, it} from "mocha";

export function Suite(target: any) {
  describe(target.name, async function() {
    for(const member of Object.getOwnPropertyNames(target.prototype)) {
      if(target.prototype[member].isBeforeEach) {
        beforeEach(async function() {
          target.prototype[member]();
        });
      }
      if(target.prototype[member].isTest) {
        it(member.replace(/_/g, " "), async function() {
          target.prototype[member]();
        });
      }
    }
  });
}