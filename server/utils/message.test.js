const expect = require('expect');

let {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    // store res in variable
    // assert from match
    // assert text match
    // assert createdAt is number
    let from = 'jen';
    let text = 'Some message';
    let message = generateMessage(from , text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from,
      text
    });
  });
});
