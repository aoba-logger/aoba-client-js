import { AobaClient } from "../dist"

describe("Test", function () {
  it("window should not be undefined", async function () {
    expect(window).toBeTruthy()
  })

  it("should load Aoba Client", async function () {
    expect(new AobaClient({ server: ''})).toBeTruthy()
  })

  it("should call store.save", function () {
    const saveHandler = jest.fn()
    const aoba = new AobaClient({
      server: '',
      store: { 
        save: saveHandler
      }
    })
    aoba.info('abc', [1, 2, 3], { a: 'b' })
    expect(saveHandler.mock.calls.length).toBe(1)
    expect(saveHandler.mock.calls[0][0].message).toStrictEqual(['abc', [1, 2, 3], { a: 'b' }])
  })

  it("shoud call console.log", function () {
    window.console.log = jest.fn()
    const message = 'kksk'
    const aoba = new AobaClient({ server: ''})
    aoba.info(message)
    expect((window.console.log as jest.Mock).mock.calls.length).toBe(1)
    expect((window.console.log as jest.Mock).mock.calls[0][0]).toBe(message)
  })

  it("shoud call console.warn", function () {
    window.console.warn = jest.fn()
    window.console.log = jest.fn()
    const message = 'kksk'
    const aoba = new AobaClient({ server: ''})
    aoba.warn(message)
    expect((window.console.log as jest.Mock).mock.calls.length).toBe(0)
    expect((window.console.warn as jest.Mock).mock.calls.length).toBe(1)
    expect((window.console.warn as jest.Mock).mock.calls[0][0]).toBe(message)
  })
})