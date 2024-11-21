import { assertEquals } from "jsr:@std/assert";
import Point from "./index.ts";

Deno.test(".convert", () => {
  assertEquals(
    Point.convert(new Point(20, 30)).equals(new Point(20, 30)),
    true,
  );
  assertEquals(Point.convert([20, 30]).equals(new Point(20, 30)), true);
  assertEquals(Point.convert({ x: 20, y: 30 }).equals(new Point(20, 30)), true);
});
Deno.test("#mag", () => {
  assertEquals(new Point(0, 2).mag(), 2);
  assertEquals(new Point(0, 0).mag(), 0);
  assertEquals(new Point(10, 0).mag(), 10);
});
Deno.test("#unit", () => {
  assertEquals(new Point(0, 1000).unit(), new Point(0, 1));
});
Deno.test("#equals", () => {
  assertEquals(new Point(0, 0).equals(new Point(0, 0)), true, "equal");
  assertEquals(new Point(0, 0).equals(new Point(0, 10)), false, "not equal");
});
Deno.test("#dist", () => {
  assertEquals(new Point(0, 10).dist(new Point(0, 0)), 10);
  assertEquals(new Point(Math.sqrt(2), Math.sqrt(2)).dist(new Point(0, 0)), 2);
  assertEquals(new Point(0, 0).dist(new Point(0, 0)), 0);
});
Deno.test("#mult", () => {
  assertEquals((new Point(0, 0).mult(5)).equals(new Point(0, 0)), true);
  assertEquals((new Point(0, 1).mult(5)).equals(new Point(0, 5)), true);
  assertEquals((new Point(1, 1).mult(5)).equals(new Point(5, 5)), true);
});
Deno.test("#div", () => {
  assertEquals((new Point(0, 0).div(5)).equals(new Point(0, 0)), true);
  assertEquals((new Point(0, 1).div(5)).equals(new Point(0, 1 / 5)), true);
  assertEquals((new Point(1, 1).div(5)).equals(new Point(1 / 5, 1 / 5)), true);
});
Deno.test("#multByPoint", () => {
  assertEquals(
    (new Point(0, 0).multByPoint(new Point(5, 5))).equals(new Point(0, 0)),
    true,
  );
  assertEquals(
    (new Point(0, 1).multByPoint(new Point(5, 5))).equals(new Point(0, 5)),
    true,
  );
  assertEquals(
    (new Point(1, 1).multByPoint(new Point(4, 5))).equals(new Point(4, 5)),
    true,
  );
});
Deno.test("#divByPoint", () => {
  assertEquals(
    (new Point(0, 0).divByPoint(new Point(5, 5))).equals(new Point(0, 0)),
    true,
  );
  assertEquals(
    (new Point(0, 1).divByPoint(new Point(5, 5))).equals(new Point(0, 1 / 5)),
    true,
  );
  assertEquals(
    (new Point(1, 1).divByPoint(new Point(4, 5))).equals(
      new Point(1 / 4, 1 / 5),
    ),
    true,
  );
});
Deno.test("#rotate", () => {
  assertEquals((new Point(0, 0).rotate(0)).equals(new Point(0, 0)), true);
  assertEquals((new Point(0, 1).rotate(Math.PI / 2)).round(), new Point(-1, 0));
  assertEquals((new Point(0, 1).rotate(Math.PI)).round(), new Point(-0, -1));
});
Deno.test("#rotateAround", () => {
  assertEquals(
    (new Point(2, 3).rotateAround(Math.PI / 2, new Point(2, 2))).round(),
    new Point(1, 2),
  );
  assertEquals(
    (new Point(2, 3).rotateAround(Math.PI, new Point(2, 2))).round(),
    new Point(2, 1),
  );
});
Deno.test("#round", () => {
  assertEquals((new Point(0, 0).round()).equals(new Point(0, 0)), true);
  assertEquals((new Point(0, 0.5).round()).equals(new Point(0, 1)), true);
  assertEquals((new Point(0.2, 0.2).round()).equals(new Point(0, 0)), true);
});
Deno.test("#angle", () => {
  assertEquals(new Point(0, 0).angle(), 0);
  assertEquals(new Point(10, 10).angle(), Math.PI / 4);
  assertEquals(new Point(0, 10).angle(), Math.PI / 2);
  assertEquals(new Point(10, 0).angle(), 0);
});
Deno.test("#angleTo", () => {
  const b = new Point(0, 0);
  assertEquals(new Point(0, 0).angleTo(b), 0);
  assertEquals(new Point(10, 10).angleTo(b), Math.PI / 4);
  assertEquals(new Point(0, 10).angleTo(b), Math.PI / 2);
  assertEquals(new Point(10, 0).angleTo(b), 0);
});
Deno.test("#angleWith", () => {
  const b = new Point(0, 0);
  assertEquals(new Point(0, 0).angleWith(b), 0);
  assertEquals(new Point(10, 10).angleWith(b), 0);
  assertEquals(new Point(0, 10).angleWith(b), 0);
  assertEquals(new Point(10, 0).angleWith(b), 0);
});
Deno.test("#angleWithSep", () => {
  assertEquals(new Point(0, 0).angleWithSep(0, 0), 0);
  assertEquals(new Point(10, 10).angleWithSep(0, 0), 0);
  assertEquals(new Point(0, 10).angleWithSep(0, 0), 0);
  assertEquals(new Point(10, 0).angleWithSep(0, 0), 0);
});
Deno.test("#matMult", () => {
  assertEquals(
    (new Point(0, 0).matMult([0, 0, 0, 0])).equals(new Point(0, 0)),
    true,
  );
  assertEquals(new Point(1, 1).matMult([0, 0, 0, 0]), new Point(0, 0));
  assertEquals(new Point(1, 1).matMult([1, 0, 1, 0]), new Point(1, 1));
  assertEquals(new Point(1, 1).matMult([1, 0, 0, 0]), new Point(1, 0));
  assertEquals(new Point(1, 1).matMult([0, 0, 1, 0]), new Point(0, 1));
  assertEquals(new Point(1, 1).matMult([0, 0, 1, 2]), new Point(0, 3));
  assertEquals(new Point(1, 1).matMult([1, 1, 1, 1]), new Point(2, 2));
});
Deno.test("#perp", () => {
  assertEquals(new Point(0, 1000).perp(), new Point(-1000, 0));
});
Deno.test("#add", () => {
  assertEquals(new Point(0, 0).add(new Point(10, 10)), new Point(10, 10));
});
Deno.test("#sub", () => {
  assertEquals(new Point(0, 0).sub(new Point(10, 10)), new Point(-10, -10));
});
