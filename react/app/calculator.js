import React, { PureComponent } from 'react';
import keyboardConfig from './keyboardconfig';

import './calculator.scss';

const isEmptyButton = button => button.name === '' && !button.method && !button.children;

const addClass = (className, curClass) => {
    const curClasses = curClass.split(' ');
    if (curClasses.includes(className)) return curClass;
    curClasses.push(className);
    return curClasses.join(' ');
};

class Calculator extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            expression: '0',
        };
    }

    _getKeyboardRenderSpec() {
        const buttons = [];

        const config = keyboardConfig.basic;
        config.buttons.forEach((button, index) => {
            const rowIndex = Math.floor(index / config.columns);
            if (!buttons[rowIndex]) {
                buttons[rowIndex] = {
                    className: 'row',
                    key: rowIndex,
                    children: [],
                };
            }
            const children = buttons[rowIndex].children;

            if (isEmptyButton(button)) {
                const last = children.length - 1;
                children[last].className = addClass('spread', children[last].className);
            } else {
                children.push(
                    {
                        key: button.name,
                        text: button.name,
                        className: 'button',
                        onClick: () => button.method(this),
                    });
            }
        });
        return buttons;
    }

    renderKeyboard() {
        return (
            <div className="keyboard">
                {this._getKeyboardRenderSpec().map(spec =>
                    (<div className={spec.className} key={spec.key}>
                        {spec.children.map(childSpec =>
                            (<div
                                className={childSpec.className}
                                onClick={childSpec.onClick}
                                key={childSpec.key}
                            >
                                <span className="text">{childSpec.text}</span>
                            </div>))
                        }
                    </div>))
                }
            </div>
        );
    }

    render() {
        return (
            <div className="calculator">
                <div className="expression">
                    <span className="text">{this.state.expression}</span>
                </div>
                {this.renderKeyboard()}
            </div>
        );
    }
}

export default Calculator;
