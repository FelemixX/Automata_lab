class NDSM {
    /**
     * У каждого экземпляра класса будет определённый алфавит, список состояний и переходов, которые могут использоваться для проверки значений, подающихся на вход.
     * @param {String[]} alphabet
     * @param {String[]} states
     * @param {String} startState
     * @param {String[]} finiteStates
     * @param {Object} transitions
     */
    constructor({alphabet, states, startState, finiteStates, transitions}) {
        this.alphabet = alphabet;
        this.states = states;
        this.startState = startState;
        this.finiteStates = finiteStates;
        this.transitions = transitions;
        this.currentStates = [this.startState];
    }

    /**
     * Добавить состояние
     * @param {String} state - состояние
     */
    addState = (state) => {
        if (!this.states.includes(state)) {
            this.states.push(state);
        } else throw new Error(`Состояние "${state}" уже задано`);
    }
    /**
     * Удалить состояние
     * @param {String} removedState - состояние
     */
    removeState = (removedState) => {
        this.states = this.states.filter(state => state !== removedState);
    };
    /**
     * Добавить переход
     * @param {Object} transition - объект перехода
     * @param {String} key - ключ перехода
     */
    addTransition = ({key, transition}) => {
        if (!this.transitions.hasOwnProperty(key)) {
            this.transitions[key] = transition;
        } else throw new Error(`Переход "${key}" уже задан`);
    }
    /**
     * Удалить переход
     * @param {String} key - ключ перехода
     */
    removeTransition = (key) => {
        delete this.transitions[key];
    }
    /**
     * Установить начальное состояние
     * @param {String} state - идентификатор начального состояния
     */
    setStartStateId = (state) => {
        this.startState = state;
    };
    /**
     * Добавить конечное состояние
     * @param {String} state - идентификатор конечного состояния
     */
    addFiniteStateId = (state) => {
        if (!this.finiteStates.includes(state)) {
            this.finiteStates.push(state);
        } else throw new Error(`Состояние "${state}" уже задано`);
    };
    /**
     * Переход к доступному состоянию по символу
     * @param {String} symbol - символ алфавита
     */
    transition = (symbol) => {
        if (this.alphabet.includes(symbol)) {
            this.currentStates = new Set([...this.currentStates].reduce((acc, state) => {
                const nextState = this.transitions[state][symbol] || [];
                return [...acc, ...nextState];
            }, []));
        } else throw new Error(`Символ "${symbol}" не явлется частью алфавита`);
    }
    /**
     * Запустить автомат
     * @param {String} string - строка
     */
    run = (string) => {
        this.currentStates = new Set([this.startState]);
        for (let i = 0; i < string.length; i++) {
            this.transition(string[i]);
        }
        return this.finiteStates.some((state) => {
            return [...this.currentStates].includes(state);
        });
    }
}

module.exports = NDSM;
