const isNumberString = text => (/\d+/g).test(text);
const getLastNumberString = (expression) => {
    let startIndex = -1;
    for (let i = expression.length - 1; i >= 0; i--) {
        if (!isNumberString(expression[i]) &&
            expression[i] !== '.') {
            startIndex = i;
            break;
        }
    }
    return expression.substring(startIndex + 1);
};

const inputButtonMethod = inputKey => (component) => {
    let expression = component.state.expression;
    const lastNumberString = getLastNumberString(expression);

    if (lastNumberString === '0') {
        expression = `${component.state.expression.slice(0, -1)}${inputKey}`;
    } else {
        expression = `${component.state.expression}${inputKey}`;
    }

    component.setState({ expression });
};

const inputOpMethod = opKey => (component) => {
    let expression = component.state.expression;
    const last = expression[expression.length - 1];

    if (last !== opKey) {
        if (isNumberString(last)) {
            expression = `${expression}${opKey}`;
        } else {
            expression = `${component.state.expression.slice(0, -1)}${opKey}`;
        }
    }
    component.setState({ expression });
};

const toNumberString = (number) => {
    const str = number.toFixed(10);
    let lastIndex = 0;
    for (let i = str.length - 1; i >= 0; i--) {
        if (str[i] !== '0' &&
            str[i] !== '.') {
            lastIndex = i + 1;
            break;
        }
    }
    return str.slice(0, lastIndex);
};

const basicConfig = {
    columns: 4,
    buttons: [
        {
            name: 'C',
            method: component => component.setState({ expression: '0' }),
        },
        {
            name: '',
        },
        {
            name: '',
        },
        {
            name: '/',
            method: inputOpMethod('/'),

        },
        {
            name: '7',
            method: inputButtonMethod('7'),
        },
        {
            name: '8',
            method: inputButtonMethod('8'),
        },
        {
            name: '9',
            method: inputButtonMethod('9'),
        },
        {
            name: '*',
            method: inputOpMethod('*'),
        },
        {
            name: '4',
            method: inputButtonMethod('4'),
        },
        {
            name: '5',
            method: inputButtonMethod('5'),
        },
        {
            name: '6',
            method: inputButtonMethod('6'),
        },
        {
            name: '-',
            method: inputOpMethod('-'),
        },
        {
            name: '1',
            method: inputButtonMethod('1'),
        },
        {
            name: '2',
            method: inputButtonMethod('2'),
        },
        {
            name: '3',
            method: inputButtonMethod('3'),
        },
        {
            name: '+',
            method: inputOpMethod('+'),
        },
        {
            name: '0',
            method: inputButtonMethod('0'),
        },
        {
            name: '',
        },
        {
            name: '.',
            method: inputOpMethod('.'),
        },
        {
            name: '=',
            method: component =>
                component.setState({ expression: toNumberString(window.eval(component.state.expression)) }),
        },
    ],
};

export default {
    basic: basicConfig,
};
