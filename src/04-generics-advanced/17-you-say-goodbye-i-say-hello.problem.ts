import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

function youSayGoodbyeISayHello<T extends 'hello' | 'goodbye'>(greeting: T): T extends 'hello' ? 'goodbye' : 'hello' {
  return greeting === "goodbye" ? "hello" : "goodbye" as any;
}

// if we use a conditional type in the return type of a function we will probably need to use a "as" assertion somewhere

it("Should return goodbye when hello is passed in", () => {
  const result = youSayGoodbyeISayHello("hello");

  type test = [Expect<Equal<typeof result, "goodbye">>];

  expect(result).toEqual("goodbye");
});

it("Should return hello when goodbye is passed in", () => {
  const result = youSayGoodbyeISayHello("goodbye");

  type test = [Expect<Equal<typeof result, "hello">>];

  expect(result).toEqual("hello");
});
