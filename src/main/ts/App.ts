import {Main} from "./core/Main";

@Main
export class App {

  public static main(args: string[]) {
    console.log("args", args);
    console.log("Hello World!");
  }

}