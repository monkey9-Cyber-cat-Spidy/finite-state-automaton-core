import { test, describe } from 'node:test';
import assert from 'node:assert';
import { DfaEngine } from '../src/dfaEngine.mjs';

describe('Finite State Automaton Core Suite', () => {
  // DFA accepting binary strings ending in '01'
  const dfa = new DfaEngine('S0', ['S2']);
  dfa.addTransition('S0', '0', 'S1');
  dfa.addTransition('S0', '1', 'S0');
  dfa.addTransition('S1', '0', 'S1');
  dfa.addTransition('S1', '1', 'S2');
  dfa.addTransition('S2', '0', 'S1');
  dfa.addTransition('S2', '1', 'S0');

  test('should accept valid binary stream ending in 01', () => {
    const res = dfa.simulate(['1', '0', '0', '1']);
    assert.strictEqual(res.accepted, true);
    assert.strictEqual(res.finalState, 'S2');
  });

  test('should reject stream ending in 00', () => {
    const res = dfa.simulate(['1', '0', '1', '0']);
    assert.strictEqual(res.accepted, false);
    assert.strictEqual(res.finalState, 'S1');
  });
});
