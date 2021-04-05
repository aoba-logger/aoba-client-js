import { AobaClient } from "../index"

describe("Test", function () {
  it("window should not be undefined", async function () {
    const window = page.evaluate(() => {
      return Promise.resolve(window)
    })
    expect(window).toBeTruthy()
  })
  it("should load Aoba Client", async function () {
    expect(AobaClient).toBeTruthy()
  })
})