import { AobaClient } from "../dist"

describe("Test", function () {
  it("window should not be undefined", async function () {
    expect(window).toBeTruthy()
  })
  it("should load Aoba Client", async function () {
    expect(new AobaClient({ server: ''})).toBeTruthy()
  })
})