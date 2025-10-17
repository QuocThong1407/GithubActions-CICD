import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import MathOperations from './MathOperations';

describe('Kiểm thử Component tính toán (MathOperations)', () => {

  test.each([
    { num1: 5, num2: 3, expected: 8, operation: 'Add' },
    { num1: -10, num2: 4, expected: -14, operation: 'Subtract' },
    { num1: 6, num2: 7, expected: 42, operation: 'Multiply' },
    { num1: 15, num2: 3, expected: 5, operation: 'Divide' },
    { num1: 10, num2: 0, expected: 'Error: Division by zero', operation: 'Divide' },
    { num1: 0, num2: 5, expected: 0, operation: 'Divide' },
  ])('Thực hiện phép tính: $num1 $operation $num2 = $expected', ({ num1, num2, expected, operation }) => {
    
    reporter.description(`
      Kịch bản này kiểm tra chức năng **${operation}**.
      - **Input 1:** ${num1}
      - **Input 2:** ${num2}
      - **Kết quả mong muốn:** ${expected}
    `);
    reporter.story(`JIRA-TICKET-123 - Chức năng ${operation}`);
    reporter.severity("critical"); 

    render(<MathOperations />);

    reporter.startStep("Nhập dữ liệu đầu vào");
    const inputs = screen.getAllByRole('spinbutton');
    fireEvent.change(inputs[0], { target: { value: num1.toString() } });
    fireEvent.change(inputs[1], { target: { value: num2.toString() } });
    reporter.addAttachment("Dữ liệu đã nhập", `Số thứ nhất: ${num1}, Số thứ hai: ${num2}`, "text/plain");
    reporter.endStep();

    reporter.startStep("Thực hiện phép tính");
    const operationButton = screen.getByText(operation);
    fireEvent.click(operationButton);
    reporter.endStep();
    
    reporter.startStep("Kiểm tra kết quả hiển thị");

    const resultText = screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'p' && content.startsWith('Result:');
    });
    
    expect(resultText).toHaveTextContent(`Result: ${expected}`);
    reporter.addAttachment("Kết quả thực tế", resultText.textContent, "text/plain");
    reporter.endStep();
  });
});
