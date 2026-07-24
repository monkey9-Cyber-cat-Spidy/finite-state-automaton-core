export class DfaEngine {
  constructor(initialState, acceptingStates = []) {
    this.initialState = initialState;
    this.acceptingStates = new Set(acceptingStates);
    this.transitions = new Map();
  }

  addTransition(fromState, symbol, toState) {
    const key = `${fromState}:${symbol}`;
    this.transitions.set(key, toState);
  }

  simulate(symbols) {
    let currentState = this.initialState;
    const path = [currentState];

    for (const sym of symbols) {
      const nextState = this.transitions.get(`${currentState}:${sym}`);
      if (!nextState) {
        return { accepted: false, finalState: currentState, path, error: `No transition for '${sym}' from ${currentState}` };
      }
      currentState = nextState;
      path.push(currentState);
    }

    return {
      accepted: this.acceptingStates.has(currentState),
      finalState: currentState,
      path
    };
  }
}
